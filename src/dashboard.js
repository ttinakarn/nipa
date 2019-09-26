import axios from "axios";

var vitalsigns = [];
var summary = [];
var alerted = [];
var normal = [];

export const data = {
    getVitalsign(){
    }
}
axios
    .get("https://nipa.herokuapp.com/api/vitalsign")
    .then(function (response) {
        this.vitalsigns = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
            if (
                i == 0 ||
                response.data.data[i].bednumber !=
                response.data.data[i - 1].bednumber
            ) {
                instance.summary.push(response.data.data[i]);
            }
        }
        for (var i = 0; i < instance.summary.length; i++) {
            for (var j = 0; j < instance.vitalsigns.length; j++) {
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].temp != null &&
                    instance.summary[i].temp == null
                ) {
                    instance.summary[i].temp = instance.vitalsigns[j].temp;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].pulse != null &&
                    instance.summary[i].pulse == null
                ) {
                    instance.summary[i].pulse = instance.vitalsigns[j].pulse;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].resp != null &&
                    instance.summary[i].resp == null
                ) {
                    instance.summary[i].resp = instance.vitalsigns[j].resp;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].sbp != null &&
                    instance.summary[i].sbp == null
                ) {
                    instance.summary[i].sbp = instance.vitalsigns[j].sbp;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].dbp != null &&
                    instance.summary[i].dbp == null
                ) {
                    instance.summary[i].dbp = instance.vitalsigns[j].dbp;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].o2sat != null &&
                    instance.summary[i].o2sat == null
                ) {
                    instance.summary[i].o2sat = instance.vitalsigns[j].o2sat;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].eye != null &&
                    instance.summary[i].eye == null
                ) {
                    instance.summary[i].eye = instance.vitalsigns[j].eye;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].verbal != null &&
                    instance.summary[i].verbal == null
                ) {
                    instance.summary[i].verbal = instance.vitalsigns[j].verbal;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].motor != null &&
                    instance.summary[i].motor == null
                ) {
                    instance.summary[i].motor = instance.vitalsigns[j].motor;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].urine != null &&
                    instance.summary[i].urine == null
                ) {
                    instance.summary[i].urine = instance.vitalsigns[j].urine;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].painscore != null &&
                    instance.summary[i].painscore == null
                ) {
                    instance.summary[i].painscore = instance.vitalsigns[j].painscore;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].fallrisk != null &&
                    instance.summary[i].fallrisk == null
                ) {
                    instance.summary[i].fallrisk = instance.vitalsigns[j].fallrisk;
                }
                if (
                    instance.summary[i].bednumber ==
                    instance.vitalsigns[j].bednumber &&
                    instance.vitalsigns[j].remark != null &&
                    instance.summary[i].remark == null
                ) {
                    instance.summary[i].remark = instance.vitalsigns[j].remark;
                }
            }
        }
        for (var i = 0; i < instance.summary.length; i++) {
            var zone = condition.checkCondition(
                instance.summary[i].temp,
                instance.summary[i].pulse,
                instance.summary[i].sbp,
                instance.summary[i].dbp,
                instance.summary[i].o2sat,
                instance.summary[i].eye,
                instance.summary[i].verbal,
                instance.summary[i].motor,
                instance.summary[i].urine,
                instance.summary[i].painscore,
                instance.summary[i].fallrisk
            );
            if (zone != "normal") {
                instance.alerted.push(instance.summary[i]);
            } else {
                instance.normal.push(instance.summary[i]);
            }
        }
    });