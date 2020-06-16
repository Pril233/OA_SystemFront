<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看公告</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <!-- 使用v-for循环 循环 ViewAnnouncementForm对象里面的数组ViewAnnouncementFormArr-->
  

<el-carousel   height="600px"   :autoplay="false"> 
      <el-carousel-item  v-for="item in ViewAnnouncementFormArr" :key="item.id" ref="carousel">


    <el-card  :key="item.id" ref="card" >
      <el-form label-width="80px" >
        <el-form-item label="公告id">
          <el-input v-model="item.id"   readonly  ref="inputId"></el-input>
        </el-form-item>
        <el-form-item label="公告标题">
          <el-input v-model="item.title" readonly></el-input>
        </el-form-item>
        <el-form-item label="公告时间"> 
          <el-input v-model="item.data" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="item.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input v-model="item.context" type="textarea" :rows="10" style="width:450px" readonly></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="danger" @click="deleteAnnoById(item.id)">删除</el-button>
        </el-form-item>

      </el-form>
    </el-card>


    </el-carousel-item>  
 </el-carousel>

  </div>
</template>
<script>
export default {
  created(){
    this.getAnnoList()
  },
  data() {
    return {
      // 查看公告表单
     
        ViewAnnouncementFormArr: [
          // 下面是一些假数据  是可以删除的  数组里面有五组数组
     
        ]
      
    }
  },
  methods:{

    
    async getAnnoList(){
      const{data:res} = await this.$http.get('annos')
       if(res.meta.status != 200) {
        return this.$message.error('获取公告信息失败')
          }
          this.ViewAnnouncementFormArr = res.data
          // console.log(res.data)
    },
    async deleteAnnoById(id){
        //console.log(id)
        const{data:res} = await this.$http.put('anno/'+id)
         if(res.meta.status != 200) {
        return this.$message.error('删除公告信息失败')
          }
          this.getAnnoList()
          return this.$message.success('删除成功！')
         
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  background-color: rgb(154, 155, 154);
}
.el-input {
  width: 150px;
}
</style>
