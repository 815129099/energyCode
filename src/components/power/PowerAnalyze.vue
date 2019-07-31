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
            <el-select v-model="powerType" placeholder="功率类型">
              <el-option value="ZxygZ" label="正向有功总"></el-option>
              <el-option value="FxygZ" label="反向有功总"></el-option>
              <el-option value="ZxwgZ" label="正向无功总"></el-option>
              <el-option value="FxwgZ" label="反向无功总"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="dateType" placeholder="间隔时间">
              <el-option value="hour" label="小时电量曲线"></el-option>
              <el-option value="day" label="日电量曲线"></el-option>
              <el-option value="month" label="月电量曲线"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="chartType" placeholder="曲线类型">
              <el-option value="bar" label="柱形图"></el-option>
              <el-option value="line" label="曲线图"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="info" icon="el-icon-search" plain @click="getPowerData">查询</el-button>
            <el-button type="info" icon="el-icon-upload2" v-if="hasPerm('powerAnalyze:export')" @click="exportData" plain>导出</el-button> 
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
            <div v-if="chartType==='bar'">
              <ve-histogram
                :data="chartData"
                :data-empty="dataEmpty"
                :toolbox="toolbox"
                :mark-line="markLine"
                :mark-point="markPoint"
                :data-zoom="dataZoom"
                :settings="chartSettings"
              ></ve-histogram>
            </div>
            <div v-else>
              <ve-line
                :data="chartData"
                :data-empty="dataEmpty"
                :toolbox="toolbox"
                :mark-line="markLine"
                :mark-point="markPoint"
                :data-zoom="dataZoom"
                :settings="chartSettings"
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
            <el-table-column prop="num" label="倍率" align="center" sortable></el-table-column>
            <el-table-column label="抄表时间" align="center">
              <el-table-column prop="beginTime" label="起" align="center" sortable></el-table-column>
              <el-table-column prop="endTime" label="止" align="center" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="底码读数（总）" align="center">
              <el-table-column prop="totalNumber" label="电量" align="center" sortable></el-table-column>
              <el-table-column prop="beginNumber" label="起" align="center" sortable></el-table-column>
              <el-table-column prop="endNumber" label="止" align="center" sortable></el-table-column>
            </el-table-column>
          </el-table>

          <div align="center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5,10, 20, 30, 40]"
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

<script>
import API from "@/api";
import Vue from "vue";
import "v-charts/lib/style.css";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
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
      this.chartSettings = {
        labelMap: {
          totalNumber: "总电量(KWh)"
        }
      };
    return {
      beginTime: "",
      endTime: "",
      powerType: "ZxygZ",
      chartData: null,
      dataEmpty: true,
      dataSource: "",
      //表格当前页数据
      tableData: [],
      //多选数组
      multipleSelection: [],
      //搜索条件
      criteria: "",
      //下拉菜单选项
      select: "",
      //默认每页数据量
      pagesize: 40,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 0,
      formLabelWidth: "120px",
      //树状图列表
      list: "",
      //电量数据
      data: [],
      //间隔时间类型
      dateType: "hour",
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
            //this.$Message.error(data.msg);
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

    //填充图表数据
    fillData(data) {
      this.chartData = {
        columns: ["Time", "totalNumber"],
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
      } else if (this.powerType == "") {
        this.$message("请选择功率类型！");
      } else if (this.dateType == "") {
        this.$message("请选择时间间隔");
      } else if (this.chartType == "") {
        this.$message("请选择图形！");
      } else {
        if (this.dateType == "hour") {
          this.Title =
            this.key + "：24小时电量(" + this.dateFormat(this.beginTime) + ")";
        } else if (this.dateType == "day") {
          this.Title =
            this.key + "：30天电量(" + this.dateFormat(this.beginTime) + ")";
        } else if (this.dateType == "year") {
          this.Title =
            this.key + "：12月电量(" + this.dateFormat(this.beginTime) + ")";
        }
        let params = {
          estationName:this.EStationName,
          emeterName: this.key,
          beginTime: this.beginTime,
          dateType: this.dateType,
          powerType: this.powerType,
          pageNum: this.currentPage,
          pageSize: this.pagesize
        };
        API.powerUtil
          .getPowerAnalyze(params)
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
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day;
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
