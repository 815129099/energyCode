<template>
  <div>
    <!--
    <div id="top">			
			<span>
				<el-button type="text" @click="dialogFormVisible = true" style="color:white" >添加</el-button>
				<el-button type="text" @click="deletenames" style="color:white">批量删除</el-button>
			</span>						
		</div>	
    <br/>-->
    <div style="margin-top:15px">
      <el-input placeholder="请输入内容" v-model="criteria" style="padding-bottom:10px;">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <!--<el-option label="id" value="1"></el-option>-->
          <el-option label="工号" value="1"></el-option>
          <el-option label="IP" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-lx-search" v-on:click="search">查询</el-button>
        <el-button slot="append" icon="el-icon-lx-upload" v-on:click="exportUser">导出</el-button>
      </el-input>

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
        <el-table-column prop="id" label="Id" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName" label="工号" sortable></el-table-column>
        <el-table-column prop="ip" label="IP"  sortable></el-table-column>
        <el-table-column prop="createdDateTime" label="创建时间" sortable></el-table-column>
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
  </div>
</template>

<script>
import API from "@/api";
import Vue from "vue";
export default {
  data() {
    return {
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
      formLabelWidth: "120px"
    };
  },
  created() {
    this.loadData(this.criteria, this.currentPage, this.pagesize);
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
        .getRecord(params)
        .then(({ data }) => {
          console.log(data);
          if (data.status == 0) {
            this.tableData = data.data.recordData;
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
    exportUser() {
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
