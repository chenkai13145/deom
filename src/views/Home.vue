<template>
  <div class="app">
    <!-- <p>{{title}}</p> -->
    <div class="city">
      <!-- <input type="text" v-model="citys" placeholder="出发城市" @focus="showCityDialog"> -->
      <el-input
        style="width:100%;"
        :placeholder="textVal"
        @keydown.space="keySearch"
        @keyup.native="keySearch"
        @blur="hidenn"
        v-model="citys"
        @focus="showCityDialog"
        clearable
      ></el-input>
      <div class="city-components" v-show="showCity">
        <!-- 注释头部 -->
        <div
          v-show="turnoff"
          style="text-align:left;margin:-10px 0 10px 10px;color:#ccc;"
        >支持汉字/拼音/英文字母</div>
        <!-- NAV -->
        <ul v-show="turnoff" class="filter-tabar clearfix">
          <li
            v-for="(item,index) in cityListKey"
            :class="{'active':upCityListIndex==index}"
            @mouseover.stop="upCityListKey(index)"
            :key="index"
          >{{item}}</li>
        </ul>
        <!-- content -->
        <div v-show="turnoff" class="city-content">
          <ul
            v-for="(item,index) in upCityLists"
            v-show="item.ckey=='R'?false:true"
            :key="index"
            :class="upCityListIndex=='0'?'clearfix':'clearfix  rr'"
          >
            <label for v-show="upCityListIndex=='0'?false:true">{{item.ckey}}</label>
            <li
              v-for="(ritem,i) in item.cityList"
              :key="i"
              @click="selectDepCity(ritem.airportName)"
            >{{ritem.airportName}}</li>
          </ul>
        </div>
        <!-- 拼音 -->
        <div class="city-ping" v-show="!turnoff">
          <ul>
            <li
              v-for="(item,index) in fiterList"
              :key="index"
              @click="selectDepCity(item.cityName)"
              style="text-align: left;padding:0px 4px; cursor: pointer; position: relative;"
            >
              {{item.cityName}}
              <span style="position: absolute; right:4px;">{{item.airportName}}</span>
            </li>
          </ul>
        </div>
        <!-- NOFOUND -->
        <div class="city-nofound" v-show="turnoffno">
          <span style="text-algin:left; padding-left:20px">没有相关的内容</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { clearTimeout } from "timers";
import {ConvertPinyin} from "../common/pingyin";

