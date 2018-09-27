/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> bindRenderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：个人中心-> 绑定手机号
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
        let modulePathArray = [ "member" , "bind" ] ;  
        let env = this.req.app.locals.stage_env ;
        this.res.cookie( 'env' , env , { maxAge : 3600 * 1000 , httpOnly : false }) ;     
        try {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "head" : {
                    "meta" : {
                        "title" : "手机绑定"
                    }
                },
                "page" : {
                    "matchStylesheetPath" : modulePathArray.join("/"),
                    "controllerJavascriptPath":modulePathArray.join("/") ,
                    "extraJavascripts" : ["https://res.wx.qq.com/open/js/jweixin-1.2.0.js"]
                } ,
                "params" : {
                    "openId" : this.getCache("openId"),
                    "state" : this.getCache("state")
                }
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