import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    userName: '',
    dbIP: 'http://192.168.43.191:8081',
    messages: [],
  },
  mutations: {
    pushMessage(state, messagee) {
      state.messages.push(messagee);
      setInterval(5000,  () => {
        state.messages.shift()
      })
    }
  },
  actions: {
    login({state}, username) {
      state.userName = username;
      state.isLoggedIn = true;
    },
    logout({state}){
      state.isLoggedIn = false;
    },
    setDbIP({state}, ip){
      state.dbIP = ip;
    },
    pushMessage({commit}, message) {
      this.commit('pushMessage', message);
    }
    
  },
  modules: {},
});
