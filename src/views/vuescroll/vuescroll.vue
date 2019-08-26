<template>
  <div class="parent">
    <!-- <vue-scroll class="parent" :ops="ops"> -->
    <el-table class="child" :data="tableData" border style="width: 100%;">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- </vue-scroll> -->
  </div>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      timer: null,
      ops: {
        // vuescroll: {
        //   mode: "native",
        //   sizeStrategy: 10,
        //   detectResize: false
        // },
        // scrollPanel: {
        //   initialScrollY: false,
        //   initialScrollX: false,
        //   scrollingX: true,
        //   scrollingY: true,
        //   speed: 300,
        //   easing: undefined,
        //   verticalNativeBarPos: "right"
        // },
        // rail: {
        //   background: "#01a99a",
        //   opacity: 0,
        //   size: "6px",
        //   specifyBorderRadius: false,
        //   gutterOfEnds: null,
        //   gutterOfSide: "2px",
        //   keepShow: false
        // },
        bar: {
          background: "#000"
        }
      }
    };
  },
  mounted() {
      this.uu()
  },
  methods: {
    uu() {
      let parent = document.getElementsByClassName("parent")[0];
      let index = 0;
      this.timer = setInterval(() => {
        index += 10;
        if (
          index >
          document.getElementsByClassName("child")[0].clientHeight - 100
        ) {
          clearInterval(this.timer);
          this.tableData = [];
          this.tableData2.map(item => {
            this.tableData.push(item);
          });
          setTimeout(()=>{
          this.uu()
          },1000)
        }
        parent.scrollTop = index;
        console.log(parent);
      }, 400);
    }
  }
};
</script>

<style scoped>
.parent {
  height: 100px;
  overflow: auto;
}
 .parent::-webkit-scrollbar{
     width: 4px;
 }
</style>