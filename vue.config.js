'use strict'
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
   // publicPath:"http://10.30.100.110:8088/",
    devServer: {
        //open: true,
        host: 'localhost',
        port: 8085,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                // 目标服务器地址
                //target: 'http://10.30.100.110:8088/',
                target: 'http://localhost:8088/',
                //路径重写
                //pathRewrite: {'^/api' : ''},
                ws:true,
                changeOrigin: true
              }
        }
    },
    /*
    devServer: {
        host: "localhost",
        port: 8083, // 端口号
        //https: false, // https:{type:Boolean}
       // open: true, //配置自动启动浏览器
        proxy: {
            '/api':{
                //target:'http://jsonplaceholder.typicode.com',
                target:'http://localhost:8088/',
                changeOrigin:true,
                ws:true,
                pathRewrite:{'^/api':'/'},
                //pathRequiresRewrite:{'^/api':'/'},
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    },*/

    //baseUrl: './',
    productionSourceMap: false,
  
    /*
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
         // 'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'login': resolve('src/api/login'),
        }
      },
      
    lintOnSave: true,
    chainWebpack: config=>{
        
        config.resolve.alias
            .set('@', resolve('src'))
            .set('login',resolve('src/api/login'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('router',resolve('src/router'))
            .set('base',resolve('src/base'))
            .set('page',resolve('src/components/page'))
            .set('common',resolve('src/components/common'))
    }*/
}