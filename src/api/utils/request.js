import Vue from 'vue';
import axios from 'axios';
import {Message, MessageBox} from 'element-ui'
import store from '../../store'
// 创建axios实例
const service = axios.create({
    //baseURL: process.env.BASE_API, // api的base_url
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// request拦截器
service.interceptors.request.use(config => {
    //config.headers['Authorization'] = Vue.cookie.get('token');
    return config;
}, error => {
    return Promise.reject(error);
});

// response拦截器
service.interceptors.response.use(response => {
    console.log(response);
     if(response.data && response.data.status =="20011") { // -1, token失效 401 没有token
        //Vue.cookie.delete('token');
       // Vue.router.push({name: 'login'});
       //this.$message("登录过期，请重新登录！");
       //Vue.router.push({name: 'login'});
      // this.$router.push({path: 'login'});
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error',
        duration: 500,
        onClose: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }
      });
      return Promise.reject("未登录")
    }else if(response.data && response.data.status !='0'){
        Message({
            message: response.data.msg,
            type: 'error',
            duration: 2 * 1000
          })
    return Promise.reject(response.data)
    }
    return response;
}, error => {
    return Promise.reject(error);
});

export default service;
