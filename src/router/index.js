import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Departs from '../components/depart/depart.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[{path:'/welcome',component:Welcome},{path:'/users',component:Users},
        {path:'/departs',component:Departs}]
    }
  ]
})
