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
          <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>

        <!--用户列表区域-->
        <el-table :data="userList" border stripe>
          <el-table-column type="index"></el-table-column>
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
              <el-button type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <!--删除按钮-->
              <el-tooltip class="item" effect="dark" content="删除员工" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"></el-button>
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
        width="50%">
        <!--内容主体区域-->
        <span>
          <el-form :model="addForm" :rules="addFormRules"
                   ref="addFormRef" label-width="70px" >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username"></el-input>
    </el-form-item>
          </el-form>
           <el-form :model="addForm" :rules="addFormRules"
                    ref="addFormRef" label-width="70px" >
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password"></el-input>
    </el-form-item>
          </el-form>
          <el-form :model="addForm" :rules="addFormRules"
                   ref="addFormRef" label-width="70px" >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="addForm.name"></el-input>
    </el-form-item>
          </el-form>
          <el-form :model="addForm" :rules="addFormRules"
                   ref="addFormRef" label-width="70px" >
    <el-form-item label="电话" prop="tel">
      <el-input v-model="addForm.tel"></el-input>
    </el-form-item>
          </el-form>


 <div style="margin-left: 27px;margin-top: 10px; display:inline">
   选择角色
              <el-radio-group v-model="addForm.role" style="margin-left:5px; margin-right:15px">
      <el-radio-button label="1">管理员</el-radio-button>
      <el-radio-button label="2">部门领导</el-radio-button>
      <el-radio-button label="3">普通员工</el-radio-button>

    </el-radio-group>
 </div>
          <el-select v-model="addForm.pid" placeholder="请选择职位">
    <el-option
      v-for="item in postList"
      :label="item.name"
      :value="item.id">  <!--选中的值-->
    </el-option>
  </el-select>




        </span>
        <!--底部区域-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
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
            total:0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible:false,
            //添加用户的表单数据
            addForm:{
              username:'',
              password:'',
              name:'',
              tel:'',
              role:'1',
              pid:''
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






          }
      },
      created(){
          this.getUserList(),
          this.getPostList()
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

      }
    }

</script>

<style scoped>

</style>
