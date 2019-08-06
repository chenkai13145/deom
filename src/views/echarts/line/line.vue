<template>
    <div>
     <el-card style="height:500px;" title="折线图案列1">
         <LineEcharts :brokenlineData="datasTemp" :successData="successData"/>
     </el-card>
     <el-card style="height:500px;" title="折线图案列2">
         <LineEchartsTwo :brokenlineData="datasTemp2" :successData="successData2"/>
     </el-card>
    </div>    
</template>
<script>
import LineEcharts from '../line/component/lineChart-templete'
import LineEchartsTwo from '../line/component/lineChart-templet2'
export default {
    data(){
        return{
          successData:false,
          successData2:false,
          //第一个模板
          datasTemp:{
              title: "库存量(辆)",
              showicon: true, //i图标是否显示
              showselect:true, //第二个下拉框
              explain: "仓库中在库的商品车数量",
              thiscolor: ["yellow", "red", "green", "#98199171", "#8796fc", "orange"], //折线图颜色
              brushchoose: ["按日", "按周", "按月"], //筛选值
              outrates: [
                //下拉框数据
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
               twooutrates: [
                   //第二个下拉框数据
                   {
                     value: "GNL",
                     label: "商贸日邮"
                   },
                   {
                     value: "FNL",
                     label: "富田日捆"
                   },
                   {
                     value: "GRTL",
                     label: "商铁物流"
                   },
                   {
                     value: "GTT",
                     label: "广丰物流"
                   },
                   {
                     value: "GBL",
                      label: "商贸物流"
                    },
                    {
                      value: "HSL",
                      label: "顺捷物流"
                    }
                   ],
              thisnum: " ",
              thisxAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
              datavalue: [
                {
                  name: "富田日捆",
                  smooth: true,
                  
                  type: "line",
                  data: [300, 121, 201, 154, 190, 200, 440]
                },
                {
                  name: "富田日",
                  smooth: true,
                  
                  type: "line",
                  data: [150, 232, 201, 154, 190, 330, 410]
                }
              ]
          },
          //第二个模板
           datasTemp2:{
              title: "库存量(辆)",
              showicon: true, //i图标是否显示
              explain: "仓库中在库的商品车数量",
              thiscolor: ["yellow", "red", "green", "#98199171", "#8796fc", "orange","#656845","#589874","blue"], //折线图颜色
              brushchoose: ["按日", "按周", "按月"], //筛选值
              outrates: [
                //下拉框数据
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
              thisnum: " ",
              thisxAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
              data: [
                {
                  name: "富田日捆",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 201, 154, 190, 200, 440]
                },
                 {
                  name: "陈凯",
                  smooth: true,
                  
                  type: "陈旭",
                  value: [30, 121, 201, 154, 190, 200, 440]
                },
                 {
                  name: "陈云超",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 20, 154, 190, 200, 440]
                },
                 {
                  name: "黄仁清",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 201, 15, 190, 200, 440]
                },
                 {
                  name: "肖启源",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 201, 154, 10, 200, 440]
                },
                 {
                  name: "ndd",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 1, 154, 190, 200, 440]
                },
                 {
                  name: "ly",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 11, 201, 154, 190, 200, 440]
                },
                 {
                  name: "李元郑",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 201, 154, 190, 200, 40]
                },
                 {
                  name: "网红",
                  smooth: true,
                  
                  type: "line",
                  value: [300, 121, 201, 154, 190, 0, 440]
                },
                {
                  name: "他妈",
                  smooth: true,
                  
                  type: "line",
                  value: [150, 232, 201, 154, 190, 30, 410]
                }
              ]
          }
        }
    },
    components:{
        LineEcharts,
        LineEchartsTwo
    }
}
</script>
<style lang="scss" scoped>
   
</style>
