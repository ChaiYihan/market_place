import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    userName: '',
    passWord: '',
    dbIP: 'http://192.168.1.112:8081',
    dbIP2: 'http://192.168.1.112:8081',
    messages: [],
    shiftState: false,
    balance: 0,
    exp: 0,
    id: 0,
    accessLevel: 0,
    isBlocked: false,
    timer: null,
  },
  mutations: {
    shiftMessage(state) {
      if(state.shiftState==false && state.messages.length>0){
        state.shiftState = true;
        state.timer = setInterval(() => {
          state.messages.shift()
          console.log('shift');
          if(state.messages.length==0){
            clearInterval(state.timer);
            state.shiftState = false;
          }
        }, 5000);
      }
    }
  },
  actions: {
    login({state}, res) {
      state.balance = res.user.sanity;
      state.id = res.user.id;
      state.userName = res.user.username;
      state.passWord = res.user.password;
      state.accessLevel = res.user.accessLevel;
      state.exp = res.user.exp;
      state.isBlocked = res.user.isBlocked;
      state.isLoggedIn = true;
      if(state.exp==null) state.exp=0;
      if(state.balance==null) state.balance=0;
      this.dispatch('pushMessage', 'Welcome back, '+state.userName+'.');
    },
    logout({state}){
      state.isLoggedIn = false;
      this.dispatch('pushMessage', 'See you, '+state.userName+'.');
    },
    setDbIP({state}, ip){
      state.dbIP = ip;
    },
    pushMessage({state}, message) {
      state.messages.push(message);
      this.commit('shiftMessage');
    },
    shiftMessage({commit}){
      this.commit('shiftMessage');
    },  
    setBalance({state}, num){
      state.balance = num;
    },
  },
  modules: {},
});