export default {
  name: "app",
  data() {
    return {
      showCity: false,
      fiterList: [],
      tmer: "",
      list: [
        {
          airportCode: "热门",
          cityName: "北京",
          airportName: "beijing"
        },
        {
          airportCode: "JM",
          cityName: "江门",
          airportName: "jiangmen"
        },
        {
          airportCode: "热门",
          cityName: "上海",
          airportName: "shanghai"
        },
        {
          airportCode: "热门",
          cityName: "广州",
          airportName: "guangzhou"
        },
        {
          airportCode: "热门",
          cityName: "深圳",
          airportName: "shengzheng"
        },
        {
          airportCode: "热门",
          cityName: "成都",
          airportName: "chengdu"
        },
        {
          airportCode: "热门",
          cityName: "重庆",
          airportName: "chongqing"
        },
        {
          airportCode: "热门",
          cityName: "厦门",
          airportName: "xiamen"
        },
        {
          airportCode: "热门",
          cityName: "昆明",
          airportName: "kunming"
        },
        {
          airportCode: "热门",
          cityName: "杭州",
          airportName: "hangzhou "
        },
        {
          airportCode: "热门",
          cityName: "西安",
          airportName: "xian"
        },
        {
          airportCode: "热门",
          cityName: "武汉",
          airportName: "wuhan"
        },
        {
          airportCode: "热门",
          cityName: "长沙",
          airportName: "changsha"
        },
        {
          airportCode: "热门",
          cityName: "南京",
          airportName: "nanjing"
        },
        {
          airportCode: "热门",
          cityName: "大连",
          airportName: "阿松大"
        },
        {
          airportCode: "热门",
          cityName: "郑州",
          airportName: "zhengzhou"
        },
        {
          airportCode: "热门",
          cityName: "青岛",
          airportName: "qingdao"
        },
        {
          airportCode: "热门",
          cityName: "三亚",
          airportName: "sanya"
        },
        {
          airportCode: "热门",
          cityName: "海口",
          airportName: "haikou"
        },
        {
          airportCode: "热门",
          cityName: "乌鲁木齐",
          airportName: "wulumuqi"
        }
      ],
      city: [
        {
          title: "A",
          lists: [
            "阿坝",
            "阿拉善",
            "阿里",
            "安康",
            "安庆",
            "鞍山",
            "安顺",
            "安阳",
            "澳门"
          ]
        },
        {
          title: "B",
          lists: [
            "北京",
            "白银",
            "保定",
            "宝鸡",
            "保山",
            "包头",
            "巴中",
            "北海",
            "蚌埠",
            "本溪",
            "毕节",
            "滨州",
            "百色",
            "亳州"
          ]
        },
        {
          title: "C",
          lists: [
            "重庆",
            "成都",
            "长沙",
            "长春",
            "沧州",
            "常德",
            "昌都",
            "长治",
            "常州",
            "巢湖",
            "潮州",
            "承德",
            "郴州",
            "赤峰",
            "池州",
            "崇左",
            "楚雄",
            "滁州",
            "朝阳"
          ]
        },
        {
          title: "D",
          lists: [
            "大连",
            "东莞",
            "大理",
            "丹东",
            "大庆",
            "大同",
            "大兴安岭",
            "德宏",
            "德阳",
            "德州",
            "定西",
            "迪庆",
            "东营"
          ]
        },
        {
          title: "E",
          lists: ["鄂尔多斯", "恩施", "鄂州"]
        },
        {
          title: "F",
          lists: ["福州", "防城港", "佛山", "抚顺", "抚州", "阜新", "阜阳"]
        },
        {
          title: "G",
          lists: [
            "广州",
            "桂林",
            "贵阳",
            "甘南",
            "赣州",
            "甘孜",
            "广安",
            "广元",
            "贵港",
            "果洛"
          ]
        },
        {
          title: "H",
          lists: [
            "杭州",
            "哈尔滨",
            "合肥",
            "海口",
            "呼和浩特",
            "海北",
            "海东",
            "海南",
            "海西",
            "邯郸",
            "汉中",
            "鹤壁",
            "河池",
            "鹤岗",
            "黑河",
            "衡水",
            "衡阳",
            "河源",
            "贺州",
            "红河",
            "淮安",
            "淮北",
            "怀化",
            "淮南",
            "黄冈",
            "黄南",
            "黄山",
            "黄石",
            "惠州",
            "葫芦岛",
            "呼伦贝尔",
            "湖州",
            "菏泽"
          ]
        },
        {
          title: "J",
          lists: [
            "济南",
            "佳木斯",
            "吉安",
            "江门",
            "焦作",
            "嘉兴",
            "嘉峪关",
            "揭阳",
            "吉林",
            "金昌",
            "晋城",
            "景德镇",
            "荆门",
            "荆州",
            "金华",
            "济宁",
            "晋中",
            "锦州",
            "九江",
            "酒泉"
          ]
        },
        {
          title: "K",
          lists: ["昆明", "开封"]
        },
        {
          title: "L",
          lists: [
            "兰州",
            "拉萨",
            "来宾",
            "莱芜",
            "廊坊",
            "乐山",
            "凉山",
            "连云港",
            "聊城",
            "辽阳",
            "辽源",
            "丽江",
            "临沧",
            "临汾",
            "临夏",
            "临沂",
            "林芝",
            "丽水",
            "六安",
            "六盘水",
            "柳州",
            "陇南",
            "龙岩",
            "娄底",
            "漯河",
            "洛阳",
            "泸州",
            "吕梁"
          ]
        },
        {
          title: "M",
          lists: ["马鞍山", "茂名", "眉山", "梅州", "绵阳", "牡丹江"]
        },
        {
          title: "N",
          lists: [
            "南京",
            "南昌",
            "南宁",
            "宁波",
            "南充",
            "南平",
            "南通",
            "南阳",
            "那曲",
            "内江",
            "宁德",
            "怒江"
          ]
        },
        {
          title: "P",
          lists: ["盘锦", "攀枝花", "平顶山", "平凉", "萍乡", "莆田", "濮阳"]
        },
        {
          title: "Q",
          lists: [
            "青岛",
            "黔东南",
            "黔南",
            "黔西南",
            "庆阳",
            "清远",
            "秦皇岛",
            "钦州",
            "齐齐哈尔",
            "泉州",
            "曲靖",
            "衢州"
          ]
        },
        {
          title: "R",
          lists: ["日喀则", "日照"]
        },
        {
          title: "S",
          lists: [
            "上海",
            "深圳",
            "苏州",
            "沈阳",
            "石家庄",
            "三门峡",
            "三明",
            "三亚",
            "商洛",
            "商丘",
            "上饶",
            "山南",
            "汕头",
            "汕尾",
            "韶关",
            "绍兴",
            "邵阳",
            "十堰",
            "朔州",
            "四平",
            "绥化",
            "遂宁",
            "随州",
            "宿迁",
            "宿州"
          ]
        },
        {
          title: "T",
          lists: [
            "天津",
            "太原",
            "泰安",
            "泰州",
            "台州",
            "唐山",
            "天水",
            "铁岭",
            "铜川",
            "通化",
            "通辽",
            "铜陵",
            "铜仁",
            "台湾",
            "W",
            "武汉",
            "乌鲁木齐",
            "无锡",
            "威海",
            "潍坊",
            "文山",
            "温州",
            "乌海",
            "芜湖",
            "乌兰察布",
            "武威",
            "梧州"
          ]
        },
        {
          title: "X",
          lists: [
            "厦门",
            "西安",
            "西宁",
            "襄樊",
            "湘潭",
            "湘西",
            "咸宁",
            "咸阳",
            "孝感",
            "邢台",
            "新乡",
            "信阳",
            "新余",
            "忻州",
            "西双版纳",
            "宣城",
            "许昌",
            "徐州",
            "香港",
            "锡林郭勒",
            "兴安"
          ]
        },
        {
          title: "Y",
          lists: [
            "银川",
            "雅安",
            "延安",
            "延边",
            "盐城",
            "阳江",
            "阳泉",
            "扬州",
            "烟台",
            "宜宾",
            "宜昌",
            "宜春",
            "营口",
            "益阳",
            "永州",
            "岳阳",
            "榆林",
            "运城",
            "云浮",
            "玉树",
            "玉溪",
            "玉林"
          ]
        },
        {
          title: "Z",
          lists: [
            "杂多县",
            "赞皇县",
            "枣强县",
            "枣阳市",
            "枣庄",
            "泽库县",
            "增城市",
            "曾都区",
            "泽普县",
            "泽州县",
            "札达县",
            "扎赉特旗",
            "扎兰屯市",
            "扎鲁特旗",
            "扎囊县",
            "张北县",
            "张店区",
            "章贡区",
            "张家港",
            "张家界",
            "张家口",
            "漳平市",
            "漳浦县",
            "章丘市",
            "樟树市",
            "张湾区",
            "彰武县",
            "漳县",
            "张掖",
            "漳州",
            "长子县",
            "湛河区",
            "湛江",
            "站前区",
            "沾益县",
            "诏安县",
            "召陵区",
            "昭平县",
            "肇庆",
            "昭通",
            "赵县",
            "昭阳区",
            "招远市",
            "肇源县",
            "肇州县",
            "柞水县",
            "柘城县",
            "浙江",
            "镇安县",
            "振安区",
            "镇巴县",
            "正安县",
            "正定县",
            "正定新区",
            "正蓝旗",
            "正宁县",
            "蒸湘区",
            "正镶白旗",
            "正阳县",
            "郑州",
            "镇海区",
            "镇江",
            "浈江区",
            "镇康县",
            "镇赉县",
            "镇平县",
            "振兴区",
            "镇雄县",
            "镇原县",
            "志丹县",
            "治多县",
            "芝罘区",
            "枝江市",
            "芷江侗族自治县",
            "织金县",
            "中方县",
            "中江县",
            "钟楼区",
            "中牟县",
            "中宁县",
            "中山",
            "中山区",
            "钟山区",
            "钟山县",
            "中卫",
            "钟祥市",
            "中阳县",
            "中原区",
            "周村区",
            "周口",
            "周宁县",
            "舟曲县",
            "舟山",
            "周至县",
            "庄河市",
            "诸城市",
            "珠海",
            "珠晖区",
            "诸暨市",
            "驻马店",
            "准格尔旗",
            "涿鹿县",
            "卓尼",
            "涿州市",
            "卓资县",
            "珠山区",
            "竹山县",
            "竹溪县",
            "株洲",
            "株洲县",
            "淄博",
            "子长县",
            "淄川区",
            "自贡",
            "秭归县",
            "紫金县",
            "自流井区",
            "资溪县",
            "资兴市",
            "资阳"
          ]
        }
      ],
      cityListKey: [],
      upCityListIndex: "0",
      upCityList: "",
      result: "",
      citys: ""
    };
  },
  props: ["textVal"],
  created() {
    this.sorts()
  },
  methods: {
    //影藏事件
    // hidenn() {
    //   this.tmer = setTimeout(
    //     () => {
    //       this.showCity = false;
    //     },
    //     500,
    //     () => {
    //       clearTimeout(this.tmer);
    //     }
    //   );
    // },
    //显示事件
    showCityDialog() {
      this.showCity = true;
      this.keySearch();
    },
    //排序
    sort() {
      let map = {}; // 处理过后的数据对象
      let temps = []; // 临时变量
      this.list.map(item => {
        if (item.airportCode) {
          let ekey = item.airportCode.charAt(0).toUpperCase(); // 根据key值的第一个字母分组，并且转换成大写
          temps = map[ekey] || []; // 如果map里面有这个key了，就取，没有就是空数组
          temps.push({
            airportCode: item.airportCode,
            airportName: item.cityName,
            airportPing: item.airportName
          });
          map[ekey] = temps;
        }
      });
      let lists = [];
      // console.log(map);
      for (let gkey in map) {
        if (gkey == "热") {
          // console.log("ppp");
          lists.unshift({
            ckey: gkey + "点城市",
            cityList: map[gkey]
          });
          continue;
        }
        lists.push({
          ckey: gkey,
          cityList: map[gkey]
        });
      }
      // console.log(lists);
      lists = lists.sort((li1, li2) => {
        return li1.ckey.charCodeAt(0) - li2.ckey.charCodeAt(0);
      });
      // console.log(lists);
      // console.log(lists)
      let arr = lists.splice(lists.length - 1, 1);
      //  console.log(arr)
      //  console.log(lists)
      lists.unshift(arr[0]);
      // console.log(lists);
      let chunk = 5;
      let result = [];
      for (var i = 0, j = lists.length; i < j; i += chunk) {
        if (lists[i].ckey == "热点城市") {
          result.unshift(lists.slice(i, 1));
          i = -4;
        } else {
          if (i == 6) {
            chunk = 4;
          } else {
            chunk = 5;
          }
          result.push(lists.slice(i, i + chunk));
        }
      }
      // console.log(result);
      this.result = result;
      this.upCityList = this.result[0];

      let cityListKey = [];
      // console.log(result)
      result.map(item => {
        let ckeys = "";
        item.map(ritem => {
          ckeys += ritem.ckey;
        });
        cityListKey.push(ckeys);
      });
      this.cityListKey = cityListKey;
   
    },
    upCityListKey(index) {
      this.upCityListIndex = index;
      this.upCityList = this.result[index];
         console.log('llllpppp')
      console.log(this.upCityList)
    },
    selectDepCity(val) {
      this.citys = val;
      this.showCity = false;
      this.$emit("parentFn", this.citys);
    },
    //按键搜索
    keySearch() {
      this.fiterList = this.list.filter(item => {
        return (
          (item.airportName.includes(this.citys) &&
            item.airportCode != "热门") ||
          (item.cityName.includes(this.citys) && item.airportCode != "热门")
        );
      });
      this.$emit("parentFn", this.citys);
    },
    //换城市
    replaceCity(val) {
      this.citys = val;
    },
    sorts() {
     let arr=this.city.map(item=>{
        return item.lists.map(items=>{
                var obj={}
               obj.airportCode=item.title
               obj.cityName=items
               obj.airportName=ConvertPinyin(items)
               return obj
        })
       })
       this.list=[...arr.flat(),...this.list]
       this.sort()
    },
  },
  computed: {
    turnoff() {
      return this.citys.length <= 0;
    },
    turnoffno() {
      return this.fiterList.length <= 0 && this.citys.length > 0;
    },
    upCityLists(){
      return this.upCityList
    }
  }
};
</script>
<style lang="scss" scoped>
.app {
  z-index: 1111 !important;
}
.city {
  position: relative;
  // width: 168px;
  margin: auto;
  .city-components {
    background: #fff;
    position: absolute;
    width: 440px;
    box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
    border-radius: 2px;
    padding: 20px 0px;
    margin: 4px 0 0 6px;
    z-index: 1111;
    .city-ping {
      max-height: 150px;
      overflow-y: auto;
    }
    .city-nofound {
      position: relative;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.clearfix {
  &:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
  }
}
li {
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}
.filter-tabar {
  border-bottom: 1px solid #d7d7d7;
  cursor: pointer;
  background-color: #ccc;
  box-sizing: content-box;
  li {
    text-align: center;
    padding: 0 14px;
    float: left;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    position: relative;
    &.active {
      background-color: red;
      color: #fff;
    }
  }
}
.city-content {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px 13px 0 13px;
  ul {
    display: flex;
    justify-content: left;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  label {
    color: #5f5f5f !important;
    float: left;
    margin-right: 6px;
    font-size: 14px;
    height: 14px;

    margin-top: 10px;
  }
  .rr {
    li:nth-child(7) {
      margin-left: 16px !important;
    }
    li:nth-child(12) {
      margin-left: 16px !important;
    }
    li:nth-child(17) {
      margin-left: 16px !important;
    }
    li:nth-child(22) {
      margin-left: 16px !important;
    }
    li:nth-child(27) {
      margin-left: 16px !important;
    }
    li:nth-child(32) {
      margin-left: 16px !important;
    }
    li:nth-child(37) {
      margin-left: 16px !important;
    }
    li:nth-child(42) {
      margin-left: 16px !important;
    }
    li:nth-child(47) {
      margin-left: 16px !important;
    }
    li:nth-child(52) {
      margin-left: 16px !important;
    }
    li:nth-child(57) {
      margin-left: 16px !important;
    }
    li:nth-child(62) {
      margin-left: 16px !important;
    }
    li:nth-child(67) {
      margin-left: 16px !important;
    }
    li:nth-child(72) {
      margin-left: 16px !important;
    }
    li:nth-child(77) {
      margin-left: 16px !important;
    }
    li:nth-child(82) {
      margin-left: 16px !important;
    }
    li:nth-child(87) {
      margin-left: 16px !important;
    }
    li:nth-child(92) {
      margin-left: 16px !important;
    }
    li:nth-child(97) {
      margin-left: 16px !important;
    }
    li:nth-child(112) {
      margin-left: 16px !important;
    }
    li:nth-child(117) {
      margin-left: 16px !important;
    }
    li:nth-child(122) {
      margin-left: 16px !important;
    }
    li:nth-child(102) {
      margin-left: 16px !important;
    }
    li:nth-child(107) {
      margin-left: 16px !important;
    }
    // li:nth-child(137) {
    //   margin-left: 16px !important;
    // }
    // li:nth-child(142) {
    //   margin-left: 16px !important;
    // }
  }
  li {
    margin: 10px 0;
    // padding: 6px 0 6px;
    // float: left;
    text-align: left;
    font-size: 14px;
    min-width: 70px;
    cursor: pointer;
    float: left;
    list-style-type: none;
    height: 14px;
    width: 70px;
    display: block;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 4px 0 2px;
    word-break: break-all;
    word-wrap: break-word;
  }
}
.city-components {
  position: absolute;
  width: 400px;
  // height: 200px;
  box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
  border-radius: 2px;
  padding: 20px 21px;
}
</style>

