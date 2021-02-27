const fs = require('fs')
const path = require('path')

let mockData = {}
//通过递归函数,遍历所有mock文件夹下的文件,汇总所有的路径和响应
/*形成一个如下形式的对象mockData
{
  'POST /api/login/account': (req, res) =>{res.json({ id: 123, name: 456 })}),
  '/api/user': { id: 1, username: 'kenny', sex: 6 },
  'GET /api/user/list': [
    { id: 1, username: 'kenny', sex: 6 },
    { id: 2, username: 'kenny', sex: 6 }
  ],
  'DELETE /api/user/:id': (req, res) =>{res.json({status:1,msg:"xxxxx"})}),
}
key值为请求方法和路径,value值是json数据或者响应回调函数
*/
function readMockDir(dir) {
    let dirs = fs.readdirSync(dir)

    dirs.forEach(file => {
        // 排队mac系统文件
        if (file !== '.DS_Store') {
            let _path = path.join(dir, file)
            let isDirectory = fs.statSync(_path).isDirectory()

            if (isDirectory) {
                readMockDir(_path)
            } else {
                Object.assign(mockData, require(_path))
            }
        }
    })
}
readMockDir(path.join(__dirname))

//可以在这里对mocker-api做一些代理服务器等等的配置
const proxy = {
    // Priority processing.
    // apiMocker(app, path, option)
    // This is the option parameter setting for apiMocker
    _proxy: {
        // proxy: {
        //     // Turn a path string such as `/user/:name` into a regular expression.
        //     // https://www.npmjs.com/package/path-to-regexp
        //     // '/repos/(.*)': 'https://api.github.com/',
        // },
        // // rewrite target's url path. Object-keys will be used as RegExp to match paths.
        // // https://github.com/jaywcjlove/mocker-api/issues/62
        // pathRewrite: {
        //     '^/api/repos/': '/repos/',
        // },
        // changeHost: true,
        // // modify the http-proxy options
        // httpProxy: {
        //     options: {
        //         ignorePath: true,
        //     },
        //     listeners: {
        //         proxyReq: function (proxyReq, req, res, options)
        //         {
        //             console.log('proxyReq');
        //         },
        //     },
        // },
    },
}

//合并对象
Object.assign(proxy, mockData)
//console.log(proxy);

//为总体的响应设置一个延迟来模拟网络延迟
const delay = require('mocker-api/lib/delay');
const noProxy = process.env.NO_PROXY === 'true';

//但是这里的延迟比较尴尬,即使你采用的随机数,也只是在你引入index时产生一次,比如1500ms
//然后你所有的api请求都会是这个固定数值延迟,并不是每个请求单独生产随机延迟
//let delayTime=(Math.random()*1800)+200)
let delayTime = 1000
module.exports = (noProxy ? {} : delay(proxy, delayTime));