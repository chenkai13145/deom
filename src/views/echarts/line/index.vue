<template>
   <div>
      <div class="echarst">
       <router-link to="/echarts/line">折线图</router-link> |
       <router-link to="/echarts/bar">柱状图</router-link> |
       <router-link to="/echarts/pie">饼图</router-link>
       </div>
      <router-view/>    
   </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

</style>
