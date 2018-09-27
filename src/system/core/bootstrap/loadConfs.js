/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> system -> core -> bootstrap -> loadConfs.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统启动项 -> 加载整个应用的配置并将她们放到app.locals.confs下面
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import loader from "../../libraries/loader" ;
let appConfs = loader.load("application/configs") ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
模块输出为一个方法，在app.js中执行，把以express创建的应用app当做参数
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default function(app){
    app.locals.confs = {} ;  
    for(let n in appConfs) {
        app.locals.confs[n] = appConfs[n]["default"] ;
    }
} ;