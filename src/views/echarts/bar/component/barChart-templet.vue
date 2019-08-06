<template>
  <!-- 柱状图组件 (数据重叠)-->
  <div class="columnar-template">
    <el-row style="padding-left:20px; line-height:40px;" class="height40 linheight40 margintop10">
      <el-col :span="4" v-if="columnarData.showicon">
        <div class="grid-content bg-purple">
          <span class="disinline">{{ columnarData.title }}</span>
          <!-- <el-tooltip
            v-if="columnarData.showicon"
            class="item"
            effect="dark"
            :content="columnarData.explain"
            placement="right"
          >
            <icon-svg name="help" class="tipicon"></icon-svg>
          </el-tooltip> -->
          <!-- <Help v-if="columnarData.showicon" :helpText="columnarData.explain" style="margin-left: 10px;line-height: normal;top:-2px;color:#fff;z-index:10"></Help> -->

        </div>
      </el-col>
      <el-col :span="7" v-else>
        <div class="grid-content bg-purple">
          <span class="disinline">{{ columnarData.title }}</span>
          <!-- <el-tooltip
            v-if="columnarData.showicon"
            class="item"
            effect="dark"
            :content="columnarData.explain"
            placement="right"
          >
            <icon-svg name="help" class="tipicon"></icon-svg>
          </el-tooltip> -->
          <!-- <Help v-if="columnarData.showicon" :helpText="columnarData.explain" style="margin-left: 10px;line-height: normal;top:-2px;color:#fff;z-index:10"></Help> -->

        </div>
      </el-col>
      <!-- <el-col :span="3" v-if="columnarData.showicon">
        <div class="grid- bg-purple-light">
          <el-select v-model="outrate" placeholder="请选择" @change="changeselect">
            <el-option
              v-for="item in columnarData.outrates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col> -->
      <el-col :span="3" v-if="columnarData.showicon">
        <div class="grid- bg-purple-light">
          <el-select v-model="outrate" placeholder="请选择" @change="changeselect">
            <el-option
              v-for="item in columnarData.outrates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="14">
				<el-row style="position: relative;">
					<el-col :span="3" :style="'position: absolute;right:-'+ index*50+'px;'" v-for="(item,index) in columnarData.brushchoose" :key="index++">
						<div class="grid-content bg-purple textcenter" style="width:50px;cursor: pointer;" v-on:click="xuanzhong(index)"  :class="{ischeck:index==current}">{{ item }}</div>
					</el-col>
				</el-row>
      </el-col>
      <!-- <div class="headSelectBox">
        <span
          class
          v-for="(item,index) in columnarData.brushchoose"
          :key="index++"
          v-on:click="xuanzhong(index)"
          :class="{ischeck:index==current}"
        >{{ item }}</span>
      </div> -->
    </el-row>
    <div class="mod-demo-echarts margintop10">
      <div :id="columnarId" class="columnarId"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { setTimeout } from 'timers';
// import Help from '@/components/common/help'
// import {
//   getSelect
// } from "@/utils/api/statistical/warehouse";
export default {
  name: "columnar-template", //标准柱状图
  props: {
    columnarData: {
      //父页面传回的折线图值 接收的数据类型
      type: Object,
      required: true
    },
    successData: {
      type: Boolean
    }
  },
  data() {
    return {
      option: {},
      getSlectsarr:[],//one
      columnar: null, //折线初始值
      current: 1, //选中的名称
      outrate: "org_code", //下拉框选中的值
      columnarId: "columnar" + new Date().getTime(),
      data: this.columnarData.data
    };
  },
  mounted() {
    
    this.initcolumnar();
    
    this.handleSeriesData()
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.columnar) {
      this.columnar.resize();
    }
  },
   created(){
    // this.getSlects()
  },
  components:{
    // Help
  },
  methods: {
    // 初始化柱状图
    initcolumnar() {
      let _self = this;
      _self.option = {
        color: [],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top:'10%',
          left: "6%",
          right: "6%",
          bottom: "12%",
          containLabel: true
        },
        legend: {},
        toolbox: {
          show: true
        },
        dataZoom: [{ //x轴滑动
         type: 'slider',
         show: true,
         bottom:32
         }],
        xAxis: {
          //展示横坐标的数据
          type: "category",
          data: []
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} " + _self.columnarData.thisnum
            }
          }
        ],
        series: []
      };
      this.columnar = echarts.init(document.getElementById(this.columnarId));
      // 等待加载loading
      this.columnar.showLoading({
        text: "loading",
        color: "#6851e1",
        textColor: "#c9c9c9",
        maskColor: "#f6f6f6",
        zlevel: 0
      });
      window.addEventListener("resize", () => {
        this.columnar.resize();
      });
    },
     //下拉
    getSlects(){
      getSelect().then(res=>{
        if(res.data.msg==='success'){
           let arr=res.data.data
           this.getSlectsarr=arr
           console.log(this.getSlectsarr)
        }
      })
    },
    changeselect: function(event, item) {
      let obj = {
        current: "",
        type: event,
        org_type: this.twooutrate || ""
      };
      this.$emit("changeselect", obj);
    },
    handleSeriesData() {
      (this.option.color = this.columnarData.thiscolor),
        (this.option.xAxis.data = this.columnarData.thisxAxis);
      this.option.series = this.columnarData.data;
      this.option.legend = {
        //展示折线图的数据值(条数)
        data: (() => {
          let legends = [];
          for (let i = 0; i < this.columnarData.data.length; i++) {
            legends.push(this.columnarData.data[i].name);
          }
          return legends;
        })(),
        bottom: 0,
        left: 30,
        icon: "rect",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 40,
         type:'scroll',
          icon: 'path://M240.11292005 230.74396634H775.80207574v535.69023281H240.11292005V230.74396634z',
          textStyle: {
            fontSize: 14,
            padding: [2, 0, 0, 0]
          },
      };
      this.columnar.clear();
      this.columnar.setOption(this.option);
      setTimeout(()=>{
          this.columnar.hideLoading();
      },2000)
    //   this.columnar.hideLoading();
    },
    xuanzhong: function(value) {
        alert(value)
    //   this.current = value;
    //   this.$emit("clicktype", this.current);
    //   let obj = {
    //     current: value,
    //     type: this.outrate || "",
    //     org_type: this.twooutrate || ""
    //   };
    //   this.$emit("clicktypes", obj);
    }
  },
  watch: {
    columnarData: {
      handler() {
        if (this.successData) {
          this.handleSeriesData();
        } else {
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.el-date-editor .el-range-separator {
  width: 10%;
}
.ischeck {
  color: red;
  border-bottom: 4px solid red;
  width: 50px;
}
.mod-demo-echarts {
  .columnarId {
    min-height: 400px;
  }
}
</style>
