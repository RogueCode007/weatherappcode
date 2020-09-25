import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import ErrorPage from "../views/errorPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error',
    name: 'Error',
    component: ErrorPage
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
