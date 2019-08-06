<template>
     <div class="linechart-template">
    <el-row style="padding-left:20px; line-height:40px;" class="height40 linheight40 margintop10">
      <el-col :span="4" v-if="brokenpieData.showselect">
        <div class="grid-content bg-purple">
          <span class="disinline">{{ brokenpieData.title }}</span>
          <!-- <el-tooltip
            v-if="brokenpieData.showicon"
            class="item"
            effect="dark"
            :content="brokenpieData.explain"
            placement="right"
          >
            <icon-svg name="help" class="tipicon"></icon-svg> -->
          <!-- </el-tooltip> -->
          <!-- <Help v-if="brokenpieData.showicon" :helpText="brokenpieData.explain" style="margin-left: 10px;line-height: normal;top:-2px;color:#fff;z-index:10"></Help> -->
        </div>
      </el-col>
      <el-col :span="4" v-else>
        <div class="grid-content bg-purple">
          <span class="disinline">{{ brokenpieData.title }}</span>
          <!-- <el-tooltip
            v-if="brokenpieData.showicon"
            class="item"
            effect="dark"
            :content="brokenpieData.explain"
            placement="right"
          >
            <icon-svg name="help" class="tipicon"></icon-svg>
          </el-tooltip> -->
          <!-- <Help v-if="brokenpieData.showicon" :helpText="brokenpieData.explain" style="margin-left: 10px;line-height: normal;top:-2px;color:#fff;z-index:10"></Help> -->
        </div>
      </el-col>
      <el-col :span="3" style="margin-right:10px">
        <div class="grid- bg-purple-light">
          <el-select v-model="outrate" placeholder="请选择" @change="changeselect">
            <el-option
              v-for="item in brokenpieData.outrates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <!-- <el-col :span="3" style="margin-right:10px">
        <div class="grid- bg-purple-light">
          <el-select v-model="outrate" placeholder="请选择" @change="changeselect">
            <el-option
              v-for="item in getSlectsarr"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
      </el-col> -->

      <el-col :span="3" v-if="brokenpieData.showselect">
        <div class="grid- bg-purple-light">
          <el-select v-model="twooutrate" placeholder="请选择" @change="twochangeselect">
            <el-option
              v-for="item in brokenpieData.twooutrates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
       <!-- <el-col :span="3" v-if="brokenpieData.showselect">
        <div class="grid- bg-purple-light">
          <el-select v-model="twooutrate" placeholder="请选择" @change="twochangeselect">
            <el-option
              v-for="item in selectall"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
      </el-col> -->

      <el-col :span="brokenpieData.showselect?11:14">
        <el-row style="position: relative; right: 36px;">
          <el-col
            :span="3"
            :style="'position: absolute;right:-'+ index*50+'px;'"
            v-for="(item,index) in brokenpieData.brushchoose"
            :key="index++"
          >
            <div
              style="width:50px; cursor: pointer;justify-content: center;"
              class="grid-content bg-purple textcenter"
              v-on:click="xuanzhong(index)"
              :class="{ischeck:index==current}"
            >{{ item }}</div>
          </el-col>
        </el-row>
      </el-col>
      <!-- <div class="headSelectBox">
        <span
          class
          v-for="(item,index) in brokenpieData.brushchoose"
          :key="index++"
          v-on:click="xuanzhong(index)"
          :class="{ischeck:index==current}"
        >{{ item }}</span>
      </div> -->
    </el-row>
    <div class="mod-demo-echarts margintop10" >
      <!-- :siler="silder" -->
      <div :id="brokenpieId" style="height:400px;width:400px;" class="brokenlineId"></div>
    </div>
  </div>
</template>
<script>
import  echarts from 'echarts'
export default {
 data(){
    return{
        getSlectsarr:[],//one
        selectall:[],//two
        brokenpie: null, //折线初始值
        current: 1, //选中的名称
        outrate: "org_code", //下拉框选中的值
        twooutrate: "", //下拉框选中值
        option: {},
        brokenpieId: "brokenpieid" + new Date().getTime(),
        data: this.brokenpieData.datavalue,
         
    }
 },
 activated() {
     // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
     if (this.brokenline) {
        this.brokenline.resize();
      }
 },
  props: {
    brokenpieData: {
      //父页面传回的折线图值 接收的数据类型
      type: Object,
      required: true
    },
    successData: {
      type: Boolean
    }
    },
 methods:{
     initdataPie(){
        this.options={
             title : {
                  text: '',
                  subtext: '纯属虚构',
                  x:'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },

              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: []
              },
              series : [
                  {
                      name: '访问来源',
                      type: 'pie',
                      // radius : '55%',//实心圆
                      // radius: ['50%', '70%'],//空心圆
                      radius:'',
                      center: ['50%', '60%'],
                      data:[
                      
                      ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
         },
         this.brokenpie=echarts.init(document.getElementById(this.brokenpieId))
          // 等待加载loading
          this.brokenpie.showLoading({
           text: "loading",
          color: "#6851e1",
        textColor: "#c9c9c9",
        maskColor: "#f0f0f0",
        zlevel: 0
      });
       setTimeout(()=>{
        this.brokenpie.hideLoading()
      },4000)
       window.addEventListener("resize", () => {
        this.brokenpie.resize();
      });
     },
     handSerion(){
         console.log(this.brokenpieData)
         this.options.title.text=this.brokenpieData.title
         this.options.series[0].radius=this.brokenpieData.radius
         this.options.legend.data=this.brokenpieData.datavalue.map(item=>{
             return item.name
         })
         this.options.series[0].data=this.brokenpieData.datavalue
         this.brokenpie.clear();
         this.brokenpie.setOption(this.options,true)
        //  this.brokenpie.hideLoading()
     },
      //日月轴时间
    xuanzhong: function(value) {
      alert(value)
      // this.current = value;
      // let obj = {
      //   current: value,
      //   type: this.outrate || "",
      //   org_type: this.twooutrate || ""
      // };
      // this.$emit("clicktypes", obj);
    },
    //第一个下拉框
    changeselect: function(event, item) {
       let indexNum=this.getSlectsarr.findIndex(item=>{
         return event===item.code
       })
       this.selectall=[]
       this.selectall=this.getSlectsarr[indexNum].data
       this.twooutrate=this.selectall[0].code
       console.log(this.selectall)
       let obj = {
        current: '',
        type: event,
        org_type: this.twooutrate || ""
      };
      this.$emit("changeselect", obj);
    },
    //第二个下拉框
    twochangeselect: function(event, item) {
       let obj = {
        current: '',
        type: event,
        org_type: this.twooutrate || ""
      };
      this.$emit("twochangeselect", obj);
    },
 },
 mounted(){
     this.initdataPie()
     this.handSerion()
     
 }
}
</script>
<style lang="scss" scoped>

</style>
