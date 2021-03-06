let map = {
  中文: "zh",
  英文: "en",
  日文: "jp",
  韩文: "kr",
  法文: "fr",
  西班牙文: "es",
  意大利文: "it",
  德文: "de",
  土耳其: "tr",
  俄文: "ru",
  葡萄牙文: "pt",
  越南文: "vi",
  印度尼西亚文: "id",
  马来西亚文: "ms",
  泰文: "th",
  自动识别: "auto",
};
let targetMap = {
  en: ["zh", "fr", "es", "it", "de", "tr", "ru", "pt", "vi", "id", "ms", "th"],
  zh: [
    "en",
    "fr",
    "es",
    "it",
    "de",
    "tr",
    "ru",
    "pt",
    "vi",
    "id",
    "ms",
    "th",
    "jp",
    "kr",
  ],
  fr: ["en", "zh", "es", "it", "de", "tr", "ru", "pt"],
  es: ["en", "zh", "fr", "it", "de", "tr", "ru", "pt"],
  it: ["en", "zh", "fr", "es", "de", "tr", "ru", "pt"],
  de: ["en", "zh", "fr", "es", "it", "tr", "ru", "pt"],
  tr: ["en", "zh", "fr", "es", "it", "de", "ru", "pt"],
  ru: ["en", "zh", "fr", "es", "it", "de", "tr", "pt"],
  pt: ["en", "zh", "fr", "es", "it", "de", "tr", "ru"],
  vi: ["en", "zh"],
  id: ["en", "zh"],
  ms: ["en", "zh"],
  th: ["en", "zh"],
  jp: ["zh"],
  kr: ["zh"],
};
module.exports = {
  map,
  targetMap,
};
