import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from "@/views/RegistationView.vue";
import RegistationView from "@/views/RegistationView.vue";
import SearchView from "@/views/SearchView.vue";
import AuthorizationView from "@/views/AuthorizationView.vue";
import MissionsView from "@/views/MissionsView.vue";
import AddMissionView from "@/views/AddMissionView.vue";
import EditMissionView from "@/views/EditMissionView.vue";
import FlightsView from "@/views/FlightsView.vue";
import AddFlightView from "@/views/AddFlightView.vue";
import OrderView from "@/views/OrderView.vue";

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
    },
    {
      path: '/add-mission',
      name: 'add-mission',
      meta:{
        forAuth:true
      },
      component: AddMissionView,
    },
    {
      path: '/edit-mission/:id',
      name: 'edit-mission',
      meta:{
        forAuth:true
      },
      component: EditMissionView,
    },
    {
      path: '/search',
      name: 'search',
      meta:{
        forAuth:true
      },
      component: SearchView,
    },
    {
      path: '/flights',
      name: 'flights',
      meta:{
        forAuth:true
      },
      component: FlightsView,
    },
    {
      path: '/add-flight',
      name: 'add-flight',
      meta:{
        forAuth:true
      },
      component: AddFlightView,
    },
    {
      path: '/order',
      name: 'order',
      meta:{
        forAuth:true
      },
      component: OrderView,
    },

  ],
})
router.beforeResolve(async to=>{
    if(to.meta.forAuth && !localStorage.getItem('user_token')){
      await router.replace('/authorization')
    }
})
export default router
