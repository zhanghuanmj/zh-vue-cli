# zh-vue-cli

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目结构
```
├── README.md
├── .browerslistrc (可能合到package.json里)
├── .eslintrc.js
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets  //静态资源
│   │   ├── test  //测试
│   │   │   └── test.png
│   │   └── common  //公用
│   │   │   └── logo.png
│   ├── components  //组件
│   │   ├── test  //测试
│   │   │   └── Test.vue  //大驼峰命名
│   │   └── common  //公用
│   │   │   └── HelloWorld.vue  //大驼峰命名
│   ├── router  //路由
│   │   ├── test.js  //测试
│   │   ├── index.js  //路由入口
│   │   └── home.js  //home页
│   ├── store  //数据存储
│   │   └── index.js  
│   ├── urls  //接口地址配置
│   │   ├── test.js  //测试
│   │   └── urlsConfig.js  //接口基础配置
│   ├── utils  //工具，用于存放公用方法
│   │   └── axios.js  //ajax基础配置
│   ├── views  //页面
│   │   ├── test  //测试
│   │   │   └── Test.vue  //大驼峰命名
│   │   ├── home  //home页
│   │   │   ├── About.vue  //关于我们
│   │   │   └── Home.vue  //home
│   ├── App.vue  //项目入口
│   └── main.js  //项目入口
└── yarn.lock
```
