<template>
  <div>
    <!-- 普通活动table表格 -->
    <el-table :data="VoteForm" border stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="发布人"></el-table-column>
      <el-table-column prop="time" label="活动时间"></el-table-column>
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <!-- 查看按钮 -->
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button type="danger" @click="context(scope.row)">活动内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog title="活动内容" :visible.sync="ActivityContentDialogVisible" width="50%">
      <!-- 活动内容 -->
      <el-row>{{this.Content}}</el-row>
      <br />
      <!-- 活动进度条 -->
      <!-- 支持 -->
      <el-row>
        <el-col :span="5">活动支持百分比</el-col>
        <el-col :span="8">
          <el-progress :percentage="AgreeP" :text-inside="true" :stroke-width="24"  status="success"></el-progress>
        </el-col>
        <el-col :span="8">{{this.Agree}}人</el-col>
      </el-row>
      <!-- 反对 -->
      <el-row>
        <el-col :span="5">活动反对百分比</el-col>
        <el-col :span="8">
          <el-progress
            :percentage="DisAgreeP"
            :text-inside="true"
            :stroke-width="24"
            status="exception"
          ></el-progress>
        </el-col>
        <el-col :span="8">{{this.DisAgree}}人</el-col>

      </el-row>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="contextReset">取 消</el-button>
        <el-button type="primary" @click="contextReset">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created(){
    this.getVoteActList()
  },
  data() {
    return {
      // 普通活动表格数据 下面是一些假数据 只需要把数据渲染到VoteForm这个数组就行了
      VoteForm: [
        {
          name: 'dfdf',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '加班',
          Agree: '30.55',
          DisAgree: '69.55'
        },
        
      ],
      // 下面是前端用到的数据  不用管  也不要删除
      // 活动内容的弹框可视化 默认为false
      ActivityContentDialogVisible: false,
      // 活动内容弹框  活动内容
      Content: '',
      // 赞同人数
      Agree: '',
      // 反对人数
      DisAgree: '',
      //赞成百分比
      AgreeP:0,
      //反对百分比
      DisAgreeP:0

    }
  },
  methods: {
    // 活动内容弹框
    context(content) {
      // 活动内容的弹框可视化 赋值为true
      this.ActivityContentDialogVisible = true
      // 后端的content赋值给前端的Content 重新赋值Content 
      this.Content = content.content
      // 后端的Agree赋值给前端的Agree  重新赋值Agree
      this.Agree = content.Agree
      this.DisAgree = content.DisAgree
    if(this.Agree+this.DisAgree != 0){
      this.AgreeP = (this.Agree/(this.Agree+this.DisAgree))*100
      // 后端的DisAgree赋值给前端的DisAgree  重新赋值DisAgree
      this.DisAgreeP =  (this.DisAgree/(this.Agree+this.DisAgree))*100
    }
      
      
    },
    contextReset(){
      this.ActivityContentDialogVisible = false
      this.contextReset1()

    },
    contextReset1(){
      this.AgreeP=0
      //反对百分比
      this.DisAgreeP=0
    },
  


    async getVoteActList(){
        const{data:res} = await this.$http.get('voteList')
         if(res.meta.status != 200) {
        return this.$message.error('获取投票活动列表失败')
      }
      this.VoteForm = res.data
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
