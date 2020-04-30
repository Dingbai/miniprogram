
let md5 = require("md5");

module.exports = function getReSign(params, appkey) {
  const app_key = appkey;
  
  let str = "";

  let arr = Object.keys(params).sort((a, b) => a.localeCompare(b));
 
  arr.forEach((key) => {

    if (params[key] !== "") {
      str += key + "=" + encodeURIComponent(params[key]) + "&";
    }
  });
  str = str + "app_key=" + app_key;

  return md5(str).toLocaleUpperCase();
}