import request from '../utils/request'
import requestURL from '../utils/requestUrl'
import requestParam from '../utils/requestParam'


// 获取菜单
export function getErtus() {
  return request({
    method: 'post',
    url: '/api/power/ertus.do',
    //url:'http://10.30.100.110:8088/api/power/ertus.do',
    data:requestParam()
  })
}


// 获取菜单
export function exportData() {
  return request({
    method: 'post',
    url: '/api/power/exportUser.do',
    //url:'http://10.30.100.110:8088/api/power/exportUser.do',
    data:requestParam()
  })
}
