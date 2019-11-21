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
    });
}

export const condition = {
  getCondition() {
    return JSON.parse(localStorage.getItem("condition"));
  },
  checkCondition(temp,
    pulse,
    resp,
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
      resp > condition[3].minresp ||
      resp <= condition[3].maxresp ||
      sbp >= condition[3].minsbp ||
      sbp < condition[0].minsbp ||
      dbp >= condition[3].mindbp ||
      dbp < condition[0].mindbp ||
      o2sat <= condition[3].mino2sat ||
      o2sat > condition[0].maxo2sat ||
      eye <= condition[3].maxeye ||
      eye > condition[0].maxeye ||
      verbal <= condition[3].maxverbal ||
      verbal > condition[0].maxverbal ||
      motor <= condition[3].maxmotor ||
      motor > condition[0].minmotor ||
      urine < condition[3].maxurine ||
      painscore >= condition[3].minpainscore ||
      fallrisk > condition[3].minfallrisk
    ) {
      return "danger";
    } else if (
      (temp >= condition[1].mintemp &&
        temp <= condition[1].maxtemp) ||
      (pulse >= condition[1].minpulse &&
        pulse <= condition[1].maxpulse) ||
      ((resp >= condition[1].minresp &&
        resp <= condition[1].maxresp) ||
        (resp >= condition[2].minresp &&
          resp <= condition[2].maxresp)) ||
      ((sbp >= condition[1].minsbp &&
        sbp <= condition[1].maxsbp) ||
        (dbp >= condition[1].mindbp &&
          dbp <= condition[1].maxdbp)) ||
      (o2sat >= condition[1].mino2sat &&
        o2sat <= condition[1].maxo2sat) ||
      (eye >= condition[1].mineye &&
        eye <= condition[1].maxeye) ||
      (verbal >= condition[1].minverbal &&
        verbal <= condition[1].maxverbal) ||
      (motor >= condition[1].minmotor &&
        motor <= condition[1].maxmotor) ||
      (urine >= condition[1].minurine &&
        urine <= condition[1].maxurine) ||
      (painscore >= condition[1].minpainscore &&
        painscore <= condition[1].maxpainscore) ||
      (fallrisk >= condition[1].minfallrisk &&
        fallrisk <= condition[1].maxfallrisk)
    ) {
      return "warning";
    } else {
      return "normal";
    }
  }
}