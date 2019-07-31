import request from '../utils/request'
import requestURL from '../utils/requestUrl'
import requestParam from '../utils/requestParam'
//get 查 、post 增加、delete删除、put修改

// 获取用户列表
export function getData(params) {
  return request({
    method: 'post',
    url: '/api/user/UserList.do',
    //url:'http://10.30.100.110:8088/api/user/UserList.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

//修改用户
export function updateUser(params) {
  return request({
    method: 'put',
    url: '/api/user/User.do',
    //url:'http://10.30.100.110:8088/api/user/User.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

//删除用户
export function deleteUser(params) {
  return request({
    method: 'delete',
    url: '/api/user/User.do',
    // url:'http://10.30.100.110:8088/api/user/User.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

//增加用户
export function addUser(params) {
  return request({
    method: 'post',
    url: '/api/user/User.do',
   //url:'http://10.30.100.110:8088/api/user/User.do',
   // data: requestParam(params, 'post', false, 'json')
   data:JSON.stringify(params)
  })
}

// 获取用户列表
export function getRecord(params) {
  return request({
    method: 'post',
    url: '/api/util/RecordList.do',
    //url:'http://10.30.100.110:8088/api/util/RecordList.do',
    data:JSON.stringify(params)
  })
}

// 获取用户上次登录IP和时间和近七日的访问记录
export function getTimeAndIp(params) {
  return request({
    method: 'POST',
    url: '/api/util/getTimeAndIp.do',
    //url:'http://10.30.100.110:8088/api/util/getTimeAndIp.do',
    data:JSON.stringify(params)
  })
}

// 获取用户上次登录IP和时间和近七日的访问记录
export function getAllData() {
  return request({
    method: 'POST',
    url: '/api/util/getAllData.do',
    //url:'http://10.30.100.110:8088/api/util/getAllData.do',
    data:requestParam()
  })
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}   

export function formatTimeToStr(times, pattern) {
  var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
  if (pattern) {
      d = new Date(times).Format(pattern);
  }
  return d.toLocaleString();
}
