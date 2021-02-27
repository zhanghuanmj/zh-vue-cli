const apiMocker = require('mocker-api') //使用mocker-api库
const path = require('path')

module.exports = {
    productionSourceMap: false, // 生产环境不要SourceMap
    css: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */
                    'primary-color': 'rgb(47, 84, 235)',
                    'link-color': '#1890FF',
                    'border-radius-base': '4px'
                },
                javascriptEnabled: true,
            }
        }
    },

    devServer: {
        //如果使用mocker-api库
        before(app) {
            apiMocker(app, path.resolve('./mock/index.js'), {

            })
        },
        port: 8080,
        proxy: {
            '/api': {
                target: 'https://huiyan.baidu.com', //服务地址
                ws: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            },
        }
    },

    lintOnSave: false //关闭代码审查
}