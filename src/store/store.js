import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        updated: false,
        bednumber: 12,
        i: 'temp'
    },
    mutations: {
        setUpdated(state, data){
            state.updated = data
        }
    },
    getters: {
        getUpdated: state=>state.updated
    }
});