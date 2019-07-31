<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <!--左侧菜单开始-->
    <el-aside width="220px" style="background-color: rgb(179, 192, 209)">
      <el-menu
        default-active="1"
        background-color="#B3C0D1"
        text-color="#333"
        active-text-color="#ffffff"
        @select="selectMenu"
      >
        <!-- 一级菜单 -->
        <template v-for="item in list">
          <el-submenu
            v-if="item.children && item.children.length"
            :index="item.path"
            :key="item.path"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>

            <!-- 二级菜单 -->
            <template v-for="itemChild in item.children">
              <el-submenu
                v-if="itemChild.children && itemChild.children.length"
                :index="itemChild.path"
                :key="itemChild.path"
              >
                <template slot="title">
                  <i :class="itemChild.icon"></i>
                  <span>{{itemChild.name}}</span>
                </template>

                <!-- 三级菜单 -->
                <el-menu-item
                  v-for="itemChild_Child in itemChild.children"
                  :index="itemChild_Child .path"
                  :key="itemChild_Child.path"
                >
                  <i :class="itemChild_Child.icon"></i>
                  <span slot="title">{{itemChild_Child.name}}</span>
                </el-menu-item>
              </el-submenu>

              <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
                <i :class="itemChild.icon"></i>
                <span slot="title">{{itemChild.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item v-else :index="item.path" :key="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <!--左侧菜单结束-->

    <el-container>
      <!--表头开始-->
      <el-header style="font-size: 12px">
        <el-row :gutter="0">
          <el-col :span="5">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="beginTime" type="date" placeholder="开始日期时间"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="5">
            <el-select v-model="dataType" placeholder="类型">
              <el-option value="I" label="电流"></el-option>
              <el-option value="U" label="电压"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="dateType" placeholder="曲线类型">
              <el-option value="day" label="日曲线"></el-option>
              <el-option value="week" label="周曲线"></el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
         <el-button type="info" icon="el-icon-search" plain @click="getPowerData">查询</el-button>
         <el-button type="warning" icon="el-icon-upload2" v-if="hasPerm('instantPowerAnalyze:export')" @click="exportData" plain>导出</el-button> 
        <el-button type="danger" icon="el-icon-yunduanxiazai" style="float:right;margin-top:13px;"  v-if="hasPerm('instantPowerAnalyze:exportAll')" @click="callData" plain>召唤</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!--表头结束-->

      <!--表格开始-->
      <el-main>
        <el-card>
          <!--图表-->
          <div class="Chart">
            <h1 style="text-align:center;">{{Title}}</h1>
            <div v-if="dataType==='I'">
              <ve-line
                :data="chartDataI"
                :data-empty="dataEmpty"
                :toolbox="toolbox"
                :mark-line="markLine"
                :mark-point="markPoint"
                :data-zoom="dataZoom"
              ></ve-line>
            </div>
            <div v-else>
              <ve-line
                :data="chartDataU"
                :data-empty="dataEmpty"
                :toolbox="toolbox"
                :mark-line="markLine"
                :mark-point="markPoint"
                :data-zoom="dataZoom"
              ></ve-line>
            </div>
          </div>
        </el-card>

        <div style="margin-top:5px">
          <el-table
            ref="testTable"
            :data="tableData"
            style="width:100%"
            border
            :default-sort="{prop: 'id', order: 'ascending'}"
            @selection-change="handleSelectionChange"
            @row-click="handleclick"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="Time" label="时间" sortable align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Ia" label="Ia" align="center" sortable></el-table-column>
            <el-table-column prop="Ib" label="Ib" align="center" sortable></el-table-column>
            <el-table-column prop="Ic" label="Ic" align="center" sortable></el-table-column>
            <el-table-column prop="Ua" label="Ua" align="center" sortable></el-table-column>
            <el-table-column prop="Ub" label="Ub" align="center" sortable></el-table-column>
            <el-table-column prop="Uc" label="Uc" align="center" sortable></el-table-column>
          </el-table>

          <div align="center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[145,290,435,580,725,870,1015]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>
      </el-main>
      <!--表头结束-->
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: rgb(179, 192, 209);
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background-color: #b3c0d1;
}
</style>

<script>
import API from "@/api";
import Vue from "vue";
import "v-charts/lib/style.css";
import 'echarts/lib/component/dataZoom';
export default {
  data() {
    this.dataZoom = [
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ]
    this.markLine = {
      data: [
        {
          name: "平均线",
          type: "average"
        }
      ]
    };
    this.markPoint = {
      data: [
        {
          name: "最大值",
          type: "max"
        },
        {
          name: "最小值",
          type: "min"
        }
      ]
    };
    this.toolbox = {
      feature: {
        magicType: { type: ["line", "bar"] },
        saveAsImage: {}
      }
    };
    return {
      beginTime: "",
      dataType: "I",
      chartData: {
        columns: [],
        rows: []
      },
      dataEmpty: true,
      //表格当前页数据
      tableData: [],
      //多选数组
      multipleSelection: [],
      //下拉菜单选项
      select: "",
      //默认每页数据量
      pagesize: 1100,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 0,
      chartDataI: null,
      chartDataU: null,
      formLabelWidth: "120px",
      //树状图列表
      list: "",
      //间隔时间类型
      dateType: "day",
      //图形类型
      chartType: "bar",
      //所选电表
      key: "",
      height: 20,
      Title: "Title",
      EStationName:""
    };
  },
  components: {},
  created() {
    this.loadMenu();
  },
  methods: {
    //从服务器读取数据
    selectMenu: function(key, keyPath, name) {
      this.EStationName = keyPath[1].split("/")[1];
      console.log(keyPath.length);
      if(keyPath.length<=2){
        this.key = "";
      }else{
        this.key = keyPath[2].split("/")[1];
      }
    },

    //加载树状图
    loadMenu: function() {
      API.powerUtil
        .getMenu()
        .then(({ data }) => {
          console.log(data.data);
          if (data.status == 0) {
            this.list = data.data;
          } else {
            this.$message("请求失败！");
          }
        })
        .catch(data => {
          this.$message("请求失败ww！");
          console.log(data);
        });
    },

    increaseHeight() {
      this.height += 10;
    },

    fillData(data) {
      this.chartDataI = {
        columns: ["Time", "Ia", "Ib", "Ic"],
        rows: data
      };
      this.chartDataU = {
        columns: ["Time", "Ua", "Ub", "Uc"],
        rows: data
      };
       if (data.length==0) {
        this.dataEmpty = true;
      }else{
        this.dataEmpty = false;
      }
    },

    getPowerData: function() {
      if (this.key == null || this.key == "") {
        this.$message("请选择电表！");
      } else if (this.beginTime == "") {
        this.$message("请选择开始时间！");
      } else if (this.dataType == "") {
        this.$message("请选择电流电压类型！");
      } else if (this.dateType == "") {
        this.$message("请选择曲线类型");
      } else {
        if (this.dateType == "day") {
          this.Title = this.key + "：日曲线";
        } else if (this.dateType == "week") {
          this.Title = this.key + "：周曲线";
        }
        let params = {
          estationName:this.EStationName,
          emeterName: this.key,
          beginTime: this.beginTime,
          dateType: this.dateType,
          pageNum: this.currentPage,
          pageSize: this.pagesize
        };
        API.powerUtil
          .getInstantPowerAnalyze(params)
          .then(({ data }) => {
            if (data.status == 0) {
              this.tableData = data.data.page.list;
              this.totalCount = data.data.page.total;
              this.fillData(data.data.page.list);
            } else {
              this.$message("请求失败！");
            }
          })
          .catch(data => {
            this.$message("请求失败ww！");
            console.log(data);
          });
      }
    },

    //多选响应
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
    },

    //点击行响应
    handleclick: function(row, event, column) {
      this.highlightId = row.id;
    },
    exportData() {
      //window.location.href = "http://localhost:8088/api/exportUser.do";
      this.$message("待开发");
    },
    callData() {
      //window.location.href = "http://localhost:8088/api/exportUser.do";
      //this.$message("待开发");
      API.userUtil
        .getAllData()
        .then(({ data }) => {
          if (data.status == 0) {
          } else {
            this.$message("请求失败！");
          }
        })
        .catch(data => {
          this.$message("请求失败ww！");
          console.log(data);
        });
    },

    //改变当前点击的行的class，高亮当前行
    tableRowClassName: function(row, index) {
      if (row.id == this.highlightId) {
        return "info-row";
      }
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val;
      this.getPowerData();
    },

    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.getPowerData();
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    }
  }
};
</script>

<style scoped>
.el-select .el-input {
  width: 110px;
}

.el-table .info-row {
  background: #c9e5f5;
}

#top {
  background: #20a0ff;
  padding: 5px;
  overflow: hidden;
}
</style>
