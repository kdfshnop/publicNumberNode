/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> articleReprintRenderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：个人中心-> 转载文章
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
        let modulePathArray = [ "member" , "articleReprint" ] ;       
        let openId=this.req.cookies.openId;
        let agentId=this.req.cookies.agentId;
        let id=this.req.query.id;
        try {
            this.jsonObject= await this.adf.request({
                "apiPath" : "member.articleInfo",
                "data" : {id,openId,agentId},
                "contentType" : "application/json",
                "method":"post"
            });
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "head" : {
                    "meta" : {
                        "title" : "转载文章"
                    }
                },
                "page" : {
                    "matchStylesheetPath" : modulePathArray.join("/"),
                    "controllerJavascriptPath":modulePathArray.join("/")
                },
                "data" : this.jsonObject.data,
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