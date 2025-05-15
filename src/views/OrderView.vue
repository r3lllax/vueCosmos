<script setup>

import {ref} from "vue";
import ErrorDescription from "@/components/ErrorDescription.vue";
import apiFetch from "@/helpers/apiFetch.js";

const form = ref({
  data:{
    fileimage:null,
    message:''
  },
  errors:{}
})

const imageURL = ref(null)

const sendForm = async ()=>{
  form.value.errors=[]
  imageURL.value = null
  const formData = new FormData()
  for(const key in form.value.data){
    formData.append(key,form.value.data[key])
  }
  const responceJson = await apiFetch("post","/lunar-watermark",formData, )

  const responce = await apiFetch("post","/lunar-watermark",formData, true)

  if(responceJson?.error){
    form.value.errors = responceJson.error.errors
    return
  }

  imageURL.value = URL.createObjectURL(responce)

}
const formStatus = ref({
  status:null,
})

const ChangeFile = event =>{
  form.value.data.fileimage = event.target.files[0]
}
const drop = event =>{
  formStatus.value.status = null
  form.value.data.fileimage = event.dataTransfer.files[0]
}
const dragover = (e) =>{
  e.preventDefault()
  formStatus.value.status = 'over'
}
const dragleave = (e) =>{
  e.preventDefault()
  formStatus.value.status = null

}

</script>

<template>

  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <form @submit.prevent="sendForm()" class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded wrapper flex gap-6">
      <h1>Заказ на луне</h1>
      <div>
        <label for="message" class="block text-sm font-medium leading-6 text-gray-900">Подпись</label>
        <div class="mt-2">
          <input :class="{'has-error':form.errors.message}" v-model="form.data.message" id="message" name="text" type="text" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          <ErrorDescription :error="form.errors.message"/>
        </div>
      </div>
      <label @drop.prevent="drop" :class="{'over':formStatus.status==='over','success':form.data.fileimage}" @dragleave="dragleave" @dragover="dragover" class="drop-zone">
        <input type="file" @change="ChangeFile($event)">
        <template v-if="form.data.fileimage">
           {{form.data.fileimage.name}}
        </template>
        <template v-else>
          Переместите файл в данную область
        </template>

      </label>
      <ErrorDescription :error="form.errors.fileimage"/>

      <div>
        <button class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600 w-full">Сделать подпись</button>
      </div>
      <div class="mt--10">
        <RouterLink to="/" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600">На главную</RouterLink>
      </div>
    </form>
    <div v-if="imageURL">
      <img :src="imageURL">
    </div>
  </div>

</template>

<style scoped>

h1{
  font-weight: bold;
  font-size: 24px;
}
.wrapper{
  padding: 20px;
  flex-direction: column;
}
.drop-zone{
  padding: 20px;
  border: 5px dashed #eeeeee;
}
.drop-zone input{
  display: none;
}
.success{
   border: 5px dashed #06ff00;
 }
.over{
  border: 5px dashed black;
}

</style>
