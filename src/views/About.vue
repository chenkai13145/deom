<template>
  <div class="about">
     <FfCtiy @parentFn="getVal" v-model="from.ctp" ref="city"></FfCtiy>
        5555555
     <FfCtiy @parentFn="getVal2" v-model="from.ctp2" ref="city"></FfCtiy>

     <el-button  @click="btn">提交</el-button>
  </div>
</template>
<script>
import FfCtiy from './Home'
export default {
  data(){
    return{
     from:{
       ctp:'',
       ctp2:''
     }
    }
  },
  mounted(){
    // console.log(this.$refs.city)
  },
  components:{
    FfCtiy
  },
  methods:{
    btn(){
      console.log(this.from)
    },
    getVal(val){
     this.from.ctp=val
     console.log(val)
    },
    getVal2(val){
      this.from.ctp2=val
     console.log(val)
    }
  },
  computed:{
    
  }
}
</script>

