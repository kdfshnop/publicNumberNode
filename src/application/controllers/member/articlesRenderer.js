/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> articlesRenderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：个人中心-> 我的文章
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppRendererControllerBasic from "../renderer" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个渲染器实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class Renderer extends AppRendererControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;         
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        渲染页面
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        this.renders() ;   
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders() {
        let agentId=this.getCache('agentId');
        let openId=this.getCache('openId');
        this.getCache('openId');
        let modulePathArray = [ "member" , "articles" ] ;   
        let env = this.req.app.locals.stage_env ;
        this.res.cookie( 'env' , env , { maxAge : 3600 * 1000 , httpOnly : false }) ;
        let yfykLink="";//文章预览页跳转至yfyk2h5_fe;
        switch(env){
            case "dev" :
                yfykLink="localhost:8080" ;
                break;
            case "test" :
                yfykLink="//m.test.wkzf" ;
                break ;
            case "sim" :
                yfykLink="//m.sim.wkzf" ;
                break ;
            case "prod" :
                yfykLink="https://m.wkzf.com" ;
                break ;
        };   
        try {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let apiData=await this.adf.request({
                apiPath:"member.articleList",
                "method": "post",
                "contentType" : "application/json",
                "data":{
                    "pageSize":10,
                    "pageIndex":0,
                    "conditionList":[
                        {
                            "fieldName":"openId",
                            "symbol":"eq",
                            "value":openId
                        }
                    ]
                }
            });
            // 对时间进行格式化处理;
            if(apiData.data.data){
                for(let i in apiData.data.data){
                    let date=new Date(apiData.data.data[i].showTime);//根据后端返回时间戳获取时间,日期;
                    let td =new Date();//获取当前时间的时间戳;
                    let year = date.getFullYear();
                    let tYear = td.getFullYear();
                    let month = date.getMonth() + 1;
                    let tMonth = td.getMonth() + 1;
                    let strDate = date.getDate();
                    let tStrDate = td.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    };
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    };
                    if (tMonth >= 1 && tMonth <= 9) {
                        tMonth = "0" + tMonth;
                    };
                    if (tStrDate >= 0 && tStrDate <= 9) {
                        tStrDate = "0" + tStrDate;
                    };
                    if(minutes>=0 && minutes<=9){
                        minutes = "0" + minutes;
                    };
                    let currentTime;
                    if(year==tYear&&month==tMonth&&strDate==tStrDate){
                        currentTime=hours+":"+minutes;
                    }else if(year==tYear){
                        currentTime=month+'-'+strDate+' '+hours+":"+minutes;
                    }else{
                        currentTime=year+'-'+month+'-'+strDate+' '+hours+":"+minutes;
                    }
                    apiData.data.data[i].currentTime=currentTime;
                };
                apiData.data.data.forEach(function(item){
                    item.yfykLink=yfykLink;
                    item.agentId=agentId;
                    item.openId=openId;
                })
            }
            Object.assign(this.templateData, {
                "head" : {
                    "meta" : {
                        "title" : "我的文章"
                    }
                },
                "page" : {
                    "matchStylesheetPath" : modulePathArray.join("/"),
                    "controllerJavascriptPath":modulePathArray.join("/")
                },
                "params":{agentId},
                "data":apiData.data.data
            }) ;
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            渲染模板
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/              
            this.render(modulePathArray.join("/")) ; 
        }
        catch(ex) {
            this.next(ex) ;
        }
    }

}
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
最后将render暴露出去
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default Renderer ;