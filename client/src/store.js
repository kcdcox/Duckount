/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './routes'
const moment = require('moment');

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    idToken: null,
    userId: null,
    user: null,
  },
  mutations:{
    authUser (state, userData){
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user;
    },
    clearAuthData (state) {
      state.idToken = null;
      state.userId = null;
    }
  }, 
  actions: {
    signup ({commit, dispatch}, authData) {
      axios.post('/api/signup', authData)
        .then(res => {
          commit( 'authUser', {
            token: res.data.token,
            userId: res.data.userId
          })
          const expirationDate = moment() + 3600000;
          dispatch('setLogoutTimer', 3600000);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('expirationDate', expirationDate);
          router.replace('/dashboard');
        })
        .catch(error => console.log(error))
    },
    signin({commit, dispatch}, authData) {
      axios.post('api/login', authData)
        .then(res => {
          commit( 'authUser', {
            token: res.data.token,
            userId: res.data.userId
          });
          var expirationDate = moment() + 3600000;
          dispatch('setLogoutTimer', 3600000);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('expirationDate', expirationDate);
          router.push('/dashboard');
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin({commit, dispatch}) { //on re-load
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if(!token) { return } //dont login if already logged out
      const expirationDate = localStorage.getItem('expirationDate');
      const now = moment(); //logout if expired 
      if(now >= expirationDate){ return dispatch('logout')} 
      dispatch('setLogoutTimer', expirationDate - now);
      commit('authUser', {
        token: token,
        userId: userId
      });
    },
    logout({commit}) { 
      commit('clearAuthData'); 
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.replace('/signin');
    },
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData');
      }, expirationTime);
    },
    fetchUser ({commit, state}) {
      if (!state.idToken){ return}
      axios.get('/api/fetchUser', {
        headers:{ Authorization: 'Bearer ' + state.idToken }})
        .then(res => { console.log(res.data); commit('storeUser', res.data)})
        .catch(error => console.log(error))
    },
    addFeeding({state}, formData){
      if (!state.idToken){ return}
      axios({
          method: 'POST',
          url: '/api/addFeeding',
          headers: {Authorization: 'Bearer ' + state.idToken},
          data: formData
        })
        .catch(error => console.log(error))
        router.replace('/dashboard');
    },
    fetchTodayDucks(){
      axios.get('/api/fetchTodayDucks')
        .then(res => { 
          console.log(res);
          this.fedToday = res;
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) { return state.user;},
    token (state) {return state.idToken;},
    isAuthenticated (state) { return state.idToken !== null ;}
 }
});