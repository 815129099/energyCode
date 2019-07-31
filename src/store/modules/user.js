//import {getInfo, login, logout} from '@/api/login'
import store from '../../store'
import router from '../../router'
//import API from '@/api';
import {default as api} from '../../api/utils/api'
const user = {
  state: {
    nickname: "",
    userId: "",
    avatar: 'https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028',
    role: '',
    menus: [],
    permissions: []
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.nickname = userInfo.nickname;
      state.userId = userInfo.userId;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.permissions = userInfo.permissionList;
    },
    RESET_USER: (state) => {
      state.nickname = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.permissions = [];
    }
  },
  actions: {
    // 登录
    Login({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "/api/login/auth",
          method: "post",
          data: loginForm
        }).then(data => {
          if (data.result === "success") {
            //cookie中保存前端登录状态
            localStorage.setItem("username",loginForm.username);
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
       //resolve是对promise成功时候的回调，它把promise的状态修改为fullfiled，reject就是失败的时候的回调，
       //他把promise的状态修改为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。
       
      return new Promise((resolve, reject) => {
        api({
          url: '/api/login/getInfo',
          method: 'post'
        }).then(data => {
          //储存用户信息
          commit('SET_USER', data.userPermission);
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          localStorage.setItem("username",data.userPermission.username);
          localStorage.setItem("nickname",data.userPermission.nickname);
          localStorage.setItem("rolename",data.userPermission.roleName);
          //生成路由
          let userPermission = data.userPermission ;
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            router.addRoutes(store.getters.addRouters)
          })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {


      return new Promise((resolve) => {
        api({
          url: "/api/login/logout",
          method: "post"
        }).then(data => {
          commit('RESET_USER')
          localStorage.removeItem("username");
          localStorage.removeItem("rolename");
          localStorage.removeItem("nickname");
          resolve(data);
        }).catch(() => {
          commit('RESET_USER')
          localStorage.removeItem("username");
          localStorage.removeItem("rolename");
          localStorage.removeItem("nickname");
        })
      })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        localStorage.removeItem("username");
        localStorage.removeItem("rolename");
        localStorage.removeItem("nickname");
        resolve()
      })
    }
  }
}
export default user
