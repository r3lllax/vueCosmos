<script setup>
import {onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import router from "@/router/index.js";
const flights = ref([])

onMounted(async function (){
  flights.value = await apiFetch("get","/space-flights")
})

const modalOpen = ref(false)
const modalMessage = ref('')

const BookFlight = async (fl_number)=>{
  const responce = await apiFetch("post","/book-flight",{flight_number:fl_number})
  if (responce.data){
    modalOpen.value = true
    modalMessage.value = responce.data.message
  }
  if (responce.code == 403){
    modalOpen.value = true
    modalMessage.value = "Превышен лимит на запись рейса"

  }
  if (responce.code == 404){
    modalOpen.value = true
    modalMessage.value = "Рейс не найден"
  }
}
const closeBtn = () =>{
  modalOpen.value = false
  location.reload()
}
</script>

<template>

  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <div class="p-6 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <RouterLink to="/add-flight" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
        Добавить рейс
      </RouterLink>
      <div class="flex gap-2 justify-between p-4" v-for="flight in flights">
          <div class="shadow-md rounded w-full p-4">
            <h2 class="font-bold">{{flight.flight_number}}</h2>
            <p>{{flight.destination}}</p>
            <p>{{flight.launch_date}}</p>
            <p>Доступно мест: {{flight.seats_available}}</p>
            <button v-if="flight.seats_available" @click.prevent="BookFlight(flight.flight_number)" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mt-2">Записаться</button>
          </div>
      </div>
    </div>
    <RouterLink class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" to="/">На главную страницу</RouterLink>
  </div>
  <div class="modal" v-if="modalOpen">
    <div class="modal-wrapper">
      <h2>Уведомление</h2>
      <div>{{modalMessage}}</div>
      <button @click.prevent="closeBtn()" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mt-2">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
 .modal{
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0,0,0,0.5);
 }
 .modal-wrapper{
   background-color: white;
   width: 450px;
   padding: 15px;
   border-radius: 15px;
   display: flex;
   flex-direction: column;
   gap: 20px;
 }
 .modal-wrapper h2{
   padding-bottom: 15px;
   border-bottom: 1px solid #eeeeee;
 }

</style>
