// store/permission.js

import { asyncRouterMap, constantRouterMap,menuLists } from '@/router';

/**
 * 根据路由判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.menu) {
    /*
    * 如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
    */
    return menus.indexOf(route.menu) > -1;
  } else {
    return true
  }
}

/**
 * 根据菜单判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission1(menus, m) {
  if (m.index) {
    /*
    * 如果这个菜单有index属性,就需要判断用户是否拥有此menu权限
    */
    return menus.indexOf(m.index) > -1;
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    //filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        //如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, menus)
        //如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 递归过滤异步菜单栏，返回符合用户菜单权限的菜单栏
 * @param asyncRouterMap
 * @param menus
 */
function filterMenuList(menuLists, menus) {
  const menuList = menuLists.filter(m => {
    //filter,js语法里数组的过滤筛选方法
    if (hasPermission1(menus, m)) {
      if (m.children && m.children.length) {
        //如果这个路由下面还有下一级的话,就递归调用
        m.children = filterMenuList(m.children, menus)
        //如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (m.children && m.children.length)
      }
      return true
    }
    return false
  })
  return menuList
}

const permission = {
  state: {
    routers: constantRouterMap, //本用户所有的路由,包括了固定的路由和下面的addRouters
    addRouters: [], //本用户的角色赋予的新增的动态路由
    menuList:[]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers) //将固定路由和新增路由进行合并, 成为本用户最终的全部路由信息
    },
    SET_MENUS: (state, menuList) => {
      state.menuList = menuList
    }
  },
  actions: {
    GenerateRoutes({commit}, userPermission) {
      //生成路由
      return new Promise(resolve => {
        //roles是后台传过来的角色数组,比如['管理员','文章']
        const role = userPermission.roleName;
        const menus = userPermission.menuList;
        //声明 该角色可用的路由
        let accessedRouters;
        let menuList;
        if (role === '管理员') {
          //如果角色里包含'管理员',那么所有的路由都可以用
          //其实管理员也拥有全部菜单,这里主要是利用角色判断,节省加载时间
          accessedRouters = asyncRouterMap;
          menuList = menuLists;
        } else {
          //否则需要通过以下方法来筛选出本角色可用的路由
          accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
          menuList = filterMenuList(menuLists,menus);
        }
        //执行设置路由的方法
        commit('SET_ROUTERS', accessedRouters);
        commit('SET_MENUS',menuList);
        resolve()
      })
    }
  }
}
export default permission
