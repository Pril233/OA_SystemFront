<template>
  <div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    border stripe>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>


    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <!--修改按钮-->
        <el-tooltip class="item" effect="dark" content="修改员工信息" placement="top" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" @click="chilck"></el-button>
        </el-tooltip>
        <!--删除按钮-->
        <el-tooltip class="item" effect="dark" content="删除员工" placement="top" :enterable="false">
          <el-button type="danger" icon="el-icon-delete"
                     @click=""></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <dialog-test ref="dialog"></dialog-test>

  </div>
</template>

<script>
    import DialogTest from "./DialogTest";

    export default {
      components: {DialogTest},
      name: "component-text",


      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },

      methods: {
        chilck() {
          this.$refs.dialog.chilck()
        }
      }
    }


</script>

<style scoped>

</style>
