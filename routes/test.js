/**
 * Created by Administrator on 2017/1/11 0011.
 */
var express = require('express');
var router = express.Router();
var novelThief=require('../lib/novelThief');
/* GET home page. */
router.get('/', function(req, res, next) {
    novelThief.getSection('http://www.qu.la/book/83/69739.html',function(content){
        res.send(content);
    });
});

module.exports = router;
