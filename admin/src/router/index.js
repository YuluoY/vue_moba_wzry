import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdvertEdit from '../views/AdvertEdit.vue'
import AdvertList from '../views/AdvertList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component :Login, meta:{ isPublic: true }},

  {
  path: '/',
  name: 'Main',
  component: Main,
  children: [
        {path: '/categories/create', component: CategoryEdit}, 
        {path: '/categories/edit/:id', component: CategoryEdit, props: true},// 使占位的id能够直接被props配置项获取
        {path: '/categories/list', component: CategoryList},

        {path: '/items/create', component: ItemEdit}, 
        {path: '/items/edit/:id', component: ItemEdit, props: true}, 
        {path: '/items/list', component: ItemList},

        {path: '/Heroes/create', component: HeroEdit}, 
        {path: '/Heroes/edit/:id', component: HeroEdit, props: true},
        {path: '/Heroes/list', component: HeroList},

        {path: '/Articles/create', component: ArticleEdit}, 
        {path: '/Articles/edit/:id', component: ArticleEdit, props: true},
        {path: '/Articles/list', component: ArticleList},

        {path: '/Adverts/create', component: AdvertEdit}, 
        {path: '/Adverts/edit/:id', component: AdvertEdit, props: true},
        {path: '/Adverts/list', component: AdvertList},

        {path: '/admin_users/create', component: AdminUserEdit}, 
        {path: '/admin_users/edit/:id', component: AdminUserEdit, props: true},
        {path: '/admin_users/list', component: AdminUserList},
      ]
},  ]




const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if(!to.meta.isPublic && !localStorage.token){
      Vue.prototype.$message.error('小落：您不是管理员，暂无权限查看😭！');
      next('/login')
    }
    next()
});

export default router