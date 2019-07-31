import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


//静态路由
export const constantRouterMap = [
    {
        path: '/login',
        component: resolve => require(['../components/user/Login.vue'], resolve)
    },
    {
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve),
        name: '404'
    },
    {
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve),
        name: '403'
    }
]


//动态路由
export const asyncRouterMap = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: { title: '首页' }
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        children: [
            {
                path: '/dashboard',
                component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                meta: { title: '首页' },
                menu: 'dashboard' //页面需要的权限
            },
            {
                path: '/powerType',
                component: resolve => require(['../components/power/PowerType.vue'], resolve),
                meta: { title: '电量查询' },
                menu: 'powerType' //页面需要的权限
            },
            {
                path: '/powerAnalyze',
                component: resolve => require(['../components/power/PowerAnalyze.vue'], resolve),
                meta: { title: '电量分析' },
                menu: 'powerAnalyze' //页面需要的权限
            },
            {
                path: '/instantPowerAnalyze',
                component: resolve => require(['../components/power/InstantPowerAnalyze.vue'], resolve),
                meta: { title: '瞬时量分析' },
                menu: 'instantPowerAnalyze' //页面需要的权限
            },
            {
                path: '/electriclist',
                component: resolve => require(['../components/power/Electriclist.vue'], resolve),
                meta: { title: '峰平谷' },
                menu: 'electriclist' //页面需要的权限
            },
            {
                // 用户管理
                path: '/powerByRatio',
                component: resolve => require(['../components/power/PowerByRatio.vue'], resolve),
                meta: { title: '电量比例数据' },
                menu: 'powerByRatio' //页面需要的权限
            },
            {
                path: '/icon',
                component: resolve => require(['../components/page/Icon.vue'], resolve),
                meta: { title: '图标' },
                menu: 'icon' //页面需要的权限
            },
            {
                path: '/table',
                component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                meta: { title: '基础表格' },
                menu: 'table' //页面需要的权限
            },
            {
                path: '/tabs',
                component: resolve => require(['../components/page/Tabs.vue'], resolve),
                meta: { title: 'tab选项卡' },
                menu: 'tabs' //页面需要的权限
            },
            {
                path: '/form',
                component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                meta: { title: '表单' },
                menu: 'form' //页面需要的权限
            },
            {
                // 富文本编辑器组件
                path: '/editor',
                component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                meta: { title: '富文本编辑器' },
                menu: 'editor' //页面需要的权限
            },
            {
                // markdown组件
                path: '/markdown',
                component: resolve => require(['../components/page/Markdown.vue'], resolve),
                meta: { title: 'markdown编辑器' },
                menu: 'markdown' //页面需要的权限
            },
            {
                // 图片上传组件
                path: '/upload',
                component: resolve => require(['../components/page/Upload.vue'], resolve),
                meta: { title: '文件上传' },
                menu: 'upload' //页面需要的权限
            },
            {
                // 用户管理
                path: '/user',
                component: resolve => require(['../components/user/user.vue'], resolve),
                meta: { title: '用户管理' },
                menu: 'user' //页面需要的权限
            },
            {
                // 角色管理
                path: '/role',
                component: resolve => require(['../components/user/role.vue'], resolve),
                meta: { title: '角色管理' },
                menu: 'role' //页面需要的权限
            },{
                // 用户列表
                path: '/userList',
                component: resolve => require(['../components/page/User.vue'], resolve),
                meta: { title: '用户列表' },
                menu: 'userList' //页面需要的权限
            },{
                // 用户列表
                path: '/record',
                component: resolve => require(['../components/page/Record.vue'], resolve),
                meta: { title: '用户列表' },
                menu: 'record' //页面需要的权限
            }
        ]
    },
    {
        path: '*',
        redirect: '/404'
    }
];

