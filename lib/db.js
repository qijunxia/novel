var mongodb=require('mongodb');
function db(){
    this.serverIp='localhost';
    this.serverPort=27017;
    this.database='novel';
};

/**
 * collectionName 数据库中集合名称
 * callback回调函数
 * */
db.prototype._createCollection=function(collectionName,callback){
    var server=new mongodb.Server(this.serverIp,this.serverPort,{});
    var db=new mongodb.Db(this.database,server,{});
    db.open(function(error,mydb){
        mydb.collection(collectionName,{safe:true},function(err, collection){
            if(err){
                console.log(err);
            }else {
                callback(collection);
            }
            db.close();
        });
    });
};

/**
 * collectionName 数据库中集合名称
 * query 查询语句 例如{loginId:{$regex:'ad'}}
 * options参数 例如{fields:{name:1},sort: {time: -1}, limit: 10,skip:0}
 * callback(err, cols)回调函数
* */
db.prototype.find=function(collectionName,query,options,callback){
    this._createCollection(collectionName,function(collection){
        collection.find(query,options.fields||{})
            .sort(options.sort||{})
            .limit(options.limit||10000)
            .skip(options.skip||0)
            .toArray(function (err, cols) {
                callback(err, cols);
            });
    });
};

/**
 * collectionName 数据库中集合名称
 * data 要插入的数据
 * callback回调函数
 * */
db.prototype.insert=function(collectionName,data,callback){
    this._createCollection(collectionName,function(collection){
        collection.insert(data);
        if(typeof callback==='function')
            callback();
    });
};

/**
 * collectionName 数据库中集合名称
 * data 要删除的数据
 * callback回调函数
 * */
db.prototype.remove=function(collectionName,data,callback){
    this._createCollection(collectionName,function(collection){
        collection.remove(data);
        if(typeof callback==='function')
            callback();
    });
}


/**
 * 更新数据
 * collectionName 数据库中集合名称
 * query 被更新的查询
 * data 要更新的数据
 * callback回调函数
 * */
db.prototype.update=function(collectionName,query,data,callback){
    this._createCollection(collectionName,function(collection){
        collection.update(query,data);
        if(typeof callback==='function')
            callback();
    });
};


/**
 * 保存新数据到数据库
 * collectionName 数据库中集合名称
 * data 要更新的数据
 * callback回调函数
 * */
db.prototype.save=function(collectionName,data,callback){
    this._createCollection(collectionName,function(collection){
        collection.save(data);
        if(typeof callback==='function')
            callback();
    });
};

/**
 * 查询集合中符合条件的数据条数，专用于分页
 * collectionName 数据库中集合名称
 * query 查询
 * callback(n) 回调函数 n:查询到的数据条数
 * */
db.prototype.count=function(collectionName,query,callback){
    this._createCollection(collectionName,function(collection){
        collection.count(query, function(err, count){
            callback(count);
        });
    });
};
module.exports = new db();