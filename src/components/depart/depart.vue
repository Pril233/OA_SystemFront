<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- to属性里面是访问首页的路由 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!--搜索区域-->
     <el-row :gutter="20">

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加部门</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- :data指定数据源 border添加边框线 stripe隔行变色-->
      <el-table :data="departList" border stripe>
        <!-- 用label来指定列的名称 用prop来指定列的值 -->
        <!-- type='index' 意思是添加索引列 -->
        <el-table-column label="id" type="index"></el-table-column>
        <el-table-column label="部门名称" prop="name"></el-table-column>
        <el-table-column label="管理员" prop="manager"></el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 鼠标点击上去文字提示 -->
            <el-tooltip content="修改" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDepartById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 部门添加对话框区域 -->
    <!--
      :visible.sync="dialogVisible" 弹框是否弹出  在data中dialogVisible = false
      点击添加部门按钮 在按钮事件中把dialogVisible = true
    -->
    <el-dialog title="部门添加" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 主内容区 -->
      <!--
        :model="addDepartment" 数据绑定对象 和下面的v-model对应
        :rules="addDepartmentRules" 验证规则对象 和下面的prop对应prop指定引用的规则
        ref="addDepartmentRef" 引用对象 与清空事件有关 @close="addDialogClosed"
        prop对应规则对象的具体规则
      -->
      <el-form :model="addDepartment" :rules="addDepartmentRules" ref="addDepartmentRef">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addDepartment.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员" prop="manager">
          <el-input v-model="addDepartment.manager"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="addDepartment.tel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepart">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改部门对话框-->
    <el-dialog
      title="修改部门"
      :visible.sync="editDialogVisible"
      width="50%">
      <!--内容主体区域-->
      <span>
          <el-form :model="editForm" :rules="addDepartmentRules"
                   ref="editFormRef" label-width="70px" >
    <el-form-item label="部门名称" prop="username">
      <el-input v-model="editForm.name" ></el-input>
    </el-form-item>
    <el-form-item label="管理员" prop="name">
      <el-input v-model="editForm.manager"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-input v-model="editForm.tel"></el-input>
    </el-form-item>
          </el-form>


        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {


 created(){
      this.getDepartList()
  },

  
  data() {
    // 验证手机号的验证规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        // 合法的手机号
        return cb()
      }
      // 非法的手机号
      cb(new Error('请输入正确的手机号'))
    }
    return {
      queryInfo: {
        // 每页显示多少数据
        query:'',
        pagesize: 2,
        // 当前的页数
        pagenum: 1,
        // 在页码区显示有多少条记录
        total: 0
      },
      // 部门添加是否弹出的绑定属性
      addDialogVisible: false,
      // 添加部门弹框的绑定数据
      addDepartment: {
        name: '',
        manager: '',
        tel: ''
      },
      editForm:{

      },
      departList:[],
      // 验证规则对象
      addDepartmentRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '管理员名称不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editDialogVisible:false

    }
  },
 
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getDepartList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getDepartList()
    },

    addDialogClosed() {
      // addDepartmentRef是添加弹框的引用对象  使用引用对象清空添加部门的弹框
      this.$refs.addDepartmentRef.resetFields()
    },
    async getDepartList(){
      const{data:res} = await this.$http.get('departsByPage',{
        params:this.queryInfo
      })
      if(res.meta.status != 200) {
        return this.$message.error('获取部门列表失败')
      }
      this.departList = res.data.departs
      this.total = res.data.total
      console.log(res)
    },
    addDepart(){
      this.$refs.addDepartmentRef.validate(async valid => {
        if(!valid) return
        //可以发起添加用户的网络请求
        const {data:res} = await this.$http.post('departs',this.addDepartment)
        if(res.meta.status !== 200) {
          this.$message.error('添加部门失败!')
        }
        this.$message.success('添加部门成功!')
        //隐藏添加用户对话框
        this.getDepartList()
        this.addDialogVisible = false
        //重新获取用户列表
      })
    },
    async showEditDialog(id){
      const{data:res} = await this.$http.get('departs/'+id)
      if(res.meta.status != 200){
        return this.$message.error('查询用户信息失败!')
      }
      this.editForm = res.data
      this.editDialogVisible = true

    },


    editUser(){
        this.$refs.editFormRef.validate(async valid =>{
          if(!valid) return
          const {data:res} = await this.$http.put('departs',this.editForm)
          if(res.meta.status !=200 ){
            this.$message.error('修改部门失败!')
          }
          this.$message.success('修改部门成功!')
          //隐藏添加用户对话框
          this.editDialogVisible = false
          this.getDepartList()

        })

      },
    async removeDepartById(id){
      const confirmResult = await this.$confirm('此操作将永久删除该部门, 是否继续?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      })
        .catch(err => err)
      if(confirmResult !== 'confirm'){
        return this.$message.info('已经取消删除')
      }
      /*console.log('确认了删除')*/
      const {data:res} = await this.$http.delete('departs/'+id)

      if(res.meta.status!==200){
        return this.$message.error('删除部门失败!')
      }
      this.$message.success('删除部门成功!')
      this.getDepartList()
    }
    }

}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