export const menuLists = [
    {
        index: 'dashboard',
        icon: "el-lwx-home",
        title: "系统首页"
    },
    {
        index: 'power',
        icon: "el-lwx-icon_yingyongguanli",
        title: "电量管理",
        children:[{
            index: 'powerType',
            icon: "el-lwx-ranqibiao_shiti",
            title: "电量查询"
        },
        {
            index: 'powerAnalyze',
            icon: "el-lwx-ranqibiao_shiti",
            title: "电量分析"
        },
        {
            index: 'instantPowerAnalyze',
            icon: "el-lwx-ranqibiao_shiti",
            title: "瞬时量分析"
        },
        {
            index: 'electriclist',
            icon: "el-lwx-ranqibiao_shiti",
            title: "峰平谷"
        },
        {
            index: 'powerByRatio',
            icon: "el-lwx-ranqibiao_shiti",
            title: "电量比例数据"
        }]
    }
    ,
    {
        index: 'userList',
        icon: "el-lwx-icon-test1",
        title: "用户管理"
    },
    {
        index: 'role',
        icon: "el-lwx-icon-test",
        title: "角色管理"
    },
    {
        index: 'record',
        icon: "el-lwx-icon-test",
        title: "访问记录"
    },
    {
        index: 'icon',
        icon: "el-lwx-icon_yiwenkongxin",
        title: "自定义图标"
    },
    {
        index: 'table',
        icon: "el-lwx-home",
        title: "基础表格"
    },
    {
        index: 'tabs',
        icon: "el-lwx-home",
        title: "tab选项卡"
    },
    {
        index: 'form',
        icon: "el-lwx-home",
        title: "表单"
    },
    {
        index: 'editor',
        icon: "el-lwx-home",
        title: "富文本编辑器"
    },
    {
        index: 'markdown',
        icon: "el-lwx-home",
        title: "markdown编辑器"
    },
    {
        index: '404',
        icon: "el-lwx-home",
        title: "404"
    },
    {
        index: '403',
        icon: "el-lwx-home",
        title: "403"
    }
]
/*
//动态路由
export const asyncRouterMap = [
  {
      path: '/',
      redirect: '/dashboard',
      name:'首页',
      meta: { role: ['admin','user'] }, //页面需要的权限
  },
  {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      name:'自述文件',
      meta: { role: ['admin','user'] }, //页面需要的权限
      children:[
          {
              path: '/dashboard',
              component: resolve => require(['../components/page/Dashboard.vue'], resolve),
              name:'首页',
              meta: { role: ['admin','user'] }, //页面需要的权限
              index:'dashboard',
              icon: "el-lwx-home",
              title: "系统首页"
          },
          {
              path: '/icon',
              component: resolve => require(['../components/page/Icon.vue'], resolve),
              name:'自定义图标',
              index:'icon',
              meta: { role: ['admin'] }, //页面需要的权限
              icon: "el-lwx-home",
              title: "自定义图标"
          },
          {
              path: '/table',
              component: resolve => require(['../components/page/BaseTable.vue'], resolve),
              name:'基础表格',
              index:'table',
              meta: { role: ['admin']}, //页面需要的权限
              icon: "el-lwx-home",
              title: "基础表格"
          },
          {
              path: '/tabs',
              component: resolve => require(['../components/page/Tabs.vue'], resolve),
              name:'tab选项卡',
              meta: { role: ['admin'] }, //页面需要的权限
          },
          {
              path: '/form',
              component: resolve => require(['../components/page/BaseForm.vue'], resolve),
              name:'表单',
              meta: { role: ['admin'] }, //页面需要的权限
          },
          {
              // 富文本编辑器组件
              path: '/editor',
              component: resolve => require(['../components/page/VueEditor.vue'], resolve),
              name:'富文本编辑器',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // markdown组件
              path: '/markdown',
              component: resolve => require(['../components/page/Markdown.vue'], resolve),
              name:'markdown编辑器',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // 图片上传组件
              path: '/upload',
              component: resolve => require(['../components/page/Upload.vue'], resolve),
              name:'文件上传',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // vue-schart组件
              path: '/charts',
              component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
              name:'图表',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // 拖拽列表组件
              path: '/drag',
              component: resolve => require(['../components/page/DragList.vue'], resolve),
              name:'拖拉列表',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // 拖拽Dialog组件
              path: '/dialog',
              component: resolve => require(['../components/page/DragDialog.vue'], resolve),
              name:'弹框',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              // 权限页面
              path: '/permission',
              component: resolve => require(['../components/page/Permission.vue'], resolve),
              name:'权限测试',
              meta: { role: ['admin','user'] }, //页面需要的权限
          },
          {
              path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve),
      name:'404',
      index:'404',
      icon: "el-lwx-home",
      title: "404",
      hidden: true
          },
          {
              path: '/403',
              component: resolve => require(['../components/page/403.vue'], resolve),
              name:'403',
              index:'403',
              meta: { role: ['admin','user'] }, //页面需要的权限
              icon: "el-lwx-home",
              title: "403"
          }
      ]
  },
  {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
  },
  {
      path: '*',
      redirect: '/404'
  }
];
*/
//实例化vue的时候只挂载constantRouter
export default new Router({
    routes: constantRouterMap
});


/*
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/editTable',
                    component: resolve => require(['../components/page/EditTable.vue'], resolve),
                    meta: { title: '可编辑列表' }
                },
                {
                    path: '/powerType',
                    component: resolve => require(['../components/page/PowerType.vue'], resolve),
                    meta: { title: '电量数据' }
                },
                {
                    path: '/powerAnalyze',
                    component: resolve => require(['../components/page/PowerAnalyze.vue'], resolve),
                    meta: { title: '电量数据分析' }
                },
                {
                    path: '/instantPowerAnalyze',
                    component: resolve => require(['../components/page/InstantPowerAnalyze.vue'], resolve),
                    meta: { title: '瞬时量分析' }
                },
                {
                    path: '/Ertus',
                    component: resolve => require(['../components/page/Ertus.vue'], resolve),
                    meta: { title: '采集器管理' }
                },
                {
                    path: '/Charge',
                    component: resolve => require(['../components/page/Charge.vue'], resolve),
                    meta: { title: '电费管理' }
                },
                {
                    path: '/Electriclist',
                    component: resolve => require(['../components/page/Electriclist.vue'], resolve),
                    meta: { title: '峰平谷' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },

                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/record',
                    component: resolve => require(['../components/page/Record.vue'], resolve),
                    meta: { title: '访问记录' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
}) */
