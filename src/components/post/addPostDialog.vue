<template>
  <el-dialog
    title="添加职位"
    :visible.sync="dialogVisible"
    width="30%"
    >


    <!--职位表单认证-->
    <el-form :model="addPostForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="code" prop="code">
        <el-input v-model="addPostForm.code"></el-input>
      </el-form-item>
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="addPostForm.name"></el-input>
      </el-form-item>

    </el-form>



    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPost()">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "add-dialog",



      data(){

          return{
            dialogVisible:false,
            addPostForm:{
              code:'',
              name:''
            },
            rules:{
              code:[{required:true,message:"不能为空", trigger: 'blur'}],
              name:[{required:true,message:"不能为空", trigger: 'blur'}]
            }
          }

      },
      methods:{
          addPost(){
            this.$refs.ruleForm.validate(async valid =>{
            if(!valid) return
             const{data:res} = await this.$http.post('/addPost',this.addPostForm)
            if(res.meta.status != 200)
              return this.$message.error('添加职位失败')
            this.$message.success("添加职位成功")
            this.dialogVisible = false
            this.$parent.getPostList()
            })
           

          }
      }
    }
</script>

<style scoped>

</style>
