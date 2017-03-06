/**
 * Created by Administrator on 2017/1/10 0010.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
/* GET home page. */
router.post('/', function(req, res, next) {
    //reg.query接收前端get过来的数据
    switch(req.query.ac){
        case 'checkLogin':{
            db.find(
                'admins',
                {//req.body接受前端post来的数据
                    loginId:req.body.loginId,
                    loginPass:req.body.loginPass
                },
                {},
                function(err,cols){
                    if(cols.length>0){
                        res.json({error:false,msg:'登录成功'});
                    }else{
                        res.json({error:true,msg:'用户名或密码错误'});
                    }
                }
            );
        }
            break;
        default:{
            //json把json对象转成字符串
            //res服务器向客服端回应
            res.json({error:true,msg:'未知请求'})
        }
            break;
    }

});
router.get('/', function(req, res, next) {
    switch(req.query.ac){
        default:{
            res.json({error:true,msg:'未知请求'})
        }
            break;
    }
});
module.exports = router;
