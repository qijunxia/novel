var novelThief=require('../lib/novelThief');
var db=require('../lib/db');
/*全自动偷小说模块*/
function novelAuto(){

};

novelAuto.prototype.novelUrlN=0;

novelAuto.prototype.novelUrlArray=[];

novelAuto.prototype.getAllNovel=function(){
    var self=this;
    novelThief.getAllNovelUrl(function(arr){
        self.novelUrlArray=arr;
        self.writeAllNovel();
    });
    setTimeout(function(){
        self.getAllNovel();
    },86400000);
};

novelAuto.prototype.writeAllNovel=function(){
    //获取当前要处理的小说

    var sourceUrl=this.novelUrlArray[this.novelUrlN];
    console.log('正在处理：'+sourceUrl);
    //从数据库判断当前小说是否存在，如果不存在，则拉取，如果存在，则更新
    db.find('novels',{sourceUrl:sourceUrl},{},function(err,cols){
        //拉取小说
        novelThief.getNovelInfo(sourceUrl,function(novel){
            if(cols.length<=0){
                if(novel.name){
                    db.insert('novels',novel);
                }
            }else{
                var data=cols[0];
                if(data.sections.length<novel.sections.length){
                    for(var i=data.sections.length;i<novel.sections.length;i++){
                        data.sections.push(novel.sections[i]);
                    }
                    db.save('novels',data);
                }
            }
        });
    });

    this.novelUrlN++;

    if(this.novelUrlN!=this.novelUrlArray.length){
        var self=this;
        setTimeout(function(){
            self.writeAllNovel();
        },5000);
    }
};


module.exports=new novelAuto();