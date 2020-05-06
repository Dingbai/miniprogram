//index.js
let getReSign = require("../../utils/sign.js");
let { app_key, app_id } = require("../../utils/config.js");
let { map, targetMap } = require("./map.js");

Page({
  data: {
    target: [],
    destination: [],
    index: 0,
    i: 1,
    destinationValue: "",
    textContent: "",
    fn: () => {},
    detect: () => {},
    selectTargetValue: "zh",
    selectDestinationValue: "en",
    selectArr: [],
  },
  translate(e) {
    this.setData({
      textContent: e.detail.value,
    });
    this.data.fn && this.data.fn();
    this.data.detect && this.data.detect();
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
      text: this.data.textContent,
      source: this.data.selectTargetValue,
      target: this.data.selectDestinationValue,
      nonce_str: this.getRandom(),
      time_stamp: Date.parse(new Date()) / 1000,
    };
    let sign = getReSign(params, app_key);
    let obj = Object.assign(params, { sign });
    const that = this;
    wx.request({
      url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttranslate", //仅为示例，并非真实的接口地址
      data: {
        ...obj,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          destinationValue: res.data.data.target_text,
        });
      },
    });
  },
  getRandom() {
    const arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let str = "";
    for (let i = 0; i < 32; i++) {
      let index = Math.floor(Math.random() * 62);

      str += arr[index];
    }
    return str;
  },
  textDetect() {
    let params = {
      app_id,
      time_stamp: Date.parse(new Date()) / 1000,
      nonce_str: this.getRandom(),
      text: this.data.textContent,
      force: 1,
      candidate_langs: "zh|en|jp|kr",
    };
    let sign = getReSign(params, app_key);
    let obj = Object.assign(params, { sign });
    let that = this;
    wx.request({
      url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textdetect", //仅为示例，并非真实的接口地址
      data: {
        ...obj,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        for (let key in map) {
          if ((map[key] = res.data.data.lang)) {
            that.setData({
              index: that.data.selectArr.indexOf(map[key]),
            });
          }
        }
      },
    });
  },
  onReady() {
    this.setData({
      fn: this.debounce(this.request, 800),
      detect: this.debounce(this.textDetect, 800),
    });
  },
  onLoad() {
    let target = Object.keys(map);
    let arr = [];
    for (let key in map) {
      arr.push(map[key]);
    }
    this.setData({
      target,
      selectArr: arr,
    });
  },
  bindTargetPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      selectTargetValue: this.data.selectArr[e.detail.value],
    });
  },
  bindDestinationPickerChange: function (e) {
    this.setData({
      i: e.detail.value,
      selectDestinationValue: this.data.selectArr[e.detail.value],
    });
    this.request();
  },
});
