let clearSkyImg = require("../images/Sun.png");
let cloudyImg = require("../images/Frame 299.png");
let veryCloudyImg = require("../images/Group 307.png");
let rainImg = require("../images/Group 41.png");
let stormImg = require("../images/Group 297.png");
let snowImg = require("../images/Group 44.png");

const wc = {
  0: clearSkyImg.default.src,
  1: cloudyImg.default.src,
  2: cloudyImg.default.src,
  3: cloudyImg.default.src,
  45: veryCloudyImg.default.src,
  48: veryCloudyImg.default.src,
  51: stormImg.default.src,
  53: stormImg.default.src,
  55: stormImg.default.src,
  56: stormImg.default.src,
  57: stormImg.default.src,
  61: rainImg.default.src,
  63: rainImg.default.src,
  65: rainImg.default.src,
  66: rainImg.default.src,
  67: rainImg.default.src,
  71: snowImg.default.src,
  73: snowImg.default.src,
  75: snowImg.default.src,
  77: snowImg.default.src,
  80: rainImg.default.src,
  81: rainImg.default.src,
  82: rainImg.default.src,
  85: snowImg.default.src,
  86: snowImg.default.src,
  95: stormImg.default.src,
  96: stormImg.default.src,
  99: stormImg.default.src,
};

export default {
  wc,
};
