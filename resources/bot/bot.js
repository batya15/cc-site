var cluster = require('cluster'),
    os = require('os'),
    _ = require('underscore');

var workerCount = 100;

var maxSpawnWorkers = 3;

var workerTimeout = 100000;//2 * 20000; // ms
var workerCheckPeriod = 1000; // ms

var currentWorkerId = 0;
var maxWorkerId = 10000;
var workerOffset = 20000;

var historyLimit = 100;
var printHistoryPeriod = 3000;

if (cluster.isMaster) {
    console.log("master");

    var i = 0;
    var history = [];

    function logWorker(startDate, fail, timeout) {
        var d = new Date();
        history.push({duration: d.getTime() - startDate.getTime(), fail: fail, date: d, timeout: timeout});
        if (history.length > historyLimit) {
            history.splice(0, 1);
        }
    }

    function check() {
        //kill workers by timeout
        _.each(cluster.workers, function (w, k) {
            if (!w.suicide && new Date().getTime() - w.startDate.getTime() > workerTimeout) {
                w.timeout = true;
                w.kill();
            }
        });
        // spawn new workers
        var diff = Math.min(maxSpawnWorkers, workerCount - Object.keys(cluster.workers).length);
        for (var j = 0; j < diff; j++) {
            for (var valid = false; !valid;) {
                currentWorkerId = (currentWorkerId + 1) % maxWorkerId;
                valid = true;
                _.each(cluster.workers, function (w, k) {
                    valid = valid && w.currentId != currentWorkerId;
                });
            }
            var new_worker_env = {};
            new_worker_env["worker_id"] = currentWorkerId + workerOffset;
            var worker = cluster.fork(new_worker_env);
            worker.startDate = new Date();
            worker.currentId = currentWorkerId;
        }
    }

    function printHistoryStat() {
        var failed = _.filter(history, function (e) {
            return e.fail
        }).length;
        var timeout = _.filter(history, function (e) {
            return e.timeout
        }).length;
        var success = history.length - failed;

        var successStory = _.filter(history, function (e) {
            return !e.fail
        });
        var avg = 0;
        successStory.forEach(function (h) {
            avg += h.duration;
        });
        avg = Math.round(avg / successStory.length);
        var workerCount = Object.keys(cluster.workers).length;
        console.log(new Date().toTimeString(), "workerCount", workerCount, "failed", failed, "timeout", timeout,
            "success", success, "avg", avg);
    }

    cluster.on('exit', function (worker, code, signal) {
        logWorker(worker.startDate, code != 0 || worker.timeout, worker.timeout);
        check();
    });
    setInterval(check, workerCheckPeriod);
    setInterval(printHistoryStat, printHistoryPeriod);
} else {
    //console.log("started " + process.env['worker_id']);
//    setTimeout(function(){
//        process.exit(0);
//    }, Math.random()*10000);
    require("./load-script");
}


