import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Departs from '../components/depart/depart.vue'

import childrenText from '../components/test/componentText.vue'
import cardTest from '../components/test/cardTest.vue'

import postList from '../components/post/postList.vue'
import post from '../components/post/post.vue'
import postCard from '../components/post/postCard.vue'
import addPostDialog from '../components/post/addPostDialog.vue'
import editPostDialog from '../components/post/editPostDialog.vue'


Vue.use(Router)

export default new Router({
  routes: [

    { path: '/', redirect: '/login' },


    /*{ path: '/', redirect: '/cardTest' },*/

    { path: '/login', component: login },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[{path:'/welcome',component:Welcome},{path:'/users',component:Users},
        {path:'/departs',component:Departs},
        {path:'/posts',component:post}]
    },

    {path:'/postList',component:postList},
    {path:'/post',component:post},
    {path:'/postCard',component:postCard},
    {path:'/addPostDialog',component:addPostDialog},
    {path:'/editPostDialog',component:editPostDialog}


    /*{path:'/childrenText',component:childrenText},
    {path:'/cardTest',component:cardTest}*/
  ]
})
