<template>
  <div>
	   <!--
    <div id="top">
      <span>
        <el-button type="text" @click="dialogFormVisible = true" style="color:white">添加</el-button>
       <el-button type="text" @click="deletenames" style="color:white">批量删除</el-button>
      </span>
    </div>-->
    <br>
    <div style="margin-top:15px">
      <el-input placeholder="请输入内容" v-model="criteria" style="padding-bottom:10px;">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <!--<el-option label="id" value="1"></el-option>-->
          <el-option label="工号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
          <el-option label="状态" value="3"></el-option>
          <el-option label="电话" value="4"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" v-on:click="search">查询</el-button>
        <el-button slot="append" icon="el-icon-plus" v-on:click="add">添加</el-button>
        <el-button slot="append" icon="el-icon-upload2" v-on:click="exportUser">导出</el-button>
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
        <el-table-column type="selection"></el-table-column>
        <!--
		    <el-table-column
		      prop="id"
		      label="Id"
		      sortable
		      show-overflow-tooltip>
        </el-table-column>-->
        <el-table-column prop="peakTime" width="90px" label="峰时刻" sortable></el-table-column>
        <el-table-column prop="jPeakCharge" width="90px" label="集美(峰)" sortable></el-table-column>
        <el-table-column prop="tPeakCharge" width="90px" label="同安(峰)" sortable></el-table-column>
        <el-table-column prop="hPeakCharge" width="90px" label="湖里(峰)" sortable></el-table-column>
        <el-table-column prop="flatTime" label="平时刻" width="90px" sortable></el-table-column>
        <el-table-column prop="jFlatCharge" width="90px" label="集美(平)" sortable></el-table-column>
        <el-table-column prop="tFlatCharge" width="90px" label="同安(平)" sortable></el-table-column>
        <el-table-column prop="hFlatCharge" width="90px" label="湖里(平)" sortable></el-table-column>
        <el-table-column prop="ravineTime" label="谷时刻" width="90px" sortable></el-table-column>
        <el-table-column prop="jRavineCharge" width="90px" label="集美(谷)" sortable></el-table-column>
        <el-table-column prop="tRavineCharge" width="90px" label="同安(谷)" sortable></el-table-column>
        <el-table-column prop="hRavineCharge" width="90px" label="湖里(谷)" sortable></el-table-column>
        <el-table-column prop="status" width="100px" label="默认（1）" sortable></el-table-column>
        <el-table-column prop="createdDateTime" label="创建时间" sortable></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">设为默认</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加新的峰平谷时刻" :visible.sync="addFormVisible">
        <el-form :model="addUserForm"  ref="addUserForm">
          <el-form-item
            :label-width="formLabelWidth"
            v-for="(peak, index) in addUserForm.PeakTimes"
            :label="'峰时刻' + index"
            :key="peak.key"
            :prop="'PeakTimes.' + index + '.value'"
            :rules="{
      required: true, message: '峰时刻不能为空'
    }"
          >
            <el-time-picker
              is-range
              v-model="peak.value"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
            <el-button style="float:right;" @click.prevent="removePeak(peak)">删除</el-button>
          </el-form-item>

          <el-form-item label="峰时刻集美电费" :label-width="formLabelWidth" prop="jPeakCharge"
		  :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input  v-model.number="addUserForm.jPeakCharge" auto-complete="off"></el-input>
          </el-form-item>


          <el-form-item label="峰时刻同安电费" :label-width="formLabelWidth" prop="tPeakCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.tPeakCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="峰时刻湖里电费" :label-width="formLabelWidth" prop="hPeakCharge"
		  :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.hPeakCharge" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item
            :label-width="formLabelWidth"
            v-for="(flat, index) in addUserForm.FlatTimes"
            :label="'平时刻' + index"
            :key="flat.key"
            :prop="'FlatTimes.' + index + '.value'"
            :rules="{
      required: true, message: '平时刻不能为空'
    }"
          >
            <el-time-picker
              is-range
              v-model="flat.value"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
            <el-button style="float:right;" @click.prevent="removeFlat(flat)">删除</el-button>
          </el-form-item>
          <el-form-item label="平时刻集美电费" :label-width="formLabelWidth" prop="jFlatCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.jFlatCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="平时刻同安电费" :label-width="formLabelWidth" prop="tFlatCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.tFlatCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="平时刻湖里电费" :label-width="formLabelWidth" prop="hFlatCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.hFlatCharge" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item
            :label-width="formLabelWidth"
            v-for="(ravine, index) in addUserForm.RavineTimes"
            :label="'谷时刻' + index"
            :key="ravine.key"
            :prop="'RavineTimes.' + index + '.value'"
            :rules="{
      required: true, message: '谷时刻不能为空'
    }"
          >
            <el-time-picker
              is-range
              v-model="ravine.value"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
            <el-button style="float:right;" @click.prevent="removeRavine(ravine)">删除</el-button>
          </el-form-item>
          <el-form-item label="谷时刻集美电费" :label-width="formLabelWidth" prop="jRavineCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.jRavineCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="谷时刻同安电费" :label-width="formLabelWidth" prop="tRavineCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.tRavineCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="谷时刻湖里电费" :label-width="formLabelWidth" prop="hRavineCharge"
		    :rules="[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字值'}
    ]">
            <el-input type="number" v-model.number="addUserForm.hRavineCharge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
            <el-select v-model="addUserForm.status" placeholder="状态">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
            </el-select>
          </el-form-item>
        
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmitForm('addUserForm')">确 定</el-button>
          <el-button type="info" @click="addPeak">添加峰时刻</el-button>
          <el-button type="info" @click="addFlat">添加平时刻</el-button>
          <el-button type="info" @click="addRavine">添加谷时刻</el-button>
        </div>
      </el-dialog>

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
      addUserForm: {
        PeakTimes: [
          {
            value: ""
          }
        ],
        FlatTimes: [
          {
            value: ""
          }
        ],
        RavineTimes: [
          {
            value: ""
          }
		],
		jPeakCharge:'',
		tPeakCharge:'',
		hPeakCharge:'',
		jFlatCharge:'',
		tFlatCharge:'',
		hFlatCharge:'',
        hRavineCharge: '',
        jRavineCharge: '',
        tRavineCharge: '',
        status: "0"
      },
      dialogFormVisible: false,
      addFormVisible: false,
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
      API.chargeUtil
        .ChargeList(params)
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

    //添加
    addSubmitForm(addUserForm) {
      var peakTime = "";
      for (var i = 0; i < this.addUserForm.PeakTimes.length; i++) {
        peakTime +=
          API.userUtil.formatTimeToStr(
            this.addUserForm.PeakTimes[i].value[0],
            "hh:mm"
          ) +
          "-" +
          API.userUtil.formatTimeToStr(
            this.addUserForm.PeakTimes[i].value[1],
            "hh:mm"
          ) +
          ",";
      }
      console.log(peakTime);
      var flatTime = "";
      for (var i = 0; i < this.addUserForm.FlatTimes.length; i++) {
        flatTime +=
          API.userUtil.formatTimeToStr(
            this.addUserForm.FlatTimes[i].value[0],
            "hh:mm"
          ) +
          "-" +
          API.userUtil.formatTimeToStr(
            this.addUserForm.FlatTimes[i].value[1],
            "hh:mm"
          ) +
          ",";
      }
      console.log(flatTime);
      var ravineTime = "";
      for (var i = 0; i < this.addUserForm.RavineTimes.length; i++) {
        ravineTime +=
          API.userUtil.formatTimeToStr(
            this.addUserForm.RavineTimes[i].value[0],
            "hh:mm"
          ) +
          "-" +
          API.userUtil.formatTimeToStr(
            this.addUserForm.RavineTimes[i].value[1],
            "hh:mm"
          ) +
          ",";
      }
      console.log(ravineTime);
      let params = {
        peakTime: peakTime,
		flatTime: flatTime,
		ravineTime: ravineTime,
		jPeakCharge: this.addUserForm.jPeakCharge,
		tPeakCharge:this.addUserForm.tPeakCharge,
		hPeakCharge:this.addUserForm.hPeakCharge,
		jFlatCharge:this.addUserForm.jFlatCharge,
		tFlatCharge:this.addUserForm.tFlatCharge,
		hFlatCharge:this.addUserForm.hFlatCharge,
        hRavineCharge: this.addUserForm.hRavineCharge,
        jRavineCharge: this.addUserForm.jRavineCharge,
        tRavineCharge: this.addUserForm.tRavineCharge,
        status : this.addUserForm.status
      };
      this.$refs[addUserForm].validate(valid => {
		  console.log(this.addUserForm.status);
        if (valid) {
          API.chargeUtil
            .addCharge(params)
            .then(({ data }) => {
              if (data.data == true) {
                this.addFormVisible = false;
                this.$message("添加成功!");
                this.loadData(this.criteria, this.currentPage, this.pagesize);
              } else {
                this.$message("请求失败！");
              }
            })
            .catch(data => {
              this.$message("请求失败！");
              console.log(data);
            });
        } else {
          return false;
        }
      });
    },
    //添加峰时刻
    addPeak() {
      this.addUserForm.PeakTimes.push({
        value: "",
        key: Date.now()
      });
    },
    removePeak(item) {
      var index = this.addUserForm.PeakTimes.indexOf(item);
      if (index !== -1) {
        this.addUserForm.PeakTimes.splice(index, 1);
      }
    },
    //添加平时刻
    addFlat() {
      this.addUserForm.FlatTimes.push({
        value: "",
        key: Date.now()
      });
    },
    removeFlat(item) {
      var index = this.addUserForm.FlatTimes.indexOf(item);
      if (index !== -1) {
        this.addUserForm.FlatTimes.splice(index, 1);
      }
    },
    //添加谷时刻
    addRavine() {
      this.addUserForm.RavineTimes.push({
        value: "",
        key: Date.now()
      });
    },
    removeRavine(item) {
      var index = this.addUserForm.RavineTimes.indexOf(item);
      if (index !== -1) {
        this.addUserForm.RavineTimes.splice(index, 1);
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

    //编辑
    handleEdit: function(index, row) {
        let params = { id: row.id };
      this.$confirm(
        "是否将本条设为默认?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          API.chargeUtil
            .editCharge(params)
            .then(({ data }) => {
              if (data.data == true) {
                this.$message({ type: "success", message: "修改成功!" });
                this.loadData(this.criteria, this.currentPage, this.pagesize);
              } else {
                this.$message({ type: "info", message: "修改失败" });
              }
            })
            .catch(data => {
              this.$message("修改失败！");
            });
          this.$message({ type: "success", message: "修改成功!" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消修改" });
        });
    },

    //修改
    editSubmitForm(editUserForm) {
      let params = {
        geNumber: this.editUserForm.geNumber,
        userState: this.editUserForm.userState
      };
      this.$refs[editUserForm].validate(valid => {
        if (valid) {
          API.userUtil
            .updateUser(params)
            .then(({ data }) => {
              if (data.data == true) {
                this.dialogFormVisible = false;
                this.loadData(this.criteria, this.currentPage, this.pagesize);
              } else {
                this.$message("请求失败！");
              }
            })
            .catch(data => {
              this.$message("请求失败！");
              console.log(data);
            });
        } else {
          this.$message.error("请求失败！");
          return false;
        }
      });
    },

    //单行删除
    handleDelete: function(index, row) {
      let params = { id: row.id };
      this.$confirm(
        "此操作将永久删除“" + row.id + "”, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          API.chargeUtil
            .deleteCharge(params)
            .then(({ data }) => {
              if (data.data == true) {
                this.$message({ type: "success", message: "删除成功!" });
                this.loadData(this.criteria, this.currentPage, this.pagesize);
              } else {
                this.$message({ type: "info", message: "删除失败" });
              }
            })
            .catch(data => {
              this.$message("请求失败！");
            });
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },

    //搜索
    search: function() {
      console.log(this.select);
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },
    add: function() {
      this.addFormVisible = true;
    },
    exportUser() {
      window.location.href = "http://localhost:8088/api/exportUser.do";
    },
    /*
		        //多项删除
		        deletenames: function(){
		        	if(this.multipleSelection.length==0)
		        		return;
		        	var array = [];
		        	this.multipleSelection.forEach((item) = > {
		        		array.push(item.id);
			        })
					this.$http.post('../delete',{"array":array},{emulateJSON: true}).then(function(res){
						this.loadData(this.criteria, this.currentPage, this.pagesize);
		            },function(){
		                console.log('failed');
		            });
		        },
		      */
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
