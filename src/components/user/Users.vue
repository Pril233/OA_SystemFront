<template>
    <div>
      <!--面包屑导航区域-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!--卡片视图-->
      <!--搜索与添加区域-->
      <el-card class="box-card">

        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>

        <!--用户列表区域-->
        <el-table :data="userList" border stripe>
          <el-table-column label="id" prop="id" width="50px"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="电话" prop="tel"></el-table-column>
          <el-table-column label="角色" prop="role.name"></el-table-column>
          <el-table-column label="职位" prop="post.name"></el-table-column>
          <el-table-column label="部门" prop="depart.name"></el-table-column>


          <!--操作区域--------------------------------------------------------------------->
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <!--修改按钮-->
              <el-tooltip class="item" effect="dark" content="修改员工信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id,scope.name)"></el-button>
              </el-tooltip>
              <!--删除按钮-->
              <el-tooltip class="item" effect="dark" content="删除员工" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>


        </el-table>


        <!--分页区域-------------------------------------------------------------------------->
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </el-card>

      <!--添加用户--------------------------------------------------------------------->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed">
        <!--内容主体区域-->
        <span>
          <el-form :model="addForm" :rules="addFormRules"
                   ref="addFormRef" label-width="70px" >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="addForm.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-input v-model="addForm.tel"></el-input>
    </el-form-item>
          </el-form>


 <div style="margin-left: 27px;margin-top: 10px;">
   选择角色
              <el-radio-group v-model="addForm.role.id" style="margin-left:5px; margin-right:15px">
      <el-radio-button label=1>管理员</el-radio-button>
      <el-radio-button label=2>部门领导</el-radio-button>
      <el-radio-button label=3>普通员工</el-radio-button>

    </el-radio-group>
 </div>

    <div style="margin-left: 27px;margin-top: 25px;">
      选择职位和部门

          <el-select v-model="addForm.post.id" placeholder="请选择职位">
    <el-option
      v-for="item in postList"
      :key="item.id"
      :label="item.name"
      :value="item.id">  <!--选中的值-->
    </el-option>
  </el-select>

           <el-select v-model="addForm.depart.id" placeholder="请选择部位">
    <el-option
      v-for="item in departList"
      :key="item.id"
      :label="item.name"
      :value="item.id">  <!--选中的值-->
    </el-option>
  </el-select>
    </div>




        </span>
        <!--底部区域-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
      </el-dialog>







      <!--修改用户对话框-->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%">
        <!--内容主体区域-->
        <span>
          <el-form :model="editForm" :rules="addFormRules"
                   ref="editFormRef" label-width="70px" >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editForm.username"  disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="editForm.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-input v-model="editForm.tel"></el-input>
    </el-form-item>
          </el-form>


 <div style="margin-left: 27px;margin-top: 10px;">
   选择角色
              <el-radio-group v-model="editForm.role.id" style="margin-left:5px; margin-right:15px">
      <el-radio-button label=1>管理员</el-radio-button>
      <el-radio-button label=2>部门领导</el-radio-button>
      <el-radio-button label=3>普通员工</el-radio-button>

    </el-radio-group>
 </div>


    <div style="margin-left: 27px;margin-top: 25px;">
      选择职位和部门

          <el-select v-model="editForm.post.id" placeholder="请选择职位">
    <el-option
      v-for="item in postList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

           <el-select v-model="editForm.depart.id" placeholder="请选择部位">
    <el-option
      v-for="item in departList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    </div>





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
        name: "users",
      data(){
          return {
            //获取用户列表的参数对象
            queryInfo:{
              query:'',
              pagenum:1,
              pagesize:2
            },
            userList:[],
            postList:[],
            departList:[],

            total:0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible:false,
            editDialogVisible:false,
            //添加用户的表单数据
            addForm:{
              /*id:0,*/
              username:'',
              password:'',
              name:'',
              tel:'',
              role:{id:1},
              post:{id:1},
              depart:{id:1},
            },
            //添加表单的验证规则对象
            addFormRules:{
              username:[{
                required: true,message: '请输入用户名',trigger:
        'blur'},
                { min:3,
                  max:10,
                  message:'用户名的长度在3-10个字符之间',
                  trigger:'blur'

                }

                  ],

              password:[{
                required: true,message: '请输入密码',trigger:
                  'blur'},
                { min:6,
                  max:15,
                  message:'用户名的长度在6-15个字符之间',
                  trigger:'blur'

                }

              ],
            },
            //查询到的用户信息对象
            editForm:{
              role:{id:1},
              post:{id:2},
              depart:{id:1}
            }






          }
      },
      created(){
          this.getUserList(),
          this.getPostList(),
            this.getDepartList()
      },
      methods:{
          async getUserList(){
           const{data:res} = await this.$http.get('users',{
             params:this.queryInfo
           })
            if(res.meta.status != 200) {
              return this.$message.error('获取员工列表失败')
            }
            this.userList = res.data.users
            this.total = res.data.total
            console.log(res)
          },
      //监听pagesize改变的事件
        handleSizeChange(newSize){
            console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            console.log(newPage)
          this.queryInfo.pagenum = newPage
          this.getUserList()

        },

        async getPostList(){
          const{data:res} = await this.$http.get('posts',
          )
          if(res.meta.status != 200) {
            return this.$message.error('获取职位列表失败')
          }
          this.postList = res.data

        },

        async getDepartList(){
          const{data:res} = await this.$http.get('departs',
          )
          if(res.meta.status != 200) {
            return this.$message.error('获取部门列表失败')
          }
          this.departList = res.data

        },
        //监听添加用户对话框的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        //点击按钮添加
        addUser(){
          this.$refs.addFormRef.validate(async valid => {
            if(!valid) return
            //可以发起添加用户的网络请求
            const {data:res} = await this.$http.post('users',this.addForm)
            if(res.meta.status !== 200) {
              this.$message.error('添加用户失败!')
            }
            this.$message.success('添加用户成功!')
            //隐藏添加用户对话框
            this.addDialogVisible = false
            //重新获取用户列表
            this.getUserList()
          })
        },


        async showEditDialog(id,name){
          console.log(name)

          /*console.log(this.editId)*/
          const {data: res} =  await this.$http.get('users/'+id)
          if(res.meta.status != 200){
            return this.$message.error('查询用户信息失败!')
          }
          this.editForm = res.data
          this.editDialogVisible = true
        },

        async editUser(){
            const {data:res} = await this.$http.put('users',this.editForm)
            if(res.meta.status !== 200) {
              this.$message.error('修改用户失败!')
            }
            this.$message.success('修改用户成功!')
            //隐藏添加用户对话框
            this.editDialogVisible = false
            //重新获取用户列表
            this.getUserList()
          },

        //根据Id删除用户
        async removeUserById(id){
            console.log(id)
          //弹框询问用户是否删除
          const confirmResult = await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })/*.catch(error => {
            return err
          })*/
            .catch(err => err)
          //如果用户确定删除，则返回字符串confirm
          //如果用户取消了删除,则返回值为字符串cancel
          /*console.log(confirmResult)*/
          if(confirmResult !== 'confirm'){
            return this.$message.info('已经取消删除')
          }
          /*console.log('确认了删除')*/
          const {data:res} = await this.$http.delete('users/'+id)

          if(res.meta.status!==200){
            return this.$message.error('删除用户失败!')
          }
          this.$message.success('删除用户成功!')
          this.getUserList()
        }


      }
    }

</script>

<style scoped>

</style>
