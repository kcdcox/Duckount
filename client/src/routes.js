import Vue from 'vue';
import VueRouter from 'vue-router'

import store from './store'

import HomeComponent from './components/home.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import Dashboard from './components/Users/Dashboard.vue'
import Feeding from './components/Users/addFeeding.vue'
import Schedule from './components/Users/addSched.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomeComponent},
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { path: '/dashboard', component: Dashboard, 
        beforeEnter(to, from, next) {
            if(store.state.idToken){ next();
            } else {  next('/');}
        }
    }, 
    { path: '/addFeeding', component: Feeding,
        beforeEnter(to, from, next) {
            if(store.state.idToken){ next();
            } else {  next('/');}
        }
    },
    { path: '/addSched', component: Schedule,
        beforeEnter(to, from, next) {
            if(store.state.idToken){ next();
            } else {  next('/');}
        }
    },
];

export default new VueRouter({
    mode: 'history', 
    routes, 
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition){ return savedPosition;}
        if(to.hash){ return { selector: to.hash };}
        return {x: 0, y: 0};
    }
})