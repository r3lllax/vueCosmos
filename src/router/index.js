import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from "@/views/RegistationView.vue";
import RegistationView from "@/views/RegistationView.vue";
import AuthorizationView from "@/views/AuthorizationView.vue";
import MissionsView from "@/views/MissionsView.vue";
import AddMissionView from "@/views/AddMissionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        forAuth:true
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistationView,
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: AuthorizationView,
    },
    {
      path: '/missions',
      name: 'missions',
      meta:{
        forAuth:true
      },
      component: MissionsView,
    },{
      path: '/add-mission',
      name: 'add-mission',
      meta:{
        forAuth:true
      },
      component: AddMissionView,
    },

  ],
})
router.beforeResolve(async to=>{
    if(to.meta.forAuth && !localStorage.getItem('user_token')){
      await router.replace('/authorization')
    }
})
export default router
