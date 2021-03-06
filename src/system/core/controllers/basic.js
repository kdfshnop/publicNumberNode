/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> system -> core -> controllers -> basic.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统核心 -> 所有控制器类的祖宗
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import ApiDataFilter from "../../libraries/apiDataFilter" ;

class SystemControllerBasic {
    constructor(req, res, next) {
        this.req = req ;
        this.res = res ;
        this.next = next ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        将api请求工具当做一个属性整进来
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        this.adf = new ApiDataFilter(this.req.app) ;         
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    如果queryString中设置了某个参数值，就更新cookie中这个参数的值，最后返回 cookie中国这个参数值
    获取cookie值用：this.req.cookies.想要取得的cookie的key
    设置cookie值用：res.cookie('cookiekey', 'cookieValue', { maxAge: 900000, httpOnly: false })
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    getCache(key) {
        let qsValue = this.req.query[key] ;
        if(qsValue)  {
            this.res.cookie( key , qsValue , { maxAge : 3600 * 1000 , httpOnly : false }) ;
            return qsValue ;
    }
        else return this.req.cookies[key] || "" ;
}
}

export default SystemControllerBasic ;