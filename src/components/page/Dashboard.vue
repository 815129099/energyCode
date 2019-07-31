<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt>
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>{{lastTime}}</span>
          </div>
          <div class="user-info-list">
            上次登录IP：
            <span>{{lastIP}}</span>
          </div>
        </el-card>
        <!--
        <el-card shadow="hover" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>项目进展详情</span>
          </div>网页
          <el-progress :percentage="80" color="#42b983"></el-progress>后台
          <el-progress :percentage="45" color="#f1e05a"></el-progress>数据库
          <el-progress :percentage="75"></el-progress>总项目
          <el-progress :percentage="60" color="#f56c6c"></el-progress>
        </el-card> -->

      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-lwx-icon_zhanghao grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{recordTotal}}</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-lwx-xiaoxi grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-lwx-icon_zhanghao grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{userTotal}}</div>
                  <div>用户数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

       
        <el-card shadow="hover" style="height:132px;">
          <div slot="header" class="clearfix">
            <span>系统更新</span>
           <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
          </div>
          <el-table
            :data="todoList"
            :show-header="false"
            height="304"
            style="width: 100%;font-size:14px;"
          >
            <!--<el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>-->
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <!--
            <el-table-column width="60">
              <template slot-scope="scope">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>-->
          </el-table>
        </el-card> 
              
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="Chart">
            <h1 style="text-align:center;">最近七天同安用电总量</h1>
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <div class="Chart">
            <h1 style="text-align:center;">最近七天同安用电趋势</h1>
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../common/bus";
import API from "@/api";
import Vue from "vue";
export default {
  name: "dashboard",
  data() {
    this.chartSettings = {
      labelMap: {
        PowerTotal: "同安用电总量(KWh)"
      }
    };

    return {
      recordTotal: "",
      userTotal: "",
      lastIP: "",
      lastTime: "",
      name: localStorage.getItem("username"),
      chartData: [],
      todoList: [
        {
          title: "7.30号更新",
          status: false
        }
      ],
      data: []
    };
  },
  components: {},
  computed: {
    role() {
      return localStorage.getItem("rolename")
    }
  },
  created() {
    this.getTimeAndIp();
    this.fillData();
    this.handleListener();
  },
  activated() {
    this.handleListener();
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    getTimeAndIp: function() {
      
      let params = {
        geNumber: localStorage.getItem("username")
      };
      API.userUtil
        .getTimeAndIp(params)
        .then(({ data }) => {
          
          if (data.status == 0) {
            this.lastIP = data.data.ip;
            this.lastTime = data.data.time;
            this.recordTotal = data.data.recordTotal;
            this.userTotal = data.data.userTotal;
          } else {
            //this.$Message.error(data.msg);
            this.$message("请求失败！");
          }
        })
        .catch(data => {
          this.$message("请求失败！");
          console.log(data);
        });
    },

    fillData: function() {
      API.powerUtil
        .getTotalPowerByWeek()
        .then(({ data }) => {
          
          if (data.status == 0) {
            this.chartData = {
              columns: ["Time", "PowerTotal"],
              rows: data.data.list
            };
          } else {
            this.$message("请求失败！");
          }
        })
        .catch(data => {
          this.$message("请求失败ww！");
          console.log(data);
        });
    },

    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    handleListener() {
      bus.$on("collapse", this.handleBus);
    },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart() {
      //this.$refs.bar.renderChart();
     // this.$refs.line.renderChart();
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 3px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
