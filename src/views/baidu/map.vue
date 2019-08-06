<template>
  <!-- 地图 -->
  <baidu-map class="bm-view" center="河北" @ready="handler">
    <div class="searchBox">
      <input type="text" v-model="keyword" placeholder="请输入仓库名搜索">
      <button @click="seach()">搜索</button>
    </div>
    <!--地图类型，两种：一种是路线一种是绿的那种 :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"-->
    <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
    <!--地图搜索功能，绑定上面的input，-->
    <!--display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，-->
    <!--zoom是搜索结果的视图比例，个人觉得12.8很舒服显示-->
    <bm-local-search :keyword="getcity" :auto-viewport="true" zoom="12.8" style="display: none"></bm-local-search>
    <!-- 缩略图 -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

    
<!-- 标签定位头部信息 -->
    <bm-label
      v-for="(marker,key) of markers"
      :key="key"
      v-bind:content="marker.inoutwarehouse+'辆'"
      :offset="{width: -26, height: -45}" 
      :position="{lng: marker.warehouse_lng, lat: marker.warehouse_lat}"
    />
    <!-- 聚合点 -->
    <bml-marker-clusterer :averageCenter="true" :styles="styles">
      <div v-for="(marker,key) of markers" :key="key">
          <!-- 定位坐标点 -->
        <bm-marker 
          :dragging="true"
          :icon="{url:marker.url,size: {width: 20, height: 20},opts: {anchor: {width:20,height:20},imageSize: {width:20,height:20},infoWindowAnchor: {width:20,height:20}}}" 
          :key="key"
          :position="{lng: marker.warehouse_lng, lat: marker.warehouse_lat}"
          @click="infoWindowOpen(marker)"
        >
    
          <!-- 信息弹窗 -->
          <bm-info-window   
            :position="{lng: marker.warehouse_lng, lat: marker.warehouse_lat}"
            :show="marker.showFlag"
            @close="infoWindowClose(marker)"
            @open="infoWindowOpen(marker)"
            class="windowinfo"
          >
            <p>{{marker.warehouse_name}}</p>
            <p>投资企业:{{marker.org_name}}</p>
            <p>商品车品牌:{{marker.car_brand_name}}</p>
            <p>所在城市:{{marker.factory_city_name}}</p>
          </bm-info-window>
        </bm-marker>
      </div>
    </bml-marker-clusterer>
  </baidu-map>
  <!-- 地图 -->
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map"; //引入聚合点组件
export default {
  name: "transport",
  components: {
    BmlMarkerClusterer
  },
  //   props: {
  //     markers: {
  //       type: Array,
  //       required: true
  //     }
  //   },
  data() {
    return {
      show: false,
      markers: [
        {
          url: "/image/ic_warehouse_1@2x.png",//定位点的小图标
          car_brand_name: null,
          factory_city_name: null,
          inoutwarehouse: 12,
          org_name: null,
          warehouse_lat: "3.51",
          showFlag: false,//控制window信息框的显示和隐藏
          warehouse_lng: "121.46",
          warehouse_name: "xxx库位0"
        },
        {
          url: "/image/ic_warehouse_2@2x.png",
          car_brand_name: null,
          factory_city_name: null,
          inoutwarehouse: 2323,
          org_name: null,
          warehouse_lat: "34.53",
          warehouse_lng: "121.46",
          warehouse_name: "xxx库位0",
          showFlag: false
        },
         {
          url: "/image/ic_warehouse_3@2x.png",
          car_brand_name: null,
          factory_city_name: null,
          inoutwarehouse: 223,
          org_name: null,
          warehouse_lat: "32.52",
          warehouse_lng: "141.46",
          warehouse_name: "xxx库位0",
          showFlag: false
        },
            {
          url: "/image/ic_warehouse_3@2x.png",
          car_brand_name: null,
          factory_city_name: null,
          inoutwarehouse: 223,
          org_name: null,
          warehouse_lat: "30.51",
          warehouse_lng: "141.46",
          warehouse_name: "xxx库位0",
          showFlag: false
        },
            {
          url: "/image/ic_warehouse_3@2x.png",
          car_brand_name: null,
          factory_city_name: null,
          inoutwarehouse: 223,
          org_name: null,
          warehouse_lat: "31.51",
          warehouse_lng: "141.46",
          warehouse_name: "xxx库位0",
          showFlag: false
        }
      ],
      // 地图
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "", //查询关键词
      city: "",
      styles: [] //聚合点样式
    };
  },
  mounted() {
    // this.getTrafficData()
    //设置聚合点图表样式
    this.styles = [
      {
        url: "../image/chuan_06.png", //聚合点图标
        size: { width: 52, height: 53 }, //图标大小
        opt_anchor: [52, 53],
        textColor: "white",  //字体颜色
        opt_textSize:20
      },
        {
        url: "../image/chuan_06.png", //聚合点图标
        size: { width: 52, height: 53 }, //图标大小
        opt_anchor: [52, 53],
        textColor: "white",
        opt_textSize: 12
      }
    ];
  },
  methods: {
    handler({BMap, map }) {
      // 地图样式
      map.setMapStyle({
        styleJson: [
          {
            featureType: "all",
            elementType: "all",
            stylers: {
              lightness: 10,
              saturation: -45
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#b5bcd6ff",
              lightness: 42
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#a3a8bdff"
            }
          },
          {
            featureType: "green",
            elementType: "geometry.fill",
            stylers: {
              color: "#daf1e8ff",
              saturation: -36
            }
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: {
              color: "#81c3ffff",
              lightness: 55,
              saturation: -55
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#dcddeaff"
            }
          },
          {
            featureType: "land",
            elementType: "geometry.fill",
            stylers: {
              color: "#eaebf2ff",
              saturation: -66
            }
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: {
              saturation: -100
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8b9196ff",
              saturation: -100
            }
          },
          {
            featureType: "subway",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry.fill",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#dcddeaff"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#c1c3d1ff"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "administrative",
            elementType: "all",
            stylers: {
              saturation: -87
            }
          },
          {
            featureType: "district",
            elementType: "labels.text.fill",
            stylers: {
              color: "#7a7a7aff"
            }
          },
          {
            featureType: "district",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff",
              saturation: -100
            }
          },
          {
            featureType: "poilabel",
            elementType: "all",
            stylers: {}
          },
          {
            featureType: "manmade",
            elementType: "labels",
            stylers: {
              saturation: -100
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#dfe6ffff"
            }
          }
        ]
      });
      this.center.lng = 0;
      this.center.lat = 0;
      this.zoom = 3;
    },
    //根据经纬度获取城市
    getLocations(val) {
      var _this = this;
      if (val) {
        var point = new BMap.Point(val.warehouse_lng, val.warehouse_lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, rs => {
          _this.city = rs.address;
        });
      }
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    //关闭window信息框
    infoWindowClose(marker) {
      marker.showFlag = false;
    },
    //打开window信息框
    infoWindowOpen(marker) {
      marker.showFlag = true;
    },

    seach() {
      alert(this.keyword)
      // this.$emit("seach", this.keyword);
    }
  },
  computed: {
    getcity() {
      return this.city;
    }
  },
  watch: {
    markers: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getLocations(newVal[Math.floor(Math.random() * newVal.length)]);
        }
      }
    }
  }
};
</script>

