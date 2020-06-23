<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- to属性里面是访问首页的路由 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件下载</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>



      <!-- 文件列表区 -->
      <!-- :data指定数据源 border添加边框线 stripe隔行变色-->
      <el-table :data="fileList" border stripe>
        <!-- 用label来指定列的名称 用prop来指定列的值 -->
        <!-- type='index' 意思是添加索引列 -->
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="文件名称" prop="filename" style="color:#409EFF;" ></el-table-column>
        <el-table-column label="创建者" prop="founder"></el-table-column>
        <el-table-column label="创建时间" prop="creationdata"></el-table-column>
        <el-table-column label="文件大小" prop="filesize"></el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 鼠标点击上去文字提示 -->
            <el-tooltip content="下载" placement="top">
            <el-link type="primary" :href="'http://127.0.0.1:8888/OA_System/download?fileName='+scope.row.filename">下载</el-link>            
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

  


  </div>
</template>

<script>
export default {


 created(){
    this.getFileList()
  },

  
  data() {
 
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

      editForm:{

      },
      fileList:[
     
      ],

    }
  },
 
  methods: {
     //监听 pagesize 改变的事件
     handleSizeChange(newSize) {
       console.log(newSize)
       this.queryInfo.pagesize = newSize
       this.getFileList()
     },
      //监听页码值改变的事件
     handleCurrentChange(newPage) {
       console.log(newPage)
       this.queryInfo.pagenum = newPage
       this.getFileList()
     },

    removeFileById(id){},


    async getFileList(){
      const{data:res} = await this.$http.get('fileList',{
        params:this.queryInfo
      })
      if(res.meta.status != 200) {
        return this.$message.error('获取文件列表失败')
      }
      this.fileList = res.data.files
      this.total = res.data.total
      console.log(res.data)

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
