<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <!--左侧菜单开始-->
    <el-aside width="210px" style="background-color: rgb(179, 192, 209)">
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
              <el-date-picker v-model="beginTime" type="datetime" placeholder="开始日期时间"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="endTime" type="datetime" placeholder="结束日期时间"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="5">
            <el-select v-model="powerType" placeholder="功率类型">
              <el-option label="正向有功总" value="正向有功总"></el-option>
              <el-option label="反向有功总" value="反向有功总"></el-option>
              <el-option label="正向无功总" value="正向无功总"></el-option>
              <el-option label="反向无功总" value="反向无功总"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="dataSource" placeholder="数据来源">
              <el-option label="所有数据来源" value="所有数据来源"></el-option>
              <el-option label="采集" value="采集"></el-option>
              <el-option label="手工输入" value="手工输入"></el-option>
              <el-option label="批量导入" value="批量导入"></el-option>
              <el-option label="录入的表底度" value="录入的表底度"></el-option>
              <el-option label="负荷曲线数" value="负荷曲线数"></el-option>
              <el-option label="电表冻结值" value="电表冻结值"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="info" icon="el-icon-lx-search" plain>查询</el-button>
            <el-button type="info" icon="el-icon-lx-upload" @click="exportData" plain>导出</el-button>
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
            @row-click="handleclick"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="Id" sortable width="58px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="geNumber" width="95px" label="工号" sortable></el-table-column>
            <el-table-column prop="geName" label="姓名" width="88px" sortable></el-table-column>
            <el-table-column prop="userState" label="状态" width="88px" sortable></el-table-column>
            <el-table-column prop="phone" label="电话" sortable></el-table-column>
            <el-table-column prop="email" label="邮箱" sortable></el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" sortable></el-table-column>
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
      beginTime: "",
      endTime: "",
      powerType: "",
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
      pagesize: 10,
      //默认高亮行数据id
      highlightId: -1,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1000,
      formLabelWidth: "120px",
      list: ""
    };
  },
  created() {
    this.loadData(this.criteria, this.currentPage, this.pagesize);
    this.loadMenu();
  },
  methods: {
    //从服务器读取数据
    loadData: function(criteria, pageNum, pageSize) {
      let params = {
        parameter: criteria,
        pageNum: pageNum,
        pageSize: pageSize
      };
      API.userUtil
        .getData(params)
        .then(({ data }) => {
          console.log(data);
          if (data.status == 0) {
            this.tableData = data.data.userData;
            this.totalCount = data.data.number;
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


    selectMenu: function(key, keyPath, name) {
      console.log("key:" + key + "keyPath:" + keyPath);
      console.log(name);
    },

    //加载树状图
    loadMenu: function() {
      API.ertusUtil
        .getErtus()
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
    exportData() {
      window.location.href = "http://localhost:8088/api/exportUser.do";
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
