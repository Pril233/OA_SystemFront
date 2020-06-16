<template>
<div>
  <!--面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>文件上传</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card class="box-card">
      <h3>文件上传</h3>

            
             <!-- <el-form  status-icon rules="" ref="">
            <el-form-item label="上传文件:" > -->
            <el-upload
            ref=upload
            :data="{fileInfo:this.id}"
            :auto-upload="false"
            :action="action"
            :limit="5"
            :on-change="addFile"
            :on-remove="removeFile"
            :file-list="fileList"
            :disabled="disabled"
            >
                 <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>

            <div>
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="insert">确 定</el-button>
                <!-- <a href="http://127.0.0.1:8888/OA_System/download?fileName=api接口文档.md">lalala</a> -->
            </div>


            <!-- </el-form-item>
             </el-form> -->
 


    </el-card>
  
  


  
</div>
</template>

<script>
export default{
    data(){
        return{
            action:'http://127.0.0.1:8888/OA_System/upFile',
            fileList:[],
            disabled:false,
            id:sessionStorage.getItem('id')
            
            
        }
    },
    methods:{
        beforeUpload(file,fileList){
             console.log(file)
        },

        addFile(file,fileList){
           console.log(file, fileList);

        },

        removeFile(file,fileList){
           console.log(file, fileList);
        },

        insert(){
            this.$refs.upload.submit();
        },


        onExceed(){
            this.$message.error('每次只能上传5个文件')
        }
    }
}
</script>

<style scoped>

</style>
