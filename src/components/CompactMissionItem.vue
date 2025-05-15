<script setup>

import {inject, ref} from "vue";

const props = defineProps({
  mission:Object,

})
defineEmits(['open,remove'])
const user_id = inject('user_id')
const mission = ref({
  mission:null
})
mission.value.mission =props.mission
</script>

<template>
  <div class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
    <div class="flex justify-between w-full items-center p-6" >
      <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">{{ mission.mission.name }}</h2>
    </div>
    <div class="px-6">
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ mission.mission.launch_date}}</p>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ mission.mission.landing_date}}</p>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.landing_site}}</dd>
          </div>
        </dl>
      </div>
      <h2 class="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">

        <ul>
          <li class="flex justify-between gap-x-6 py-5" v-for="crew in mission.mission.crew">
            <div class="flex gap-x-4">
              <p class="text-sm font-semibold text-gray-900">{{crew.name}}</p>
              <p class="mt-1 text-xs text-gray-500">{{crew.role}}</p>
            </div>

          </li>

        </ul>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>