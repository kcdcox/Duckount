<template>
  <div class="nav-bar" 
    v-on:mouseleave="navup=true" 
    :style="{height: profileHover&&(profileHover&&auth) ? '180px':'100px'}">

    <router-link to="/" tag="div" class="logoCont d-flex align-center">
        <h1 class="duckTtl">DUCKOUNT</h1>
    </router-link>

    <!-- =====================================================RESPONSIVE SIGN-IN BUTTONS -->
    <div class="loginCont d-flex justify-center align-center">
      <router-link to="/signup">
        <v-btn id="loginBtn" class="vButton" raised v-if="!auth">Signup</v-btn>
      </router-link>
      <router-link to="/signin">
        <v-btn id="loginBtn" class="vButton" raised v-if="!auth">Login</v-btn>
      </router-link>
    </div>
    <!-- =======================================================DASHBOARD OPTIONS======== -->
    <router-link to="/dashboard">
      <v-btn 
        v-if="auth" 
        id="dashIcon" 
        large fab 
        @click="!profileHover"
        @mouseenter="profileHover=true">
          <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>

    <div class="profileOptions text1" 
      v-if="auth"
      @mouseleave="profileHover = false"
      ref="profileOptionz"
      :style="{visibility: (profileHover) ? '' : 'hidden'}">

      <div class="profileMenu">
        <p class="hello">Hello!</p>
      </div>

      <div class="profileMenu" >
        <router-link to="/dashboard">
          <p>Profile</p>
        </router-link>
      </div>

      <div class="profileMenu"
        @click="onLogout">
        <p>Logout</p>
      </div>
    </div>

  </div>
</template>
<!--======================================================================================================-->
<!--==========================================================================================SCRIPTS=====-->
<!--======================================================================================================-->
<script>
export default {
  name: "NavComponent",
  data() {
    return {
      profileHover: false,
    };
  },
  computed: { auth () { return this.$store.getters.isAuthenticated; },},
  methods: {  onLogout() { this.$store.dispatch('logout');},},
  created() { this.$store.dispatch('fetchUser');}
};
</script>
<!--=================================================================================-->
<!--=====================================================================STYLING=====-->
<!--=================================================================================-->
<style scoped>
.nav-bar{
  background: #FFA500EE;
  -webkit-transition: height 0.2s ease; 
  transition: height 0.2s ease;}
.loginCont{
  position: relative;
  width: 250px;
  height: 100px;
  left: calc(100vw - 250px);
  top: 0px;}
/* ======================================================================LOGGED IN!? - PROFILE  */
#loginBtn, #dashIcon {
  position: relative;
  background-color: #1691BC !important;
  margin: 10px;
  display: block;}
#loginBtn:hover{  background-color: black !important;}
#dashIcon{
  position: absolute;
  top: 5px;
  background-color: #1691BC;
  color: white;
  z-index: 10;
  display: block;
  right: 4vw;}
#dashIcon:hover{ background-color:#ac6632; color: white;}
/* ===================================================PROFILE OPTIONS */
.profileOptions{
  display: flex;
  position: absolute;
  flex-flow: column;
  justify-content: flex-start;
  width: auto;
  top: 15px;
  right: calc(4vw + 5px);
  opacity: 1;
  padding-right: 10px;
  padding-left: 4vw;
  padding-top: 80px;
  padding-bottom: 0px;
  margin: 0;
  -webkit-transition: height 0.2; /* Safari */
  transition:  height 0.2s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;}
.profileOptions:hover{  display: block;}
.text1{
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  color: white;}
.profileMenu{
  display: block;
  width: 100%;
  margin: 0;
  line-height: 0.6em;
  cursor: pointer;
  color: white;
  text-align: right;}
.profileMenu:hover{ color: #134F2B;}
.hello, .hello:hover{ color: white; text-shadow:  none;}
/* ======================================================================= */
.nav-bar {
  position: fixed;
  top: 0px;
  height: 120px;
  left: 0px;
  width: 100vw;
  z-index: 3000;
  margin: 0;}
/* ====================LOGO======= */
.logoCont{
  height: 100px;
  position: fixed;
  left: 3vw;
  z-index: 10;
  cursor: pointer;
  color: white;
  top: 0px;}
.logoCont:hover{ color: #134F2B;}
.duckTtl{
  text-align: center;
  line-height: 1.2em;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: calc(21px + 1vw);
  opacity: 0.9;
  margin: 0;
  padding: 0;}
</style>