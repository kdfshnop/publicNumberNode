/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> indexRenderer.js
3. 作者：tll
4. 备注：个人中心首页
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppRendererControllerBasic from "../renderer";
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个渲染器实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class Renderer extends AppRendererControllerBasic {
    constructor(req, res, next) {
        super(req, res, next);
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        渲染页面
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        this.renders();
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders() {
        let modulePathArray = ["member", "index"];
        try {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            member/index页面数据模拟
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let indexData;
            let res = await this.adf.request({
                "apiPath": "member.profile",
                "data": {
                    openId: this.getCache("openId") || "okfUe1swZWVZ415syYmzCoNtmKr4"   // 测试数据
                },
                "method": "get",
                "contentType": "application/json"
            });
            res.status == 1 ? indexData = res.data : (console.log("获取接口menber/profile数据失败"));
            if (!indexData.pic) indexData.pic = this.templateData.app.appStaticPrefix + "/images/touxiang.png";
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            文章预览页跳转至yfyk2h5_fe;
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let env = this.req.app.locals.stage_env ;
            let yfykLink = "";
            switch (env) {
                case "dev":
                    yfykLink = "http://localhost:8080";
                    break;
                case "test":
                    yfykLink = "//m.test.wkzf";
                    break;
                case "sim":
                    yfykLink = "//m.sim.wkzf";
                    break;
                case "prod":
                    yfykLink = "https://m.wkzf.com";
                    break;
            };
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            汇总apiData
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "apiData": {
                    "indexData": indexData,
                    "agentId": this.getCache("agentId"),
                    "yfykLink": yfykLink
                }
            });
            // console.log(this.templateData)      
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "page": {
                    "matchStylesheetPath": modulePathArray.join("/"),
                    "controllerJavascriptPath" : modulePathArray.join("/")
                }
            })
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            渲染模板
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            this.render(modulePathArray.join("/"));
        }
        catch (ex) {
            this.next(ex);
        }
    }

}
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
最后将render暴露出去
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default Renderer;