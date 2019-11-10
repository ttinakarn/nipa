import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // updated: false,
        bednumber: 0,
        temp: false,
        pulse: false,
        resp: false,
        sbp: false,
        dbp: false,
        o2sat: false,
        eye: false,
        verbal: false,
        motor: false,
        urine: false,
        painscore: false,
        fallrisk: false,
        remark: false,
        submitstatus: null
    },
    mutations: {
        setbednumber(state, data){
            state.bednumber = data
        },
        settemp(state, data){
            state.temp = data
        },
        setpulse(state, data){
            state.pulse = data
        },
        setresp(state, data){
            state.resp = data
        },
        setsbp(state, data){
            state.sbp = data
        },
        setdbp(state, data){
            state.dbp = data
        },
        seto2sat(state, data){
            state.o2sat = data
        },
        seteye(state, data){
            state.eye = data
        },
        setverbal(state, data){
            state.verbal = data
        },
        setmotor(state, data){
            state.motor = data
        },
        seturine(state, data){
            state.urine = data
        },
        setpainscore(state, data){
            state.painscore = data
        },
        setfallrisk(state, data){
            state.fallrisk = data
        },
        setremark(state, data){
            state.remark = data
        },
        setsubmitstatus(state, data){
            state.submitstatus = data
        }
    },
    getters: {
        // updated: state=>status.updated,
        bednumber: state=>state.bednumber,
        temp: state=>state.temp,
        pulse: state=>state.pulse,
        resp: state=>state.resp,
        sbp: state=>state.sbp,
        dbp: state=>state.dbp,
        o2sat: state=>state.o2sat,
        eye: state=>state.eye,
        verbal: state=>state.verbal,
        motor: state=>state.motor,
        urine: state=>state.urine,
        painscore: state=>state.painscore,
        fallrisk: state=>state.fallrisk,
        remark: state=>state.remark,
        submitstatus: state=>state.submitstatus
    }
});