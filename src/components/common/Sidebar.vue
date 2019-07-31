<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon" style="margin-right:10px;"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" style="margin-right:10px;"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      collapse: false,
      
      /*,
      items: [
        {
          icon: "el-lwx-home",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-lwx-shuibiao",
          index: "2",
          title: "电量管理",
          subs: [
            {
              icon: "el-lwx-shuibiao",
              index: "powerType",
              title: "电量数据"
            },
            {
              icon: "el-lwx-fire",
              index: "powerAnalyze",
              title: "电量数据分析"
            },
            {
              icon: "el-lwx-fire",
              index: "instantPowerAnalyze",
              title: "瞬时量分析"
            },
            {
              icon: "el-lwx-fire",
              index: "Electriclist",
              title: "峰平谷"
            }
          ]
        },

        {
          icon: "el-lwx-zhinengxiaofangshuan",
          index: "ertus",
          title: "采集器管理"
        },
        {
          icon: "el-lwx-shuibiao",
          index: "charge",
          title: "电费管理"
        },
        {
          icon: "el-lwx-shexiangji",
          index: "record",
          title: "访问记录"
        }
        ,
         {
          icon: "el-lwx-icon_zhanghao",
          index: "user",
          title: "用户列表"
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "table",
          title: "基础表格"
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "editTable",
          title: "可编辑列表"
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "tabs",
          title: "tab选项卡"
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单"
            },
            {
              index: "3-2",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器"
                },
                {
                  index: "markdown",
                  title: "markdown编辑器"
                }
              ]
            },
            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "icon",
          title: "自定义图标"
        },
        {
          icon: "el-lwx-tubiao-zhuzhuangtu",
          index: "charts",
          title: "schart图表"
        },
        {
          icon: "el-lwx-icon_yingyongguanli",
          index: "6",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽列表"
            },
            {
              index: "dialog",
              title: "拖拽弹框"
            }
          ]
        },
        {
          icon: "el-lwx-jinggao",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        }
      ]
      
      items: [
      
            {
         //       component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                index:'dashboard',
                icon: "el-lwx-home",
                title: "系统首页"
            },
            {
                index:'icon',
                icon: "el-lwx-home",
                title: "自定义图标"
            },
            {
                index:'table',
                icon: "el-lwx-home",
                title: "基础表格"
            },
            {
                index:'404',
                icon: "el-lwx-home",
                title: "404"
            },
            {
                index:'403',
                icon: "el-lwx-home",
                title: "403"
            }
        ]
    */
      
    };
  },
  computed: {
    ...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  items:"menuList"
  }),
  
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
    
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
