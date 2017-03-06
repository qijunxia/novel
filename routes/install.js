var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
    //增加数据
    //连接数据库
    var server = new mongodb.Server("127.0.0.1",27017,{});
    var db=new mongodb.Db('novel',server,{})
    db.open(function(error,db){//数据库：mongotest
        if(error) throw error;
       /* db.collection('admins',{safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //增
                *//* collection.insert({
                     loginId:'admin2',
                     loginPass:'123456',
                     loginName:'qijunxia'
                 });*//*

                var ObjectID = mongodb.ObjectID;
                //改，一般第二个参数是查询出来的对象作为修改值递进去
                collection.update(
                    {_id:ObjectID('58730343d3479316e4736860')},
                    {
                        loginId:'admin888',
                        loginPass:'654321'
                    }
                );
                //删

                    collection.remove({_id:ObjectID('58730838139f9c0d7c11b391')});

                //查cols:指的是所做的增删改查等操作所返回得结果
                collection.find({loginId:{$regex:'ad'}}).limit(3).skip(5).toArray(function(errfind,cols){
                    res.send(JSON.stringify(cols));
                });
            }
        });*/
        db.collection('message',{safe:true},function(err,collection){
            if(err){
                console.log(err);
            }else{
              /* collection.insert({
                    name:'刘煌',
                    sex:'男',
                    id:'liuhuang',
                    password:'888888'
                });*/

                collection.update(
                    {_id:mongodb.ObjectID('587367ea3dfcb01b8c4c0080')},
                    {
                        name:'孙少博',
                        sex:'男',
                        id:'sunshaobo',
                        password:'888888'
                    }
                );

                collection.find().toArray(function(errfind,cols){
                    res.send(JSON.stringify(cols));
                });
            }
        })

    });
    //res.send('安装成功');
});

module.exports = router;
