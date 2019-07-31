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
        <el-table-column prop="geNumber" width="95px" label="工号" sortable></el-table-column>
        <el-table-column prop="geName" label="姓名" width="88px" sortable></el-table-column>
        <el-table-column prop="userState" label="状态" width="88px" sortable></el-table-column>
        <el-table-column prop="phone" label="电话" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱" sortable></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" sortable></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
        <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
          <el-form-item label="用户工号" :label-width="formLabelWidth" prop="geNumber">
            <el-input v-model="editUserForm.geNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户状态" :label-width="formLabelWidth" prop="userState">
            <el-select v-model="editUserForm.userState" placeholder="状态">
              <el-option label="有效" value="有效"></el-option>
              <el-option label="无效" value="无效"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="geName">
            <el-input v-model="editUserForm.geName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
            <el-select v-model="editUserForm.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmitForm('editUserForm')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加用户" :visible.sync="addFormVisible">
        <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
          <el-form-item label="工号" :label-width="formLabelWidth" prop="geNumber">
            <el-input v-model="addUserForm.geNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="geName">
            <el-input v-model="addUserForm.geName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
            <el-select v-model="addUserForm.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="userState">
            <el-select v-model="addUserForm.userState" placeholder="状态">
              <el-option label="有效" value="有效"></el-option>
              <el-option label="无效" value="无效"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="addUserForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="addUserForm.email" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmitForm('addUserForm')">确 定</el-button>
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
import API from '@/api';
import Vue from 'vue';
export default {
  data() {
    return {
      //表格当前页数据
      tableData: [],
      //多选数组
      multipleSelection: [],
      //搜索条件
      criteria: '',
      //下拉菜单选项
      select: '',
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
      roles: [],//角色列表
      editUserForm: {
        geNumber: '',
        userState: '',
        roleId:'',
        geName:''
      },
      addUserForm: {
        geNumber: '',
        geName: '',
        userState: '',
        roleId: '',
        phone: '',
        email: '',
        password: ''
      },
      dialogFormVisible: false,
      addFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        geNumber: [
          { required: true, message: '请填写工号', trigger: 'blur' },
          { min: 7, max: 7, message: '请填写7个字符的工号', trigger: 'blur' }
        ],
        geName: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '请填写2-4个字符的姓名', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, max: 10, message: '请填写6-10个字符的密码', trigger: 'blur' }
        ],
        userState: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        phone: [
          {
            validator: (rule, value, callback) => {
              let vdt = API.validate.VDATA(value, { "required": { msg: "请输入手机号" }, "mphone": { msg: "请输入有效的手机号" } })
              if (!vdt.result) {
                callback(new Error(vdt.msg))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              let vdt = API.validate.VDATA(value, { "required": { msg: "请输入邮箱" }, "email": { msg: "请输入有效的邮箱" } })
              if (!vdt.result) {
                callback(new Error(vdt.msg))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
      }
    }
  },
  created() {
    this.loadData(this.criteria, this.currentPage, this.pagesize);
    if (this.hasPerm('user:add') || this.hasPerm('user:update')) {
      this.getAllRoles();
    }
  },
  methods: {
    //从服务器读取数据
    loadData: function (criteria, pageNum, pageSize) {
      let params = {
        'parameter': criteria,
        'pageNum': pageNum,
        'pageSize': pageSize
      };
      API.userUtil.getData(params).then(({ data }) => {
        console.log(data);
        if (data.status == 0) {
          this.tableData = data.data.userData;
          this.totalCount = data.data.number;
        } else {
          //this.$Message.error(data.msg);
          this.$message("请求失败！");
        }
      }).catch((data) => {
        this.$message("请求失败ww！");
        console.log(data);
      });
    },
    getAllRoles() {
      this.api({
        url: "/api/user/getAllRoles",
        method: "get"
      }).then(data => {
        this.roles = data.list;
      })
    },
    //多选响应
    handleSelectionChange: function (val) {
      this.multipleSelection = val;
    },

    //点击行响应
    handleclick: function (row, event, column) {
      this.highlightId = row.id;
    },

    //编辑
    handleEdit: function (index, row) {
      this.editUserForm.geNumber = row.geNumber;
      this.editUserForm.userState = row.userState;
      this.editUserForm.geName = row.geName;
      this.dialogFormVisible = true;
    },

    //修改
    editSubmitForm(editUserForm) {
      let params = {
        'geNumber': this.editUserForm.geNumber,
        'userState': this.editUserForm.userState,
        'geName': this.editUserForm.geName,
        'roleId': this.editUserForm.roleId
      };
      this.$refs[editUserForm].validate((valid) => {
        if (valid) {
          API.userUtil.updateUser(params).then(({ data }) => {
            if (data.data == true) {
              this.dialogFormVisible = false;
              this.loadData(this.criteria, this.currentPage, this.pagesize);
              //this.editUserForm.resetFields();
              this.$message("修改成功！");
              this.$refs['editUserForm'].resetFields();
            } else {
              this.$message("请求失败！");
              this.$refs['editUserForm'].resetFields();
            }
          }).catch((data) => {
            this.$message("请求失败！");
            this.$refs['editUserForm'].resetFields();
            console.log(data);
          });
        } else {
          this.$message.error("请求失败！");
          this.$refs['editUserForm'].resetFields();
          return false;
        }
      });
    },

    //添加用户
    addSubmitForm(addUserForm) {
      let params = {
        'geNumber': this.addUserForm.geNumber,
        'geName': this.addUserForm.geName,
        'userState': this.addUserForm.userState,
        'roleId': this.addUserForm.roleId,
        'phone': this.addUserForm.phone,
        'email': this.addUserForm.email,
        'password': this.addUserForm.password
      };

      this.$refs[addUserForm].validate((valid) => {
        if (valid) {
          API.userUtil.addUser(params).then(({ data }) => {
            if (data.data == true) {
              this.addFormVisible = false;
              this.$message("添加成功!");
              this.$refs['addUserForm'].resetFields();
              this.loadData(this.criteria, this.currentPage, this.pagesize);
            } else {
              this.$message(data.data);
              this.$refs['addUserForm'].resetFields();
            }
          }).catch((data) => {
            this.$message(data.data);
            this.$refs['addUserForm'].resetFields();
            console.log(data);
          });
        } else {
          return false;
        }
      });
    },

    //单行删除
    handleDelete: function (index, row) {
      let params = { 'geNumber': row.geNumber };
      this.$confirm('此操作将永久删除“' + row.geNumber + '”, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.userUtil.deleteUser(params).then(({ data }) => {
          if (data.data == true) {
            this.$message({ type: 'success', message: '删除成功!' });
            this.loadData(this.criteria, this.currentPage, this.pagesize);
          } else {
            this.$message({ type: 'info', message: '删除失败' });
          }
        }).catch((data) => {
          this.$message("请求失败！");
        });
        this.$message({ type: 'success', message: '删除成功!' });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      })
    },

    //搜索
    search: function () {
      console.log(this.select);
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },
    add: function () {
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
    tableRowClassName: function (row, index) {
      if (row.id == this.highlightId) {
        return 'info-row';
      }
    },

    //每页显示数据量变更
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },

    //页码变更
    handleCurrentChange: function (val) {
      this.currentPage = val;
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },

  },

}
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
