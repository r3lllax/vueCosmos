<script setup>
import {inject, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import MissionItem from "@/components/MissionItem.vue";


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
    missions.value.forEach(mission =>{
        mission.is_open = false;
    })

    mission.is_open = true
  }
  const remove = async mission =>{

    await apiFetch("DELETE",`/lunar-missions/${mission.mission.id}`)
    missions.value.splice(missions.value.indexOf(mission),1)
  }

</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" v-if="missions">
    <RouterLink to="/add-mission" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
      Добавить миссию
    </RouterLink>
    <MissionItem v-for="mission in missions" :compact="false" :mission="mission" @open="open" @remove="remove"  />
  </div>
</template>
