import request from '../utils/request'
import requestURL from '../utils/requestUrl'
import requestParam from '../utils/requestParam'


// 登录
export function login(params) {
  return request({
    method: 'post',
    url: requestURL('/login'),
    //url:'http://10.30.100.110:8088/api/login',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

// 退出
export function logout() {
  return request({
    method: 'post',
    //url: "http://10.30.100.110:8088/api/login/logout",
    url: "/login/logout",
    data: requestParam()
  })
}

// 登录
export function auth(params) {
  return request({
    method: 'post',
    url: "/login/auth",
    //url: "http://10.30.100.110:8088/api/login/auth",
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

// 登录
export function getInfo() {
  return request({
    method: 'post',
    url: "/login/getinfo",
    //url: "http://10.30.100.110:8088/api/login/getinfo",
   // data: requestParam(params, 'post', false, 'json')
   data: requestParam()
  })
}

