<template>
  <div class="linechart-template">
    <el-card>
      <PieCharts :brokenpieData="datasTemp"/>
    </el-card>
     <el-card>
      <PieCharts :brokenpieData="datasTemp2"/>
    </el-card>
  </div>
</template>
<script>
import PieCharts from "./component/pie-templet";
export default {
  data() {
    return {
      //第一个模板
      datasTemp: {
        title: "库存量(辆)",
        showicon: true, //i图标是否显示
        showselect: true, //第二个下拉框
        radius:'55%',//实心圆
        explain: "仓库中在库的商品车数量",
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
        datavalue: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ]
      },
       datasTemp2: {
        title: "库存量(辆)",
        showicon: true, //i图标是否显示
        showselect: true, //第二个下拉框
        radius:['55%','65%'],//kong心圆
        explain: "仓库中在库的商品车数量",
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
        datavalue: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ]
      }
    };
  },
  components: {
    PieCharts
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
