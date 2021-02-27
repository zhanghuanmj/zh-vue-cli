

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')


ejs.renderFile('templates/.browserslistrc', {}, (err, res) => {
    if (err) throw err
    console.log(res)
    // 文件写到目标路径
    fs.writeFileSync(path.join('dist', '.browserslistrc'), res)
})