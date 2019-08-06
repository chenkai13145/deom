<template>
     <div class="buschildre">
         
     </div>
</template>
<script>
import bus from '../../../common/bus'
export default {
    data(){
        return{
          
        }
    },
    created(){
        bus.$on('buss',(data)=>{
             alert(data)
        })
    },
    methods:{
      
    }
}
</script>
<style lang="sass" scoped>

</style>
