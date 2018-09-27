/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> renderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：renderer类型的controller应用基类，她继承于system/core/controllers/renderer.js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import SystemRendererControllerBasic from "../../system/core/controllers/renderer" ;
import UrlParser from "../../system/libraries/urlParser" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个渲染器实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class AppRendererControllerBasic extends SystemRendererControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        let appConf = this.req.app.locals.confs.app ;        
        let up = new UrlParser(req.originalUrl) ;
        let MCCombined = up.getMCCombined() ;       
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        基本的模板变量
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        Object.assign(this.templateData, {
            "app" : {
                "version" : appConf.version ,
                "appStaticPrefix" : this.getStaticPrefix("app") ,
                "utilStaticPrefix" : this.getStaticPrefix("util") ,
                "domain" : this.req.hostname
            } ,
            "head" : {
                "meta" : {
                    "title" : "" ,
                    "keywords" : "" ,
                    "description" : ""
                }
            } ,
            "page" : {
                "extraStylesheets" : [] ,
                "matchStylesheetPath" : false ,  //这里也可以是false或者null
                "extraJavascripts" : [] ,
                "controllerJavascriptPath" : false ,    //这里也可以是false或者null 
            } ,
            "userAgent" : this.ua
        }) ;        
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        静态资源插件定义
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        this.pluginStatic = {            
        } ;        
    }    
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    获取静态资源路径前缀
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    getStaticPrefix(type) {
        let staticConf = this.req.app.locals.confs.static ;
        let stage_env = this.req.app.locals.stage_env ;
        return staticConf["prefix"][stage_env] + staticConf[type] ;
    }    
     /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    定义结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

}

export default AppRendererControllerBasic ;
