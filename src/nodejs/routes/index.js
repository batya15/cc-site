var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express' + req.query.sdsdfg});
    console.timeEnd('start');
});

module.exports = router;
