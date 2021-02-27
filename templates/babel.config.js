// 插件配置
const plugins = [
    // 按需加载
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }],
    ["@babel/plugin-transform-runtime"]
];

// 清除console
const needRemoveLog = process.env.NODE_ENV === 'development' ? '' : 'transform-remove-console';
!!needRemoveLog ? plugins.push(needRemoveLog) : '';

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            "@babel/preset-env",
            { "corejs": { version: 3, proposals: true }, "useBuiltIns": "entry" }
        ]
    ],
    plugins
}