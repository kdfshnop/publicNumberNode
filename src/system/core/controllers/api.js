/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> system -> core -> controllers -> api.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统核心 -> api类型控制器基类
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import SystemControllerBasic from "./basic" ;
class SystemApiControllerBasic extends SystemControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        this.jsonObject = {} ;
    }
    /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    输出json字符串
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    output() {
        this.res.send(JSON.stringify(this.jsonObject)) ;
    }
}

export default SystemApiControllerBasic ;