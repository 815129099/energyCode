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
    url: requestURL('/api/logout'),
    data: requestParam()
  })
}

