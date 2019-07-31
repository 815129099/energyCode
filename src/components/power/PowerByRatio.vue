<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <!--左侧菜单开始-->
    <el-aside width="220px" style="background-color: rgb(179, 192, 209)">
      <el-menu
      :default-active="navselected"
        :active="navselected"
        background-color="#B3C0D1"
        text-color="#333"
        active-text-color="#ffffff"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
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
          <el-col :span="4">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="beginTime" type="datetime" placeholder="开始日期时间"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="endTime" type="datetime" placeholder="结束日期时间"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="5">
            <el-select v-model="powerType" placeholder="功率类型">
              <el-option label="正向有功总" value="ZxygZ"></el-option>
              <el-option label="反向有功总" value="FxygZ"></el-option>
              <el-option label="正向无功总" value="ZxwgZ"></el-option>
              <el-option label="反向无功总" value="FxwgZ"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="Source" placeholder="数据来源">
              <el-option label="所有数据来源" value="所有数据来源"></el-option>
              <el-option label="采集" value="采集"></el-option>
              <el-option label="手工输入" value="手工输入"></el-option>
              <el-option label="批量导入" value="批量导入"></el-option>
              <el-option label="录入的表底度" value="录入的表底度"></el-option>
              <el-option label="负荷曲线数" value="负荷曲线数"></el-option>
              <el-option label="电表冻结值" value="电表冻结值"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="info" icon="el-icon-search" @click="getPowerData" plain>查询</el-button>
           <el-button type="info" icon="el-icon-upload2" v-if="hasPerm('powerType:export')" @click="exportPowerTotal" plain>导出</el-button> 
           <el-button type="info" icon="el-icon-upload2" v-if="hasPerm('powerType:exportAll')" @click="exportAllPowerTotal" plain>全部导出</el-button> 
          </el-col>
        </el-row>
      </el-header>
      <!--表头结束-->

      <!--表格开始-->
      <el-main>
        <div style="margin-top:0px">
          <el-table
            ref="testTable"
            :data="tableData"
            style="width:100%"
            border
            :default-sort="{prop: 'id', order: 'ascending'}"
            @selection-change="handleSelectionChange"
            :span-method="objectSpanMethod"
            @row-click="handleclick"
            :row-class-name="tableRowClassName"
          >
            <!--<el-table-column type="index" align="center" width="40" label="序号" sortable></el-table-column>-->
            <el-table-column prop="EMeterID" label="ID" width="80" align="center" sortable></el-table-column>
            <el-table-column prop="EMeterName" label="计量点名称" align="center" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="EDepartmentName" label="部门" align="center" sortable></el-table-column>
            <el-table-column prop="EDepartmentRatio" label="部门比例" width="80" align="center" sortable></el-table-column>
            <el-table-column prop="CostCenterName" label="成本中心" align="center" sortable></el-table-column>
            <el-table-column prop="CostCenterRatio" label="成本中心比例" width="80" align="center" sortable></el-table-column>
            <el-table-column prop="powerTotal" label="正向功总（kWh" align="center" sortable></el-table-column>
           <!-- <el-table-column prop="num" label="倍率" align="center" sortable></el-table-column>
            <el-table-column prop="difValue" label="读数差" align="center" sortable></el-table-column>
            <el-table-column prop="beginNumber" label="起始表底读数" align="center" sortable></el-table-column>
            <el-table-column prop="endNumber" label="结束表底读数" align="center" sortable></el-table-column>-->
            <el-table-column prop="beginTime" label="起始表底抄表时间" align="center" sortable></el-table-column>
            <el-table-column prop="endTime" label="结束表底抄表时间" align="center" sortable></el-table-column>
          </el-table>

          <div align="center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[300,600, 900, 1200]"
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
export default {
  data() {
    return {
      navselected:"",
      beginTime: "",
      endTime: "",
      powerType: "ZxygZ",
      Source: "所有数据来源",
      //表格当前页数据
      tableData: [],
      //多选数组
      multipleSelection: [],
      //搜索条件
      criteria: "",
      //下拉菜单选项
      select: "",
      //默认每页数据量
      pagesize: 50000000,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 0,
      formLabelWidth: "120px",
      list: "",
      key: "",
      EStationName:"",
      spanArr:[],//合并电表
      spanArr1:[],//合并部门
      position:0,//在data里面定义
      position1:0,//在data里面定义
    };
  },
  created() {
    this.loadMenu();
  },
  methods: {
    //获取所选节点
    selectMenu: function(key, keyPath, name) {
      this.EStationName = keyPath[1].split("/")[1];
      if(keyPath.length<=2){
        this.key = "";
      }else{
        this.key = keyPath[2].split("/")[1];
      }
      console.log(key+"---"+keyPath+'---'+name);
    },
    handleOpen: function(key, keyPath, name) {
      this.EStationName = key.split("/")[1];
      this.key = "";
      console.log(this.EStationName);
      console.log("open----"+key+",,,,"+keyPath+',,,,,'+name);
      this.navselected="/";
      console.log(this.navselected);
    },
    handleClose: function(key, keyPath, name) {
      this.EStationName = key.split("/")[1];
      this.key = "";
      console.log(this.EStationName);
      this.navselected="/";
      console.log("close----"+key+",,,,"+keyPath+',,,,,'+name);
      console.log(this.navselected);
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
    //从服务器读取数据
    getPowerData: function() {
       if(this.beginTime==""){
        this.$message("请选择开始时间！");
      }else if(this.endTime==""){
        this.$message("请选择结束时间！");
      }else if(this.Source==""){
        this.$message("请选择数据来源！");
      }else if(this.powerType==""){
        this.$message("请选择功率类型！");
      }else{
      let params = {
        estationName:this.EStationName,
        emeterName: this.key,
        beginTime: this.beginTime,
        endTime: this.endTime,
        source: this.Source,
        powerType: this.powerType,
        pageNum: this.currentPage,
        pageSize: this.pagesize
      };
      API.powerUtil
        .getPowerByRatio(params)
        .then(({ data }) => {
          console.log(data.data);
          if (data.status == 0) {
            if(data.data.tableData==null){
              this.tableData = null;
              this.totalCount = 0;
            }else{
            this.tableData = data.data.tableData.list;
            this.totalCount = data.data.tableData.total;
            this.rowspan();
            }
            
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

    //搜索
    search: function() {
      console.log(this.select);
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },
    add: function() {
      this.addFormVisible = true;
    },
    exportPowerTotal() {
      if(this.EStationName==null || this.EStationName ==""){
         this.$message("请选择电表！");
      }else if(this.beginTime==""){
        this.$message("请选择开始时间！");
      }else if(this.endTime==""){
        this.$message("请选择结束时间！");
      }else if(this.powerType==""){
        this.$message("请选择功率类型！");
      }else{
          //window.location.href = "http://localhost:8088/api/power/exportPowerByRatio.do?estationName=" + this.EStationName+"&emeterName="+this.key+"&beginTime="+this.beginTime+"&endTime="+this.endTime+"&powerType="+this.powerType;
         window.location.href = "http://10.30.100.110:8088/api/power/exportPowerByRatio.do?estationName=" + this.EStationName+"&emeterName="+this.key+"&beginTime="+this.beginTime+"&endTime="+this.endTime+"&powerType="+this.powerType;
      }
      
     // this.$message("待开发");
    },
    exportAllPowerTotal() {
      if(this.beginTime==""){
        this.$message("请选择开始时间！");
      }else if(this.endTime==""){
        this.$message("请选择结束时间！");
      }else if(this.powerType==""){
        this.$message("请选择功率类型！");
      }else{
        //window.location.href = "http://localhost:8088/api/power/exportPowerByRatio.do?beginTime="+this.beginTime+"&endTime="+this.endTime+"&powerType="+this.powerType;
        window.location.href = "http://10.30.100.110:8088/api/power/exportPowerByRatio.do?beginTime="+this.beginTime+"&endTime="+this.endTime+"&powerType="+this.powerType;
      }
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
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },

    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },
     rowspan:function() {
        this.spanArr = [];//在data里面定义
        this.position = 0; //在data里面定义
        this.tableData.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.spanArr1.push(1);
            this.position = 0;
            this.position1 = 0;
            //item.sequence=index+1;//设置序号
          }else{
            if(this.tableData[index].EMeterID === this.tableData[index-1].EMeterID ){
              this.spanArr[this.position] += 1;//连续有几行项目名名称相同
              this.spanArr.push(0); // 名称相同后往数组里面加一项0
              //当项目名称相同时，设置当前序号和前一个相同
             // this.tableData1[index].sequence = this.tableData1[index-1].sequence;
            if(this.tableData[index].EDepartmentName === this.tableData[index-1].EDepartmentName ){
              this.spanArr1[this.position1] += 1;//连续有几行项目名名称相同
              this.spanArr1.push(0); // 名称相同后往数组里面加一项0
            }else{
              this.spanArr1.push(1);
              this.position1 = index;
            }
            }else{
              this.spanArr.push(1);
              this.spanArr1.push(1);
              this.position = index;
              this.position1 = index;
              //当项目名称不同时，将当前序号设置为前一个序号+1
              //this.tableData1[index].sequence = this.tableData1[index-1].sequence+1;
            }
          }
        })
      },


      objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
      console.log(this.spanArr);
        if(columnIndex === 0){  //序号列也进行合并(第一列)
          //this.spanArr这个数组里面存的是table里面连续的有几条数据相同
          //例如:[1,1,2,0,2,0]
          //1  代表的没有连续的相同的
          //2  代表连续的两个相同
          //0  代表是和上一条内容相同
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row, //行
            colspan: _col  //列
          }

        }
        if(columnIndex === 1){ //项目列也进行合并(第二列)
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if(columnIndex === 2){ //项目列也进行合并(第二列)
          const _row = this.spanArr1[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if(columnIndex === 3){ //项目列也进行合并(第二列)
          const _row = this.spanArr1[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
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
