<template>
  <div>
    <!--添加对话框-->
    <add-dialog ref = "addDialog"></add-dialog>


  <el-card class="box-card">
    <el-row :gutter="20">

      <el-col :span="4">
        <el-button type="primary" @click="addChild">添加职位</el-button>
      </el-col>
    </el-row>



    <!--列表-->
    <post-list ref="postList" v-bind:postList="postList" v-on:getPostList="getPostList" ></post-list>

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
  </div>
</template>

<script>
    import PostList from "./postList";
    import AddDialog from "./addPostDialog";
    import EditPostDialog from "./editPostDialog";

    export default {
      components: {
        EditPostDialog,
        AddDialog,
        PostList},
      name: "postcard",

      data(){
        return{
          queryInfo:{
            pagenum:1,
            pagesize:2
          },
          total:0,
          postList:[]

        }
      },
      created(){
          this.getPostList()
      },
      methods:{
        getQueryInfo(){
            return this.$refs.postList.queryInfo

        },
        async getPostList(){
          const{data:res} = await this.$http.get('/Page4Post',{params:this.queryInfo})
          if(res.meta.status != 200)
            return this.$message.error('获取初始化信息失败')
          this.total = res.data.total
          this.postList = res.data.posts
          console.log(res)
        },

        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getPostList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getPostList()
        },
        addChild(){
         this.$refs.addDialog.dialogVisible = true
        }
      }
    }
</script>

<style scoped>

</style>
