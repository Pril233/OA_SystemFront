import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Departs from '../components/depart/depart.vue'


import postList from '../components/post/postList.vue'
import post from '../components/post/post.vue'

import password from '../components/personal/password.vue'
import userInfo from '../components/personal/userInfo.vue'
import todoList from '../components/personal/todoList.vue'

import fileUp from '../components/activity/fileUp.vue'
import fileDown from '../components/activity/fileDown.vue'
import addActivity from '../components/activity/addActivity.vue'
import ViewAct from '../components/activity/viewActivity/ViewActivity.vue'
import ViewActCommon from '../components/activity/viewActivity/ViewActivityCommon.vue'
import ViewActVote from '../components/activity/viewActivity/ViewActivityVote.vue'
import vote from '../components/activity/vote.vue'

import anno from '../components/anno/announcement.vue'
import annoView from '../components/anno/ViewAnnouncement.vue'





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
        {path:'/posts',component:post},
        {path:'/password',component:password},
        {path:'/userInfo',component:userInfo},
         {path:'/fileUp',component:fileUp},
         {path:'/fileDown',component:fileDown},
         {path:'/anno',component:anno},
         {path:'/annos',component:annoView},
         { path: '/todoList', component: todoList },
         { path: '/addAct', component: addActivity },
         {path:'/viewAct',component: ViewAct,
          children: [
            { path: '/ViewActivityCommon', component: ViewActCommon },
            { path: '/ViewActivityVote', component: ViewActVote }
          ]
        },
        { path: '/vote', component: vote}
         

      ]
    },

    {path:'/postList',component:postList},


    // {path:'/childrenText',component:childrenText},
    
     {path:'/password',component:password},


    
  ]
})
