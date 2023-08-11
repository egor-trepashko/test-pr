import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fields: {
      price: null,
      amount: null,
      qty: null,
    },
    arrayEvents: [],
    nonce: 0,
    dataLocalStorage: ''
  },
  getters: {
    arrayEventReverse(state) {
      return [...state.arrayEvents].reverse();
    },
  },
  mutations: {
    addEvents(state, params) {
      state.arrayEvents.push(params);
    },
    changeFieldCalculate(state, { value, field }) {
      state.fields[field] = value;
    },
    changeNonce(state, value) {
      state.nonce = value;
    },
    saveLocalStorage(state, value) {
      state.dataLocalStorage = value;
    }
  },
  actions: {
    changeFieldCalculate({ commit }, { value, field }) {
      commit('changeFieldCalculate', { value, field })
    },
    addEvents({ commit }, params) {
      commit('addEvents', params)
    },
    getLocalStorage({ commit }) {
      commit('saveLocalStorage', localStorage.getItem("fieldsCalculate"))
    },
    async sendLocalStorage({state, commit, dispatch }) {
      function saveLocalStorage(data) {
        return new Promise((resolve) =>
          setTimeout(() => {
            let json = JSON.stringify(data);
            if (data.amount % 2 == 0) {
              localStorage.setItem("fieldsCalculate", JSON.stringify(json));
              resolve({ success: true });
            } else {
              resolve({ success: false });
            }
          }, 1000)
        );
      }
      commit('changeNonce', state.nonce + 1);
      let data = { ...this.fields, nonce: this.nonce };
      let response = await saveLocalStorage(data);
      dispatch('getLocalStorage');
      dispatch('addEvents',{ type: "button", key: "save",label: {
        sendValue: data,
        localStorage: this.DataLocalStorage,
        response,
      }})
    },
  },
  modules: {

  }
})
