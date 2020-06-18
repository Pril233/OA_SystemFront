<template>
  <div id="app">
      <h1>计划表</h1>
      <el-card>
      <div>
        待办事项:<input type="text" v-model="newPerson.name"/>
        <button  @click="createPerson">新增</button>
      </div>
    <div id="n" style="display:block; ">
      <table>
        <thead>
        <tr>
          <th width="25%">ID</th>
          <th width="30%">待办事项</th>
          <th width="15%">操作</th>
        </tr>
        </thead>
        <tbody id="t">
        <tr v-for="(person,index) in people" :key="index">
          <td :class="'content'">{{ index+1 }}</td>
          <td :class="'content'">{{ person.name }}</td>
          <td :class="'content'"><button @click="deletePerson(person.id)">完成</button></td>
        </tr>
        </tbody>
      </table>
    </div>
      </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'todolist',
  created(){
      var a = document.getElementById('n')
      this.getPlanList()
      // this.controlA()
  },
  data () {
    return {
      newPerson: {
        name: '22.30吃夜宵'
      },

      people: [{
        name: '22.30吃夜宵'
      },
      {
        name: '22.30吃夜宵'
      },
      {
        name: '22.30吃夜宵'
      }]
    }
  },
  methods: {
    async createPerson() {
      if (this.newPerson.name.length === 0) {
        this.$message.error('错了哦，你还没有输入文字~')
        return false
      }
        const{data:res} = await this.$http.post('plan/'+sessionStorage.getItem('id'),this.newPerson)
         if(res.meta.status != 200) {
         return this.$message.error('添加计划失败')
       }
        this.getPlanList()
      
      // console.log(this.newPerson.name.length) content长度
      // 添加完newPerson对象后，重置newPerson对象
      // this.newPerson = {name: ''}
      // var a = document.getElementById('n')
      // a.style.display = 'block'
    },

    async deletePerson(id) {
      // 删一个数组元素
      // this.people.splice(index, 1)
      // console.log('删除的ID：' + id)
      // var tdnode = document.getElementById('t').childNodes
      const{data:res} = await this.$http.delete('plan/'+id)
      if(res.meta.status != 200) {
         return this.$message.error('删除计划失败')
       }
        this.people = res.data
        this.getPlanList()

      // if (tdnode.length === 1) {
      //   var a = document.getElementById('n')
      //   a.style.display = 'none'
      // }

      // console.log("tr长度："+tdnode.length) tbody中tr的长度
    },
    async getPlanList(){
      const{data:res} = await this.$http.get('plan/'+sessionStorage.getItem('id'))
        if(res.meta.status != 200) {
         return this.$message.error('获取计划列表失败')
       }
        this.people = res.data
        // this.controlA()


    },
    controlA(){
       var tdnode = document.getElementById('t').childNodes
       if (tdnode.length === 0) {
        var a = document.getElementById('n')
        a.style.display = 'none'
      }
    }
  }
}
</script>
<style scoped>
h1{
  color: white;
  background-color: #409EFF;
   border-radius:5px;
}
  table,
  td,
  th {
    border-collapse: collapse;
    border-spacing: 0
  }
  #n{
    display: none;
  }
  table {
    margin: 0 auto;
    width: 50%;
  }
  td,
  th {
    border: 1px solid #bcbcbc;
    padding: 5px 10px
  }
  th {
    background: #409EFF;
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
  }
  tr:nth-of-type(odd) {
    background: #fff
  }
  tr:nth-of-type(even) {
    background: #eee
  }
  input {
    outline: none
  }
  input[type=text] {
    margin: 6px;
    border: 1px solid #ccc;
    padding: .5rem .3rem;
  }
  input[type=text]:focus {
    border-color: #42b983;
  }
  button {
    outline: none;
    padding: 5px 8px;
    color: #fff;
    border: 1px solid #BCBCBC;
    border-radius: 3px;
    background-color: #409EFF;
     border-radius:5px;
    cursor: pointer;
  }
  button:hover{
    opacity: 0.8;
  }
</style>