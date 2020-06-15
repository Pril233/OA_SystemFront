<template>
<!--头部区域-->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/OA6.jpg" alt="">
        <span>办公自动化系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
  <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath">

          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!--一级菜单模板区域-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{item.name}}</span>
            </template>

          <!--二级菜单-->
           <el-menu-item :index="'/'+subItem.path"
                         v-for="subItem in item.children"
                         :key="subItem.id"
                         @click = "saveNavState('/'+subItem.path)">
             <template slot="title">
               <!--图标-->
               <i class="el-icon-menu"></i>
               <!--文本-->
               <span>{{subItem.name}}</span>
             </template>
           </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>
      <!--右侧内容-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      data(){
        return{             //不使用return包裹的数据会在项目的全局可见，会造成变量污染；
          //左侧菜单        // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
          menuList:[], //默认为空
          iconsObj:{
            1:'el-icon-s-custom',
            2:'el-icon-s-home',
            3:'el-icon-user-solid',
            4:'el-icon-message-solid',
            5: 'el-icon-s-flag'

          },
          //是否被折叠
          isCollapse:false,
          //是否被激活
          activePath:'',
        

        }
      },

      created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
      },
        methods:{
          logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
          },
          //获取所有的菜单
        async  getMenuList(){
            const{data:res} = await this.$http.get('menusById/'+sessionStorage.getItem('id'))      //解构响应中的data并且重命名为res
            if(res.meta.status !==200) return this.$message.error(res.meta.msg)
            this.menuList = res.data
            console.log(res)
          },
          //点击按钮，切换菜单折叠与展开
          toggleCollapse(){
              this.isCollapse = !this.isCollapse
          },
          //保存连接的激活状态
          saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath = activePath
          }
        }
    }
</script>

<style lang="less" scoped>
  .home-container{
    height:100%;
  }

  .el-header{
    background-color:#373d41;
    display:flex;
    justify-content:space-between;;//流式布局中的·左右贴边对齐
    padding-left:0px;
    align-items:center;  //居中对齐弹性盒的各项 <div> 元素
    color:#fff; //这个属性设置了一个元素的前景色（在 HTML 表现中，就是元素文本的颜色）；
                //光栅图像不受 color 影响。
                //这个颜色还会应用到元素的所有边框，除非被 border-color 或另外某个边框颜色属性覆盖。
    font-size:20px;
    >div {                         //'>'子元素选择器
      display:flex;
      align-items:center;
      span{
        margin-left:15px;
      }
    }
  }

  .el-aside{
    background-color:#333744;
    .el-menu {
      border-right:none
    }
  }

  .el-main{
    background-color:#eaedf1;
  }

  .toggle-button{
      background-color: #4a5064;
      font-size:10px;
      line-height:24px;
      color:#fff;
      text-align:center;
      letter-spacing: 0.2px;
      cursor:pointer;
  }


</style>
