<template>
  <div>
  <el-table
    :data="postList"
    style="width: 100%"
    border stripe
    >
    <el-table-column
      type="index"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="code"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="职位名字"
    >
    </el-table-column>


    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">


        <!--修改按钮-->
        <el-tooltip class="item" effect="dark" content="修改职位信息" placement="top" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" @click="editChilck(scope.row.id,scope.row.code,scope.row.name)"></el-button>
        </el-tooltip>
        <!--删除按钮-->
        <el-tooltip class="item" effect="dark" content="删除职位" placement="top" :enterable="false">
          <el-button type="danger" icon="el-icon-delete"
                     @click="deletePostById(scope.row.id)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>

  </el-table>

  <edit-post-dialog ref="editDialog"></edit-post-dialog>

  </div>
</template>

<script>
    import EditPostDialog from "./editPostDialog";

    export default {
      components: {EditPostDialog},
      name: "post-list",
        props: {
        postList: {
          type: Array,
          required: true
        }

      },

    data(){

          return{

            queryInfo: {
              pagenum: 1,
              pagesize: 2
            },
            total: 0,
            rowNow:{}
          }
    },

    created(){
        /*this.getPostList()*/
    },

    methods:{
      getDetails(row){
        this.rowNow = row
        console.log(this.rowNow)//此时就能拿到整行的信息
      },

      editChilck(index,code,name){
        /*console.log( this.$refs.editDialog)*/
       /* this.$refs.editDialog.editPostForm = row*/
        this.$refs.editDialog.showDialog(index,code,name)
       /* this.$refs.editDialog.dialogVisible = true*/

      },

      refresh(){this.$emit("getPostList")},

       async deletePostById(id){
        // console.log(id)
        const confirmResult = await this.$confirm('此操作将永久删除该职位, 是否继续?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning'
          })
          .catch(err => err)
          if(confirmResult != 'confirm'){
            return this.$message.info('已经取消删除')
          }
          const{data:res} = await this.$http.delete('posts/'+id)
          if(res.meta.status != 200){
            return this.$message.error('删除职位失败')
          }
          this.$message.success('删除职位成功')
          this.refresh()
    }


    }
    

    }
</script>

<style scoped>

</style>
