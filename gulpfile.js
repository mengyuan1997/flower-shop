/*
    逻辑：
    1、先将所需的第三方包进行导入
    2、创建打包任务以及转存任务
    3、将原有的文件进行删除
    4、开启服务器
    5、开启监控任务
    6、最后进行导出
 */

/* 
1、在本文件中需要导入的gulp第三包会自动到 mode_module文件夹中查找
导入第三方包的语法是require('包名')
2、创建转出任务
1、创建打包sass文件任务sassHandler
1-1、打包sass文件
    需要使用gulp-sass的第三方包，作用是将sass文件转换成css文件
    下载 npm i -D gulp-sass  
    下载gulp-sass包之后进行导入 require('gulp-sass')
    使用，导入之后得到一个函数，直接进行执行
1-2、压缩sass文件
    需要使用gulp-cssmin第三方包，主要是将css文件践行压缩
    下载 npm i -D gulp-cssmin
    下载之后直接进行导入require('gulp-cssmin')
    使用：导入之后的得到一个函数，直接进行执行
1-3、自动添加前缀
    需要使用gulp-autoprefixer第三方包，作用是根据配置进行自动添加前缀
    下载 npm i -D gulp-autoprefixer
    下载之后直接进行导入require('gulp-autoprefixer')
    使用：导入之后会得到一个函数，直接进行调用，需要传递一个参数，表示css兼容到什么浏览器。参数：{browsers:['last 2 versions']}
2、创建打包css文件任务cssHandler
    2-1、找到css文件
    2-2、使用gulp-autoprefixer进行添加前缀
    2-3、将css进行压缩
    2-4、将压缩好的文件放到指定的目录下
3、创建打包js文件任务 jsHandler
    3-1、找到需要转码的文件目录
    3-2、找到js文件ES6转换成ES5
    需要使用第三方包gulp-babel，作用是将ES6转换成ES5。将ES6转换成ES5除了需要gulp-babel第三方包之外还需要@babel/core和@babel/preset第三方包，在导入的时候只导入gulp-babel第三方包就可以
    下载 npm i-D gulp-babel  @babel/core   @babel/preset-env
    导入 require('gulp-babel')
    使用：导入之后得到一个函数，直接进行调用，传递参数。在gulp3中传递{presets:['es2015']}，在gulp4中传递{presets:['@babel/env']}
    3-3、将转码好的代码进行压缩,需要使用gulp-uglify第三方包
    下载 npm i -D gulp-uglify
    导入 require('gulp-uglify')
    使用：导入之后得到一个函数，直接进行调用。
    需要注意的是不认识ES6代码
    3-4、将代码放在指定目录下
4、打包HTML文件htmlHandler
    4-1、找到需要压缩的html文件
    4-2、使用第三方包gulp-htmlmin进行压缩
    下载 npm i -D gulp-htmlmin
    导入：require(gulp-html)
    使用：导入只有得到一个函数，直接进行调用，传递参数
    参数：
    collapseWhitespace:true表示去除空白内容
    collapseBooleanAttributes:true表示简写布尔值属性
    removeAttributeQuotes:true表示去除属性上的双引号
    removeComments:true表示去除注释
    removeEmptyElements:true表示去除空元素
    removeEmptyAttribute:true表示去除空的属性
    removeStyleTypeAttribute:true表示style标签上面的type属性
    removeScriptTypeAttribute：true表示去除script和link标签上面的type属性
    minifyJS:true表示压缩内嵌式js代码，不认识ES6
    minifyCSS:true表示压缩css文本，不能自动添加前缀
    4-3、将压缩好的文件保存到指定目录
5、打包images、video、assets文件，直接找到目录，然后设置指定目录
3、删除原有的文件
每一次压缩完之后，将文件转移到新的目录下不是覆盖式转移，因此子啊转移之前先将原来的文件删除
需要使用第三方包del，下载npm i -D del
使用导入之后得到一个函数，直接进行执行
语法：del('要删除的文件夹')
将删除任务和其他任务一起执行，需要先后顺序
4、开启服务器
创建一个webHandler的任务，用于开启基于gulp的服务器。
gulp服务器的主要作用：
1、为了让代码在开发阶段是在服务器环境下运行
2、为了可以再开发环境中进行ajax请求
3、为了可以在开发环境下进行热更新
gulp服务器的缺点：不能识别PHP文件
需要使用gulp-webserver的第三方包
下载 npm i -D gulp-webserver
导入 require('gulp-webserver')
使用：导入之后得到的解释一个函数，直接进行调用，传递参数
参数：
host表示域名，可以配置自定义域名，在c:windows -> system32 -> drivers -> etc -> hosts进行修改
port表示域名的端口号
open表示默认打开的文件
livereload:true表示自动刷新
代理设置是proxies，是一个数据，在数组里面编写代理，每一条代理都是一个对象，多个代理之间使用逗号隔开。对象脸包含source是代理标识符，target是代理目标地址
5、创建一个目录监控任务watchHandler
    目的是监视目录是否发生改变，只要发生改变就执行指定的任务
6、创建一个叫default的任务
作用是将所有的任务进行执行
css任务、sass任务、js任务、html任务不需要区分先后顺序
只有删除文件夹、开启服务器、监控任务需不要先后顺序
为什么起名一定叫做default?因为执行命令时，如果写gulp default可以直接简写成gulp
*/




