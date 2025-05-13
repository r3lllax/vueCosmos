<script setup>
import {inject, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";

  const missions = ref({
  })

  onMounted(async ()=>{
    const result = await apiFetch("get","/lunar-missions")
    if(result){
      result.is_open = false
      missions.value = result
    }
  })

  const open = mission =>{
    console.log(user_id)
    console.log(mission.mission.author.id)
    console.log(user_id==mission.mission.author.id)
    missions.value.forEach(mission =>{
        mission.is_open = false;
    })

    mission.is_open = true
  }
  const remove = async mission =>{

    await apiFetch("DELETE",`/lunar-missions/${mission.mission.id}`)
    missions.value.splice(missions.value.indexOf(mission),1)
  }
  let user_id = inject('user_id')

</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" v-if="missions">
    <RouterLink to="/add-mission" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
      Добавить миссию
    </RouterLink>

    <div class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded" v-for="mission in missions">
      <div class="flex justify-between w-full items-center p-6" >
        <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">{{ mission.mission.name}}</h2>
        <div class="flex gap-4">
          <button @click.prevent="open(mission)">
            <i class="fa  text-xl" :class="{'fa-angle-down':mission.is_open,'fa-angle-left':!mission.is_open}"  aria-hidden="true"></i>
          </button>
          <template v-if="user_id==mission.mission.author.id">
            <button>
              <i class="fa fa-edit text-xl" aria-hidden="true"></i>
            </button>
            <button @click.prevent="remove(mission)">
              <i class="fa fa-trash text-xl text-red-500" aria-hidden="true"></i>
            </button>
          </template>
        </div>
      </div>
      <div class="px-6" v-if="mission.is_open">
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ mission.mission.launch_details.launch_date}}</p>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ mission.mission.landing_details.landing_date}}</p>
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место запуска</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.launch_details.launch_site.name}}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.launch_details.launch_site.location.latitude}}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.launch_details.launch_site.location.longitude}}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.landing_details.landing_site.name}}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.landing_details.landing_site.coordinates.latitude}}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.mission.landing_details.landing_site.coordinates.longitude}}</dd>
            </div>
          </dl>
        </div>
        <h2 class="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
        <div class="px-4 sm:px-0">
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Лунный модуль: {{ mission.mission.spacecraft.lunar_module}}</p>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Управляющий модуль: {{ mission.mission.spacecraft.command_module}}</p>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <ul>
            <li class="flex justify-between gap-x-6 py-5" v-for="crew in mission.mission.spacecraft.crew">
              <div class="flex gap-x-4">
                <p class="text-sm font-semibold text-gray-900">{{crew.name}}</p>
                <p class="mt-1 text-xs text-gray-500">{{crew.role}}</p>
              </div>

            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
