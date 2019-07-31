import request from '../utils/request'
import requestURL from '../utils/requestUrl'
import requestParam from '../utils/requestParam'


// 获取菜单
export function getMenu() {
  return request({
    method: 'post',
    url: '/api/util/menu.do',
    //url:'http://10.30.100.110:8088/api/util/menu.do',
    data: requestParam()
  })
}


// 导出数据
export function exportData() {
  return request({
    method: 'post',
    url: '/api/power/exportUser.do',
    //url:'http://10.30.100.110:8088/api/power/exportUser.do',
    data: requestParam()
  })
}

//查询电量数据
export function getPowerData(params) {
  return request({
    method: 'post',
    url: '/api/power/Power.do',
    //url:'http://10.30.100.110:8088/api/power/Power.do',
    // data: requestParam(params, 'post', false, 'json')
    data: JSON.stringify(params)
  })
}

//电量分析数据
export function getPowerAnalyze(params) {
  return request({
    method: 'post',
    url: '/api/power/PowerAnalyze.do',
    //url:'http://10.30.100.110:8088/api/power/PowerAnalyze.do',
    // data: requestParam(params, 'post', false, 'json')
    data: JSON.stringify(params)
  })
}

//瞬时量电量分析数据
export function getInstantPowerAnalyze(params) {
  return request({
    method: 'post',
    url: '/api/power/InstantPowerAnalyze.do',
    //url:'http://10.30.100.110:8088/api/power/InstantPowerAnalyze.do',
    // data: requestParam(params, 'post', false, 'json')
    data: JSON.stringify(params)
  })
}

//导出
export function exportData1() {
  return request({
    method: 'post',
    url: '/api/power/exportTest.do',
    //url:'http://10.30.100.110:8088/api/power/exportTest.do',
    // data: requestParam(params, 'post', false, 'json')
    data: requestParam(),
    responseType: 'blob'
  })
}

//最近七天的电表总量
export function getTotalPowerByWeek() {
  return request({
    method: 'post',
    url: '/api/util/getTotalPower.do',
    //url:'http://10.30.100.110:8088/api/util/getTotalPower.do',
    // data: requestParam(params, 'post', false, 'json')
    data: requestParam(),
  })
}

//查询电量数据
export function getPowerByRatio(params) {
  return request({
    method: 'post',
    url: '/api/power/PowerByRatio.do',
    //url:'http://10.30.100.110:8088/api/power/Power.do',
    // data: requestParam(params, 'post', false, 'json')
    data: JSON.stringify(params)
  })
}