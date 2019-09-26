import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        vitalsigns: []
    },
    mutations: {
        setVitalsigns(state, data) {
            state.vitalsigns.push(data);
        }
    },
    getters: {
        vitalsigns: state => state.vitalsigns
    },
    actions: {
        getVitalsigns({ commit }) {
            axios
                .get("https://nipa.herokuapp.com/api/vitalsign")
                .then(function (response) {
                    commit("setVitalsigns", response.data.data);                  
                });
        }
    }
});