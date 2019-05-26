import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Setting from '@/components/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
