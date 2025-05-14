<script setup>

import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRouter} from "vue-router";
import MissionForm from "@/components/MissionForm.vue";


const form = ref({
  data:{
      name: "",
      launch_details: {
        launch_date: "",
        launch_site: {
          name: "",
          location: {
            latitude: '',
            longitude: ''
          }
        }
      },
      landing_details: {
        landing_date: "",
        landing_site: {
          name: "",
          coordinates: {
            latitude: '',
            longitude: ''
          }
        }
      },
      spacecraft: {
        command_module: "",
        lunar_module: "",
        crew: [
          {
            name: "",
            role: ""
          }
        ]
      }

  },
  errors:{},
  isProcess:false
})

const router = useRouter()

const SendForm = async ()=>{
  if(form.value.isProcess){return;}
  form.value.isProcess = true
  form.value.errors = []
  const responce = await apiFetch("POST","/lunar-missions", {
    mission:form.value.data
  })
  if(responce.error){
    form.value.errors = responce.error.errors
  }
  if(responce.data){
    router.replace('/missions')
  }

  form.value.isProcess = false
}

</script>

<template>

  <form @submit.prevent="SendForm()" class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <MissionForm :form="form" />
    <RouterLink to="/missions" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</RouterLink>
  </form>
</template>
