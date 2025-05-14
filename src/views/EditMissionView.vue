<script setup>

import {onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRoute, useRouter} from "vue-router";
import MissionForm from "@/components/MissionForm.vue";

defineProps({
  to:Object
})


const router = useRouter()
const route = useRoute()
const id = route.params.id
const form = ref({
  data:null,
  errors:{},
})

onMounted(async function (){
  const responce = await apiFetch("GET",`/lunar-missions/${id}`)
  form.value.data = responce.mission
  console.log(form.value.data)
})


const SendForm = async ()=>{
  form.value.errors = []
  const responce = await apiFetch("POST",`/lunar-missions/${id}`, {
    _method:"patch",
    mission:form.value.data
  })
  if(responce.code==403 || responce.code==404){
    router.replace('/missions')
  }
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
  <form @submit.prevent="SendForm()" class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" v-if="form.data">
    <MissionForm :form="form" />
    <RouterLink to="/missions" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</RouterLink>
  </form>
</template>
