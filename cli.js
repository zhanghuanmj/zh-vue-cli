#!/usr/bin/env node
 // 必须指明node的环境
// mac 或linux 需把文件权限改为 755 , 使用命令 chmod 755 yourfile

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')
const { program } = require('commander')
const package = require('./package.json')
const { version } = package
const createCmd = 'create' // 创建命令
let cmd = ''
let title = ''

// 当前所在文件夹名称
const dirName = process.cwd().split(/[\/\\]/).pop()
// 接收输入的最后一个参数
const lastParam = process.argv[process.argv.length - 1]
// 接收输入的倒数第二个参数
const reSecondeParam = process.argv[process.argv.length - 2]

// 如果最后输入的参数是createCmd，说明没有输入项目名称
if (lastParam === createCmd) {
    cmd = lastParam
}
// 如果输入的倒数第二个参数是createCmd，说明输入了项目名称
else if (reSecondeParam === createCmd) {
    cmd = createCmd
    title = lastParam
}

// 配置命令选项
program
    .version(version)
    .option('create', 'create a project')
// 对比输出提示
program.parse(process.argv)

/**
 * 递归读取文件夹下文件
 * @param {String} startPath 开始路径
 * @returns {Array}
 */
const findSync = (startPath) => {
    let paths = []
    let dirs = []

    const _finder = (dir) => {
        // 读取文件夹下的所有文件和文件夹
        let files = fs.readdirSync(dir)
        // 遍历每一个路径
        files.forEach((val, index) => {
            // 从开始路径起的完整路径
            let fPath = path.join(dir, val)
            // 当前这一个文件或者文件夹的状态
            let stats = fs.statSync(fPath);

            // 如果当前是文件夹
            if (stats.isDirectory()) {
                dirs.push(fPath)
                // 递归读取文件夹下文件
                return _finder(fPath)
            };
            // 如果当前是
            if (stats.isFile()) {
                paths.push(fPath)
            }
        });

    }
    _finder(startPath);
    return {
        paths: paths.map(item => {
            return item.replace(startPath, '')
        }),
        dirs: dirs.map(item => {
            return item.replace(startPath, '')
        })
    }
}
let { paths, dirs } = findSync(path.join(__dirname, 'templates'))


const createApp = (anwsers) => {
    console.log('\033[44;37m loading \033[40;34m 客官，请稍等...\033[0m')
    // 文件写入目标目录 process.cwd()当前执行程序的路径
    const destDir = process.cwd()

    // 根据用户输入生成文件 title 作为文件夹名称
    try {
        fs.statSync(title).isDirectory()
    } catch (error) {
        fs.mkdirSync(title)
    }
    dirs.forEach(dir => {
        try {
            fs.statSync(path.join(title, dir)).isDirectory()
        } catch (error) {
            fs.mkdirSync(path.join(title, dir))
        }

    })

    paths.forEach((filePath, index) => {
        const readPath = path.join(__dirname, 'templates', filePath)
        const writePath = path.join(title, filePath)

        if (!filePath.endsWith('.jpeg')) {
            // 替换文件中的表达式
            ejs.renderFile(readPath, anwsers, (err, res) => {
                if (err) throw err

                // 文件写到目标路径
                fs.writeFileSync(writePath, res)
            })
        } else {
            fs.writeFileSync(writePath, fs.readFileSync(readPath))
        }

        // process.stdout.write('已完成： ' + Math.floor(((index + 1) / paths.length) * 100) + '%')
        // process.stdout.clearLine()
        process.stdout.write('=')

    })
    process.stdout.write("\n"); // end the line

    console.log('\033[42;30m Done \033[0m')
    console.log('\033[40;32m cd ' + title + ' \033[0m')
    console.log('\033[40;32m npm install \033[40;33m or \033[40;32m yarn install \033[0m')
    console.log('\033[40;32m npm run serve \033[40;33m or \033[40;32m yarn serve \033[0m')
}

if (cmd === 'create') {
    if (title) {
        createApp({ title })
    } else {
        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Project name?",
            default: dirName
        }]).then(anwsers => {
            title = anwsers.title
            createApp(anwsers)
        })
    }
}