// 1、导入第三方包
// 先进性导入gulp包
const gulp = require('gulp')
// 2.1导入打包sass文件的包gulp-sass
const sass = require('gulp-sass')
// 2.2导入压缩css文件的第三方包gulp-cssmin
const cssmin = require('gulp-cssmin')
// 2.3导入添加前缀的的第三方包gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer')
// 2.4导入js转码gulp-babel第三方包
const babel = require('gulp-babel')
// 2.5导入js压缩gulp-uglify第三方包
const uglify = require('gulp-uglify')
// 2.6导入html压缩gulp-htmlmin
const htmlmin = require('gulp-htmlmin')
// 3导入删除第三方包，用于删除原先的文件夹
const del = require('del')
// 4导入服务器gulp-webserver第三方包
const webserver = require('gulp-webserver')


//2、创建打包任务
// 2.1创建打包sass的任务
const sassHandler = () => {
   return gulp//将函数进行返回
   .src('./src/sass/*.scss')//书写需要打包的路径
   .pipe(sass())//将sass文件转换成css文件
   .pipe(autoprefixer())//自动添加前缀
   .pipe(cssmin())//将转换好的css文件进行压缩
   .pipe(gulp.dest('./dist/sass/'))//将转换好的代码放到指定位置
}
// 2.2创建打包css任务
const cssHandler = () => {
    return gulp//将函数进行返回
    .src('./src/css/*.css')//找到目录下所有的css文件
    .pipe(autoprefixer())//对css添加前缀
    .pipe(cssmin())//对css进行压缩
    .pipe(gulp.dest('./dist/css/'))//将压缩好的文件放到指定位置
}
// 2.3创建js打包任务
const jsHandler = () => {
    return gulp
    .src('./src/js/*.js')//找到需要打包的文件夹
    .pipe(babel({presets:['@babel/env']}))//将ES6代码转换成ES5代码
    .pipe(uglify())//将转换好的代码进行压缩
    .pipe(gulp.dest('./dist/js/'))//将打包好的文件放到指定位置
}
// 2.4创建html打包任务
const htmlHandler = () => {
    return gulp
    .src('./src/html/*.html')//找到需要压缩的目录
    .pipe(htmlmin({
        collapseWhitespace:true,//去除空白内容
        collapseBooleanAttributes:true,//简写布尔值属性
        removeAttributeQuotes:true,//去除属性上面的双引号
        removeComments:true,//表示去除注释
        removeEmptyElements:true,//表示去除空元素
        removeScriptTypeAttributes:true,//表示空的属性
        removeStyleLinkTypeAttributes:true,//表示去除style和link属性上面的type属性
        minifyJS:true,//压缩内嵌式js代码
        minifyCSS:true,//压缩内嵌式CSS代码
    }))
    .pipe(gulp.dest('./dist/html/'))//指定放存文件夹

}


// 2.5将图片进行转移
const imgHandler = () => {
    return gulp
    .src('./src/images/*.**')//图片文件夹下面的所有文件
    .pipe(gulp.dest('./dist/images/'))//设置图片制定出位置
}
const assetsHandler = () => {
    return gulp
    .src('./src/assets/**/*')//第三方插件文件夹下面所有的文件进行转移
    .pipe(gulp.dest('./dist/assets/'))//设置图第三方插件指定位置
}

const serverHandler = () => {
    return gulp
    .src('./src/server/*.php')//第三方插件文件夹下面所有的文件进行转移
    .pipe(gulp.dest('./dist/server/'))//设置图第三方插件指定位置
}
// 3、创建删除任务
const delHandler = () => {
    return del('./dist/')//删除指定的目录，为转存文件做准备
}
// 4、开启gulp服务器
const webHandler = () => {
    return gulp 
    .src('./dist/')//开启服务器的目录
    .pipe(webserver({//开启服务器
        host:'localhost',//域名
        port:8080,//服务器端口
        // open:'./html/index.html',//默认打开的文件,不能写根目录，直接写根目录里面的路径
        open:'./html/index.html',//默认打开的文件,不能写根目录，直接写根目录里面的路径
        livereload:true,//自动刷新
        // 代理设置
        proxies:[
            {
                source:'/dl',
                target:'http://127.0.0.1/server/'
            }
        ]

    }))
}
// 5、开始监视任务
const watchHandler = () => {
    // gulp.watch('./src/*.html',htmlIndexHandler)
    gulp.watch('./src/css/*.css',cssHandler)
    gulp.watch('./src/sass/*.scss',sassHandler)
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/html/*.html',htmlHandler)
    gulp.watch('./src/assets/',assetsHandler)
    gulp.watch('./src/images/',imgHandler)
   
    gulp.watch('./src/server/',serverHandler)

}
// 6、统一执行任务
const defaultHandler = gulp.series(
    delHandler,//先进性执行删除任务
    gulp.parallel(sassHandler,cssHandler,jsHandler,htmlHandler,assetsHandler,imgHandler,serverHandler),//不分先后顺序,assetsSHandler
    webHandler,//转移完文件进行执行
    watchHandler//最后开启监控
)



// 最后进行导出
// sass压缩文件记性导出
module.exports.sassHandler = sassHandler
// css压缩文件进行导出
module.exports.cssHandler = cssHandler
// js压缩进行导出
module.exports.jsHandler = jsHandler
// html压缩进行导出
module.exports.htmlHandler = htmlHandler
// images文件转出
module.exports.imagesHandler = imgHandler
// assets文件转出
module.exports.assetsHandler = assetsHandler
// PHP文件转出
module.exports.serverHandler = serverHandler

// 删除文件夹导出
module.exports.delHandler = delHandler
// 导出执行任务、
module.exports.default = defaultHandler