<template>
<div>
  <!--面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    <el-breadcrumb-item>员工列表</el-breadcrumb-item>
  </el-breadcrumb>

  <postcard></postcard>
</div>
</template>

<script>
    import Postcard from "./postCard";

    export default {
      components: {Postcard},
      name: "post"
    }
</script>

<style scoped>

</style>
