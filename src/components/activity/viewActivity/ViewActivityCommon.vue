<template>
  <div>
    <!-- 普通活动table表格 -->
    <el-table :data="CommonForm" border stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="founder" label="发布人"></el-table-column>
      <el-table-column prop="creationdata" label="活动时间"></el-table-column>
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <!-- 查看按钮 -->
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button type="primary" @click="context(scope.row)">活动内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog title="活动内容" :visible.sync="ActivityContentDialogVisible" width="50%">
      <span>{{this.Content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ActivityContentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ActivityContentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created(){
     this.getCommonList()
  },
  data() {
    return {
      // 普通活动表格数据 下面是一些假数据  只需要把后端的数据渲染到CommonForm这个数组就行了
      CommonForm: [
        {
          founder: 'dfdf',
          creationdata: '2012-12-12',
          title: '周六去团队建设',
          content: '加班'
        },
        
      ],
      // 下面是前端用到的数据 不用管 也不要删除
      // 活动内容的弹框 默认为false
      ActivityContentDialogVisible: false,
      // 活动内容弹框  活动内容
      Content: ''
    }
  },
  methods: {
    context(content) {
      this.ActivityContentDialogVisible = true
      // 重新赋值Content
      this.Content = content.content
    },

    async getCommonList(){
      const{data:res} = await this.$http.get('CommonList')
      this.CommonForm = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
