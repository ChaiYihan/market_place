import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    userName: '',
    dbIP: 'http://192.168.43.191:8081',
    messages: [],
    shiftState: false,
  },
  mutations: {
    shiftMessage(state) {
      if(state.shiftState==false) setInterval(() => {
        state.messages.shift()
        console.log('shift');
        state.shiftState=true;
      }, 5000);
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
    pushMessage({state}, message) {
      state.messages.push(message);
    },
    shiftMessage({commit}){
      this.commit('shiftMessage');
    },    
  },
  modules: {},
});
