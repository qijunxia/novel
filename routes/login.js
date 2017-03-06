/**
 * Created by Administrator on 2017/1/10 0010.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
/* GET home page. */
router.get('/', function(req, res, next) {
    /* db.remove('admins',{},function(){
     });*/
    db.insert('admins',{loginId:'admin',loginPass:'123456'},function() {
        res.send('初始化成功');
    });
});

module.exports = router;
