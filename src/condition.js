import axios from "axios";

if (localStorage.getItem("condition") == null) {
  var instance = this;
  console.log("Retrieved data");
  axios
    .get("https://nipaapi.herokuapp.com/api/condition")
    .then(function (response) {
      console.log(response);
      localStorage.setItem("condition", JSON.stringify(response.data.data));
      console.log(localStorage.getItem("condition"));
      instance.con = JSON.parse(localStorage.getItem("condition"));
    });
}
export const condition = {
  getCondition() {
    return JSON.parse(localStorage.getItem("condition"));
  },
  checkCondition(temp,
    pulse,
    sbp,
    dbp,
    o2sat,
    eye,
    verbal,
    motor,
    urine,
    painscore,
    fallrisk) {
    var condition = JSON.parse(localStorage.getItem("condition"));
    if (
      temp >= condition[3].mintemp ||
      temp < condition[0].mintemp ||
      pulse >= condition[3].minpulse ||
      pulse < condition[0].minpulse ||
      sbp >= condition[3].minsbp ||
      sbp < condition[0].minsbp ||
      dbp >= condition[3].mindbp ||
      dbp < condition[0].mindbp ||
      o2sat <= condition[3].mino2sat ||
      eye <= condition[3].maxeye ||
      verbal <= condition[3].maxverbal ||
      motor <= condition[3].maxmotor ||
      urine <= condition[3].maxurine ||
      painscore >= condition[3].minpainscore ||
      fallrisk == condition[3].maxfallrisk
    ) {
      return "danger";
    } else if (
      (temp >= condition[2].mintemp &&
        temp <= condition[2].maxtemp) ||
      (pulse >= condition[2].minpulse &&
        pulse <= condition[2].maxpulse) ||
      ((sbp >= condition[2].minsbp || sbp <= condition[2].maxsbp) &&
        (dbp >= condition[2].mindbp ||
          dbp <= condition[2].maxdbp) &&
        o2sat < condition[2].mino2sat) ||
      eye == condition[2].maxeye ||
      verbal == condition[2].minverbal ||
      verbal == condition[2].maxverbal ||
      motor == condition[2].minmotor ||
      motor == condition[2].maxmotor ||
      urine <= condition[2].maxurine ||
      (painscore >= condition[2].minpainscore &&
        painscore <= conditon[2].maxpainscore) ||
      fallrisk == condition[2].minfallrisk ||
      fallrisk == condition[2].maxfallrisk
    ) {
      return "warning";
    } else {
      return "normal";
    }
  }
}