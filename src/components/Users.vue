<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="queryInfo.query" clearable placeholder="请输入内容" @change="getUserList" @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="角色名" prop="role_name"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="创建时间" prop="create_time"></el-table-column>
            <el-table-column label="手机号" prop="mobile"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
                           @change="changeStatus(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="display: none">{{ scope.row }}</div>
                <el-button circle icon="el-icon-edit" size="mini" type="primary"
                           @click="updateDialog(scope.row)"></el-button>
                <el-button circle icon="el-icon-delete" size="mini" type="danger"
                           @click="deleteUser(scope.row)"></el-button>
                <el-tooltip :enterable="false" content="分配角色" effect="dark" placement="top">
                  <el-button circle icon="el-icon-setting" size="mini" type="warning"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <el-pagination
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            :page-sizes="[1, 5, 10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!--  添加用户  -->
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="addDialogVisible"
      title="添加"
      width="50%"
      @close="addDialogClose">
      <span>
        <el-form ref="addUserFormRef" :model="addUserInfo" :rules="addUserRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserInfo.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserInfo.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--  修改用户  -->
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="updateDialogVisible"
      title="修改"
      width="50%"
      @close="updateDialogClose">
      <span>
        <el-form ref="updateUserFormRef" :model="updateUserInfo" :rules="updateUserRules" label-width="80px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="updateUserInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="updateUserInfo.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取参数列表的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      updateDialogVisible: false,
      addUserInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      updateUserInfo: {
        id: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入E-mail地址',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }
        ]
      },
      updateUserRules: {
        email: [
          {
            required: true,
            message: '请输入E-mail地址',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
    },
    updateDialog (scope) {
      console.log(scope)
      this.updateDialogVisible = true
      this.updateUserInfo.id = scope.id
      this.updateUserInfo.email = scope.email
      this.updateUserInfo.mobile = scope.mobile
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async changeStatus (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新状态失败' + res.meta.msg)
      }
      this.$message.success('更新状态成功')
    },
    addDialogClose () {
      this.$refs.addUserFormRef.resetFields()
    },
    updateDialogClose () {
      this.$refs.updateUserFormRef.resetFields()
    },
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('users', this.addUserInfo)
          if (res.meta.status !== 201) {
            return this.$message.error('添加失败' + res.meta.msg)
          }
          this.$message.success('添加成功')
          this.addDialogVisible = false
          await this.getUserList()
        }
      })
    },
    updateUser () {
      this.$refs.updateUserFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.put(`users/${this.updateUserInfo.id}`, this.updateUserInfo)
          if (res.meta.status !== 200) {
            return this.$message.error('修改失败' + res.meta.msg)
          }
          this.$message.success('修改成功')
          this.updateDialogVisible = false
          await this.getUserList()
        }
      })
    },
    deleteUser (scope) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`users/${scope.id}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败' + res.meta.msg)
        }
        this.$message.success('删除成功')
        await this.getUserList()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
