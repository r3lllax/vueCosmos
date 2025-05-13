<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import {provide, ref} from "vue";

const token = ref(localStorage.getItem('user_token'))
const updateToken = (newToken)=>{
  if(!newToken){
    localStorage.removeItem('user_token')
  }else{
    localStorage.setItem('user_token',newToken)
  }
  token.value = newToken
  updateUserId(null)
}
const id = ref(localStorage.getItem('user_id'))
const updateUserId = (newId)=>{
  if(!newId){
    localStorage.removeItem('user_id')
  }else{
    localStorage.setItem('user_id',newId)
  }
  id.value = newId

}
provide('user_id',id)
provide('token',token)
provide('updateToken',updateToken)
provide('updateUserId',updateUserId)
</script>

<template>
  <Header />
  <RouterView />
</template>

<style>
  .invalid-description{
    color: #ff4f4f;
  }
  .has-error{
    border: 1px solid #ff4f4f !important;
  }
</style>