<script setup>

import { inject, ref} from "vue";
import ErrorDescription from "@/components/ErrorDescription.vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRouter} from "vue-router";

const form = ref({
  data:{
    email:'',
    password:'',
  },
  errors:{

  },
  isProcess:false
})
const updateToken = inject('updateToken')
const router = useRouter()
const updateID = inject('updateUserId')

const SendForm = async()=>{
  if(form.value.isProcess){return;}
  form.value.isProcess = true
  form.value.errors = []
  const responce = await apiFetch("POST","/authorization",form.value.data)
  if(responce.error){
    form.value.errors = responce.error.errors
  }
  if(responce.code===401){
    form.value.errors = {
      email:[responce.message],
      password:[responce.message],
    }
  }
  if(responce.token){
    updateToken(responce.token)
    updateID(responce.data.user.id)

    await router.replace('/')
  }
  form.value.isProcess = false

}

</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в свою учетную запись</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="SendForm()" novalidate action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input id="email" name="email" :class="{'has-error':form.errors.email}" type="email" v-model="form.data.email"  class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorDescription :error="form.errors.email" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" :class="{'has-error':form.errors.password}" type="password" v-model="form.data.password" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorDescription :error="form.errors.password" />

        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Авторизоваться</button>
        </div>
      </form>

    </div>
  </div>
</template>
