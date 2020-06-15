<template>
  <el-dialog
    title="添加职位"
    :visible.sync="dialogVisible"
    width="30%"
  >


    <!--职位表单认证-->
    <el-form :model="editPostForm" :rules="rules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="code" prop="code">
        <el-input v-model="editPostForm.code"></el-input>
      </el-form-item>
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="editPostForm.name"></el-input>
      </el-form-item>

    </el-form>



    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editPost()">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "edit-post-dialog",

      data(){
          return{
            dialogVisible:false,
            editPostForm:{
              id:0,
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
         showDialog(index,code,name){
           console.log(index,code,name)
           this.dialogVisible = true
           this.editPostForm.id = index
           this.editPostForm.code = code
           this.editPostForm.name = name

         },

         editPost(){
            this.$refs.editFormRef.validate(async valid =>{
              if(!valid) return
              const {data:res} = await this.$http.put('posts',this.editPostForm)
              if(res.meta.status !=200 ){
                this.$message.error('修改职位失败!')
              }
              this.$message.success('修改职位成功!')


              this.$parent.refresh()
              this.dialogVisible = false

            })
         }
      }

    }
</script>

<style scoped>

</style>
