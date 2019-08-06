<template>
     <div class="bus">
               <input type='text'  v-model="name" placeholder="请输入你的姓名"/>
     <div @click="btn">{{name}}</div>
     </div>
</template>
<script>
import bus from '../../common/bus'

export default {
    data(){
        return{
           name:'陈凯'
        }
    },
    created(){
        console.log(bus)
    },
    methods:{
        btn(){
           bus.$emit('buss','我出发了方法')
           
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
