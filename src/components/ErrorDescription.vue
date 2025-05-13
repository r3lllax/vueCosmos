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
          if(index>=0){
            elem = elem.slice(index,elem.length)
            elem = elem.replace("f","F")
          }
          return elem
      })
    }
    return error
  }

</script>

<template>
  <div class="invalid-description" v-if="error">
    {{ParseError(error).join(', ')}}
  </div>
</template>
