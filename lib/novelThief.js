/*自动分析笔趣阁小说网站模块*/
var http=require('../lib/httpHelper');
var cheerio = require('cheerio');

//偷取对象的域名地址
var domain="http://www.qu.la";
//全自动时偷取的参考页面
var autoPage="http://www.qu.la/xiaoshuodaquan/";

function novelThief(){

};

/**
 * 偷取指定网页源代码
 * url:偷取的网页地址
 * callback(data) data:偷取到的源代码字符串
 * */
novelThief.prototype.getPageHtml=function(url,callback){
    http.get(url,40000,(err,data)=>{
        if(!err){
            callback(data);
        }else{
            //this.getPageHtml(url,callback);
            console.log(err.message);
        }
    },'gb2312','Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36');
};

/**
 * 获取所有的小说地址列表
 * callback(arr)  arr:小说地址列表数组
 * */
novelThief.prototype.getAllNovelUrl=function(callback){
    console.log('正在获取所有小说页');
    var html=this.getPageHtml(autoPage,function(data){
        //分析数据
        console.log('正在分析所有小说页');
        var arr=[];
        var $=cheerio.load(data);
        $('#main a').each(function(){
            arr.push(domain+$(this).attr('href'));
        });
        callback(arr);
    });
};

/**
 * 根据小说地址抓取小说信息，包括小说名，
 * 图片地址，作者，分类，章节列表
 * novelUrl:小说url地址
 * callback(novel) novel:{
 *  name:'小说名',
 *  description:'小说简介',
 *  imgUrl:'图片地址',
 *  sourceUrl:'小说源地址',
 *  author:'作者',
 *  category:'分类',
 *  lastUpdateTime:'最后更新时间',
 *  sections:[//章节列表
 *      {
 *          index:0, //章节排序
 *          name:'章节名称',
 *          sourceUrl:'章节源地址',
 *          content:'章节内容',
 *          status:0 //章节状态，0代表没有内容，10代表已经获取到内容
 *      }
 *  ]
 * }
 * */
novelThief.prototype.getNovelInfo=function(novelUrl,callback){
    this.getPageHtml(novelUrl,function(data){
        try{ //尝试
            var novel={};
            var $=cheerio.load(data);
            novel.sourceUrl=novelUrl;
            novel.name=$('#info h1').text().trim();
            novel.author=$($('#info p')[0]).text().replace(/作.*者：/,'');
            novel.description=$('#intro').text();
            novel.category=$('.con_top').text().match(/>.*>/)[0].replace(/>/g,'').trim();
            novel.imgUrl=$('#fmimg img').attr('src');
            novel.lastUpdateTime=new Date();
            novel.sections=[];
            $('#list a').each(function(index,ele){
                var section={};
                section.name=$(this).text().trim();
                section.sourceUrl=novelUrl+$(this).attr('href');
                section.index=index;
                if(section.name){
                    novel.sections.push(section);
                }
            });
            callback(novel);
        }catch(ex){ //如果尝试失败，则跳转到这里
            console.log(ex.message);
        }finally{
            //不管有没有失败，最后都会执行这里的代码
            //一般用于关闭数据库
        }
    });
};

/**
 * 偷取章节内容
 * url:章节地址
 * callback(content) content:章节内容字符串
 * */
novelThief.prototype.getSection=function(url,callback){
    this.getPageHtml(url,function(data){
        var $=cheerio.load(data,{decodeEntities: false});
        var content=$('#content').html().replace(/<script>.*<\/script>/g,'');
        callback(content);
    });
};

module.exports = new novelThief();