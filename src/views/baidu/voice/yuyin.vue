<template>
  <div class="content">
    <button type="primary" @click="getluy">录音</button>
    <button type="primary" @click="delluy">结束</button>
    <button type="primary" @click="statrluy">播放</button>
    <audio
      style="text-align: left"
      :src="current.src"
      :poster="current.poster"
      :name="current.name"
      :author="current.author"
      :action="audioAction"
      controls
    ></audio>
    <div>语音识别结果：{{takling}}</div>
  </div>
</template>

<script>
import Recorder from "js-audio-recorder"; //安装 npm install --save js-audio-recorder
import { getToken, getjson } from "../../../api/vice";
// import { Base64 } from 'base64-js'
//https://github.com/1260215278/recorder/blob/master/pages/index/index.vue
let recorder = new Recorder({
  sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
  sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
  numChannels: 1
});
export default {
  data() {
    return {
      current: {
        poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
        name: "致爱丽丝",
        author: "暂无",
        src: ""
      },
      takling: "",
      audioAction: {
        method: "pause"
      }
    };
  },
  onLoad() {},
  methods: {
    getluy() {
      recorder.start();
      // 回调持续输出时长
      // 更多的功能在文档上写了
      recorder.onprocess = function(duration) {
        console.log(duration);
      };
    },
    delluy() {
      recorder.stop();
    },
    statrluy() {
      var tant = this;
      recorder.flat();
      recorder.getPCM();
      var asa = recorder.getPCMBlob();
      var srca = recorder.getWAVBlob();
      // recorder.getPCMBlob();
      // recorder.getWAVBlob();
      this.current.src = URL.createObjectURL(srca);
      console.log(asa);
      var a = new FileReader();
      a.onload = function(e) {
        let data = {
          client_id: "3CIgaNgokIb3KK8lcXEYCgRU", //百度申请id
          client_secret: "saYDn5z0Dp5jDczbvT4UrMnefohfxFdf", //百度盛情secret
          grant_type: "client_credentials" //百度type固定值client_credentials
        };
        //调用语音接口获取token
        getToken(data).then(res => {
          console.log(res);
          let ip = returnCitySN["cip"].toString().replace(/\./g, "");
          // format	string	必填	语音文件的格式，pcm/wav/amr/(m4a仅支持极速版)。不区分大小写。推荐pcm文件
          // rate		采样率，16000，固定值
          // channel		声道数，仅支持单声道，请填写固定值 1
          // cuid		用户唯一标识，用来区分用户，计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内。
          // token
          let param = {
            rate: 16000,
            cuid: ip,
            channel: 1,
            token: res.data.access_token,
            format: "pcm",
            dev_pid: 1536,
            len: asa.size,
            speech: e.target.result.split(",")[1] //base64语音编码
          };
          //错误消息提示
          let err = {
            "3301": "	音频质量过差	请上传清晰的音频",
            "3302": "	鉴权失败",
            "3303": "百度服务器后端繁忙",
            "3304": "	用户的请求QPS超限",
            "3305": "	用户的日pv（日请求量）超限",
            "3307": "语音服务器后端识别出错问题",
            "3308": "	音频过长",
            "3309": "	音频数据问题",
            "3310": "	输入的音频文件过大 或len参数过大",
            "3311": "	采样率rate参数不在选项里",
            "3312": "	音频格式format参数不在选项里",
            "3313": "语音服务器解析超时",
            "3314": "	音频长度过短",
            "3315": "语音服务器处理超时",
            "3316": "	音频转为pcm失败"
          };
          //调用语音识别功能返回识别内容
          getjson(param).then(ress => {
            if (err[ress.data.err_no]) {
              return tant.$message.error(err[ress.data.err_no]);
            }
            console.log(ress.data);
            tant.takling = ress.data.result[0];
          });
        });
        //   console.log(e.target.result)
      };
      a.readAsDataURL(asa);
    }
  }
};
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>