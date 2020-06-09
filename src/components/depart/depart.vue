<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- to属性里面是访问首页的路由 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加部门</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- :data指定数据源 border添加边框线 stripe隔行变色-->
      <el-table :data="userlist" border="true" stripe="true">
        <!-- 用label来指定列的名称 用prop来指定列的值 -->
        <!-- type='index' 意思是添加索引列 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="部门名称" prop="username"></el-table-column>
        <el-table-column label="管理员" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 作用域插槽 -->
          <template>
            <!-- 鼠标点击上去文字提示 -->
            <el-tooltip content="修改" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 9]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 每页显示多少数据
      pagesize: 2,
      // 当前的页数
      pagenum: 1,
      // 在页码区显示有多少条记录
      total: 0
    }
  },
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
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
