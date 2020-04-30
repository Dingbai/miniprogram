//index.js
let getReSign = require("../../utils/sign.js");
let { app_key, app_id } = require("../../utils/config.js");
let { map, targetMap } = require("./map.js");

Page({
  data: {
    target: ["美国", "中国", "巴西", "日本"],
    destination: ["美国", "中国", "巴西", "日本"],
    index: 0,
    destinationValue: "",
    content: "",
    fn: () => {},
  },
  translate(e) {
    this.setData({
      content: e.detail.value,
    });
    this.data.fn && this.data.fn();
  },
  debounce(fn, time = 500) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, time);
    };
  },
  request() {
    let params = {
      app_id,
      text: this.data.content,
      source: "zh",
      target: "en",
      nonce_str: "1af467541d482af8964daf803fbcf06b",
      time_stamp: Date.parse(new Date()) / 1000,
    };
    let sign = getReSign(params, app_key);
    let obj = Object.assign(params, { sign });
    wx.request({
      url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttranslate", //仅为示例，并非真实的接口地址
      data: {
        ...obj,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        console.log(res.data);
      },
    });
  },
  onReady() {
    this.setData({
      fn: this.debounce(this.request, 800),
    });
  },
  onLoad() {
    let target = Object.keys(map);
    this.setData({
      target:map,
    });
  },
  bindPickerChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
});

// function debounce(fn, delay) {
//   let timer = null;
//   return function () {
//     clearTimeout(timer);
//     let timer = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, delay);
//   };
// }
