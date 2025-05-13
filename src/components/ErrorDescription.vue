<script setup>
  import {onMounted} from "vue";

  defineProps({
    error:Array,
  })

  const ParseError = (error)=>{
    let result
    if(error!==undefined){
        error = error.map(function (elem){
          let index = elem.indexOf('field')
          elem = elem.slice(index,elem.length)
          elem = elem.replace("f","F")
          return elem
      })
    }
    console.log(error)
    return error
  }

</script>

<template>
  <div class="invalid-description" v-if="error">
    {{ParseError(error).join(' ')}}
  </div>
</template>
