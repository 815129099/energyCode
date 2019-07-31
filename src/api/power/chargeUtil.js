import request from '../utils/request'
import requestURL from '../utils/requestUrl'
import requestParam from '../utils/requestParam'




// 导出数据
export function ChargeList(params) {
  return request({
    method: 'post',
    url: '/api/power/ChargeList.do',
    //url:'http://10.30.100.110:8088/api/power/ChargeList.do',
    data:JSON.stringify(params)
  })
}

//增加
export function addCharge(params) {
  return request({
    method: 'post',
    url: '/api/power/Charge.do',
   //url:'http://10.30.100.110:8088/api/power/Charge.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

//删除
export function deleteCharge(params) {
  return request({
    method: 'delete',
    url: '/api/util/Charge.do',
    //url:'http://10.30.100.110:8088/api/util/Charge.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

//修改
export function editCharge(params) {
  return request({
    method: 'put',
    url: '/api/util/Charge.do',
    //url:'http://10.30.100.110:8088/api/power/Charge.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

