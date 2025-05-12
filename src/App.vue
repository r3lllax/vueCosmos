<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
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