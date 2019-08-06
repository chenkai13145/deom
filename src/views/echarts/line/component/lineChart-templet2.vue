<template>
  <!-- 折线图组件 -->
  <div class="linechart-template">
    <el-row style="padding-left:20px;" class="height40 linheight40 margintop10">
      <!-- <el-col :span="4" v-if="brokenlineData.showselect">
        <div class="grid-content bg-purple">
          <span class="disinline">{{ brokenlineData.title }}</span>
          <el-tooltip
            v-if="brokenlineData.showicon"
            class="item"
            effect="dark"
            :content="brokenlineData.titles||brokenlineData.title"
            placement="right"
          >
            <!-- <icon-svg name="help" class="tipicon"></icon-svg> -->
          <!-- </el-tooltip>
        </div> -->
      <!-- </el-col>
      <el-col :span="7" v-else>
        <div class="grid-content bg-purple">
          <span class="disinline">{{ brokenlineData.title }}</span>
          <el-tooltip
            v-if="brokenlineData.showicon"
            class="item"
            effect="dark"
            :content="brokenlineData.titles||brokenlineData.title"
            placement="right"
          >
            <icon-svg name="help" class="tipicon"></icon-svg>
          </el-tooltip>
        </div>
      </el-col> -->
      <el-col :span="3" style="margin-right:10px">
        <div class="grid- bg-purple-light">
          <el-select v-model="outrate" placeholder="请选择" @change="changeSelect">
            <el-option
              v-for="item in brokenlineData.outrates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      
      <!-- <el-col :span="brokenlineData.showselect?11:11">
        <el-row style="position: relative; right: 36px;">
          <el-col
            :span="3"
            :style="'position: absolute;right:-'+ index*50+'px;'"
            v-for="(item,index) in brokenlineData.brushchoose"
            :key="index"
          >
            <div
              style="width:50px; cursor: pointer;justify-content: center;"
              class="grid-content bg-purple textcenter"
              v-on:click="checkedClick(index)"
              :class="{ischeck:index==current}"
            >{{ item }}</div>
          </el-col>
        </el-row>
      </el-col> -->
       <div class="headSelectBox">
            <span class=""  v-for="(item,index) in brokenlineData.brushchoose" :key="index" v-on:click="checkedClick(index)" :class="{ischeck:index==current}">{{ item }}</span>
        </div>
    </el-row>
    <div class="mod-demo-echarts margintop10">
      <el-card style="background:#fff;">
        <!-- :siler="silder" -->
        <div v-show="!lineOff" :id="brokenlineId" class="brokenlineId"></div>
			  <!-- <Empty v-show="lineOff"></Empty> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import Empty from "@/components/statistical/empty"
var ItemLine = function() {
  return {
    name: "",
    type: "line",
    smooth: true,
    seriesLayoutBy: "row",
    data: [],
    itemStyle: {
      normal: {
        color: "green",
        lineStyle: {
          color: "red"
        }
      }
    }
  };
};
var SeriesTotal = [];
export default {
  name: "linechart-template", //标准折线图
  props: {
    brokenlineData: {
      //父页面传回的折线图值 接收的数据类型
      type: Object
    }
	},
	components:{
    //   Empty,
	},
  data() {
    return {
      brokenline: null, //折线初始值
      current: 0, //选中的名称
      outrate: "", //下拉框选中的值
      twooutrate: "", //下拉框选中值
      brokenlineId: "brokenline" + new Date().getTime(),
      data: this.brokenlineData.data
    };
  },
  created() {
    // this.initbrokenline()
//     console.log(this.brokenlineData)
//     let _this = this
//     setTimeout(function()  {
//       _this.getvalue();
//    }, 2000)
    
  },
  mounted(){
      this.getvalue()
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.brokenline) {
      this.brokenline.resize();
    }
	},
	computed: {
	  lineOff(){
			return this.brokenlineData.data.length<0
      }
	},
  methods: {
    getvalue() {
      let _this = this;
      SeriesTotal = [];
      for (var k in this.brokenlineData.data) {
        //核心，给series赋值，分开包装的思想。
        var obj = {};
        var itemLine = new ItemLine();
        itemLine.name = this.brokenlineData.data[k].name;
        itemLine.data = this.brokenlineData.data[k].value;
        itemLine.itemStyle.normal.color = _this.brokenlineData.thiscolor[k];
        itemLine.itemStyle.normal.lineStyle.color =
          _this.brokenlineData.thiscolor[k];
        SeriesTotal.push(itemLine);
      }
      console.log(SeriesTotal);
      this.initbrokenline();
    },
    // 初始化折线图
    initbrokenline() {
      if(this.brokenlineData.outrates[0])
        this.outrate = this.brokenlineData.outrates[0].value;
      let _self = this;
      let option = {
        color: _self.brokenlineData.thiscolor,
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
         grid: {
            left: '3%',
            right: '3%',
            top: '30px',
            bottom: 50,
            containLabel: true
          },
        legend: {
          //展示折线图的数据值(条数)
          data: (() => {
            let legendarr = [];
            for (let i = 0; i < this.brokenlineData.data.length; i++) {
              legendarr.push(this.brokenlineData.data[i].name);
            }
            return legendarr;
          })(),
          bottom: 0,
          left: 30,
          icon: "rect",
          itemWidth: 10,
          type:'scroll',//出现翻页
          itemHeight: 10,
          itemGap: 40
        },
        toolbox: {
          show: true
        },
        xAxis: {
          //展示横坐标的数据
          type: "category",
          boundaryGap: false,
          data: _self.brokenlineData.thisxAxis
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} " + _self.brokenlineData.thisnum
          }
        },
        grid: {
          y : '20',
          left: '6%',
          right: '6%',
          bottom: '10%',
          containLabel: true
        },
        series: SeriesTotal
      };
      this.brokenline = echarts.init(
        document.getElementById(this.brokenlineId)
      );
       // 等待加载loading
      this.brokenline.showLoading({
        text: "loading",
        color: "#6851e1",
        textColor: "#c9c9c9",
        maskColor: "#f0f0f0",
        zlevel: 0
      });
      setTimeout(()=>{
        this.brokenline.hideLoading()
      },2000)
      this.brokenline.clear();
      this.brokenline.setOption(option);
      window.addEventListener("resize", () => {
        this.brokenline.resize();
      });
      
    },
    changeSelect(value) {
      console.log(value)
      this.$emit('changeSelect', value)
    },
    checkedClick: function(value) {
      this.current = value;
      // if(value == 0) {
      // 	this.getListDayByOrgCode()
      // } else if(value == 1) {
      // 	this.getListWeekByOrgCode()
      // } else {
      // 	this.getListMonthByOrgCode()
      // }
      this.$emit('warehouseQuery', value)
      //  this.getvalue()
    }
  },
  watch: {
    brokenlineData: {
        handler() {
          console.log('this.brokenlineData',this.brokenlineData)
            this.getvalue()
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

		
	
}

.mod-demo-echarts {
  .brokenlineId {
    min-height: 400px;
  }
}
</style>
<style lang="scss" scoped>
	.ischeck{
	  color:#D70110;
	  border-bottom: 4px solid #D70110;
	}
.headSelectBox{
    display: inline-block;
    float: right;
    margin-right: 40px;
	cursor: pointer;
	font-size: 14px;
    color: #39394d;
    span:nth-child(2){
      margin: 0 50px;
    }
}
</style>