<style lang="scss">
// 地图
.bm-view {
  width: 100%;
  height: 400px;
  background: #000;
  position: relative;
}
.searchBox{
  position: absolute;
  right: 20px;
  top:10px;
  input{
    padding: 10px 8px;
    color: #ccc;
    font-size: 12px;
    border: 1px #ccc solid;
    border: none;
  }
  button{
    padding:8px 20px;
    background-color: red;
    color: #fff;
    cursor: pointer;
    border: none;
    margin-left: 4px;
  }
}
.BMap_stdMpSlider,
.BMap_zlHolder.hvr {
  display: none !important;
}
.BMap_stdMpZoom {
  position: fixed !important;
  bottom: 100px;
  top: auto !important;
  height: 60px !important;
}
.windowinfo{
  width: 150px;
  height: 20px;
  box-sizing: content-box;
  p{
    padding: 4px !important;
    margin: 0;
  }
}
.BMap_stdMpPan {
  display: none;
}
.BMap_stdMpZoomOut {
  top: 18px !important;
}
.BMap_cpyCtrl.BMap_noprint.anchorBL,
.anchorBL {
  display: none;
}
.BMapLabel {
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ccc !important;
  background: #fff !important;
  padding: 2px 5px !important;
}
.BMap_button.BMap_stdMpZoomIn {
  width: 30px !important;
  height: 30px !important;
  background: url("../../../public/image/jia.png") center center
    no-repeat !important;
  background-size: cover;
}
.BMap_button.BMap_stdMpZoomOut {
  width: 30px !important;
  height: 30px !important;
  top: 28px !important;
  background: url("../../../public/image/jian.png") center center
    no-repeat !important;
  background-size: 100%;
}
</style>