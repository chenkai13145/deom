<template> 
    <div>
        <el-card>
            <barChart :columnarData="longoflibrary" :successData="successData"/>
        </el-card>
    </div>    
</template>
<script>
import barChart from './component/barChart-templet'
export default {
    data(){
        return{
            successData:false,
             //长库龄商品车数量
    longoflibrary: {
        //公铁水运量占比
        title: "长库龄商品车数量(辆)",
        showicon: true, //i图标是否显示
        explain: "超过规定(业务系统规定)在库时间的商品车数量",
        brushchoose: ["按日", "按周", "按月"], //筛选值
        outrates: [
          {
            value: "factory_city_code",
            label: "客户(城市)"
          },
          {
            value: "factory_code",
            label: "客户"
          },
          {
            value: "car_brand_code",
            label: "商品车品牌"
          },
          {
            value: "org_code",
            label: "投资企业"
          }
        ],
        thiscolor: ["yellow", "red", "green", "#981991", "#8796fc", "orange"],
        thisnum: "辆",//y轴单位
        thisxAxis: [
          "2019年04月25日",
          "2019年04月25日",
          "2019年04月26日",
          "2019年04月27日",
          "2019年04月28日"
        ],
        data: [
          {
            barWidth: 20,
            data: [0, 0, 0, 0, 0, 0, 0],
            name: "陆",
            smooth: false,
            stack: '搜索引擎',//一条柱子显示
            type: "bar"
          },
           {
            barWidth: 20,
            data: [0, 23, 0, 32, 0, 0, 0],
            name: "运",
            smooth: false,
            stack: '搜索引擎',
            type: "bar"
          },
            {
            barWidth: 20,
            data: [0, 23, 0, 32, 0, 0, 0],
            name: "运1",
            smooth: false,
            stack: '搜索引擎',
            type: "bar"
          },
            {
            barWidth: 20,
            data: [0, 23, 0, 32, 0, 0, 0],
            name: "运2",
            smooth: false,
            stack: '搜索引擎',
            type: "bar"
          },
            {
            barWidth: 20,
            data: [0, 23, 0, 32, 0, 0, 0],
            name: "运3",
            smooth: false,
            stack: '搜索引擎',
            type: "bar"
          },
          {
            barWidth: 20,
            data: [0, 23, 0, 32, 111, 0, 0],
            name: "运为",
            smooth: false,
            stack: '搜索引擎',
            type: "bar"
          }
        ]
        },
        }
    },
    components:{
        barChart
    }
}
</script>
<style lang="scss" scoped>

</style>
