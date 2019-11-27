import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        vs: [],
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
        submitstatus: null,
        submitstatustemp: null,
        submitstatuspulse: null,
        submitstatusresp: null,
        submitstatussbp: null,
        submitstatusdbp: null,
        submitstatuso2sat: null,
        submitstatuseye: null,
        submitstatusverbal: null,
        submitstatusmotor: null,
        submitstatusurine: null,
        submitstatuspainscore: null,
        sosscore: 0,
        sostemp: 0,
        sospulse: 0,
        sosresp: 0,
        sossbp: 0
    },
    mutations: {
        setvs(state, data){
            state.vs = data
        },
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
        },
        setsubmitstatustemp(state, data){
            state.submitstatustemp = data
        },
        setsubmitstatuspulse(state, data){
            state.submitstatuspulse = data
        },
        setsubmitstatusresp(state, data){
            state.submitstatusresp = data
        },
        setsubmitstatussbp(state, data){
            state.submitstatussbp = data
        },
        setsubmitstatusdbp(state, data){
            state.submitstatusdbp = data
        },
        setsubmitstatuso2sat(state, data){
            state.submitstatuso2sat = data
        },
        setsubmitstatuseye(state, data){
            state.submitstatuseye = data
        },
        setsubmitstatusverbal(state, data){
            state.submitstatusverbal = data
        },
        setsubmitstatusmotor(state, data){
            state.submitstatusmotor = data
        },
        setsubmitstatusurine(state, data){
            state.submitstatusurine = data
        },
        setsubmitstatuspainscore(state, data){
            state.submitstatuspainscore = data
        },
        setsosscore(state, data){
            state.sosscore = data
        },
        setsostemp(state, data){
            state.sostemp = data
        },
        setsospulse(state, data){
            state.sospulse = data
        },
        setsosresp(state, data){
            state.sosresp = data
        },
        setsossbp(state, data){
            state.sossbp = data
        }
    },
    getters: {
        vs: state=>state.vs,
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
        submitstatus: state=>state.submitstatus,
        submitstatustemp: state=>state.submitstatustemp,
        submitstatuspulse: state=>state.submitstatuspulse,
        submitstatusresp: state=>state.submitstatusresp,
        submitstatussbp: state=>state.submitstatussbp,
        submitstatusdbp: state=>state.submitstatusdbp,
        submitstatuso2sat: state=>state.submitstatuso2sat,
        submitstatuseye: state=>state.submitstatuseye,
        submitstatusverbal: state=>state.submitstatusverbal,
        submitstatusmotor: state=>state.submitstatusmotor,
        submitstatusurine: state=>state.submitstatusurine,
        submitstatuspainscore: state=>state.submitstatuspainscore,
        sosscore: state=>state.sosscore,
        sostemp: state=>state.sostemp,
        sospulse: state=>state.sospulse,
        sosresp: state=>state.sosresp,
        sossbp: state=>state.sossbp
    }
});