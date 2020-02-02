<template>
  <div class="nav-bar" 
    v-on:mouseleave="navup=true" 
    :style="{height: (navup) ? '120px':'360px'}">

    <router-link to="/" tag="div" class="logoCont" :style="{left: hamout ? 'calc(50% - 60px)':'40px'}">
        <h1 class="everTtl">DUCKOUNT</h1>
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
      :style="{visibility: (profileHover) ? '' : 'hidden', height: profileHeight + 'px'}">

      <div class="profileMenu">
        <p class="hello">Hi, {{firstName}}!</p>
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
      windowWidth: 0,
      hamout: false,
      navup: true,
      profileHover: false,
      profileHeight: '',
      navBack: false
    };
  },
  watch: {
    windowWidth() {
      if(this.windowWidth < 1100){
        this.hamout = true;
      } else {
        this.hamout = false;
        this.navup = true;
      }
    },
    profileHover() {
      if(this.profileHover == true){
        this.calcProfileHeight();
      } else {
        this.treeWidth = '0';
        this.profileHeight = '0';
      }
    }
  },
  computed: {
    navLinks() {
      if (!this.hamout) {
        return "inline-block";
      } else if (this.hamout && this.navup) {
        return "none";
      } else {
        return "block";
      }
    },
    auth () { return this.$store.getters.isAuthenticated; },
    firstName() {return !this.$store.getters.user ? false : this.$store.getters.user.firstName;}
  },
  methods: {
    handleResize() { this.windowWidth = window.innerWidth;},
    onLogout() { this.$store.dispatch('logout');},
    calcProfileHeight() { this.profileHeight = this.$refs.profileOptionz.clientWidth * 1.5;},
    scrollPos() { window.scrollY > 200 ? this.navBack = true : this.navBack = false;}
  },
  mounted() {
    window.addEventListener('scroll', this.scrollPos);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.$store.dispatch('fetchUser');
    this.handleResize();
    
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<!--=================================================================================-->
<!--=====================================================================STYLING=====-->
<!--=================================================================================-->

<style scoped>
.loginCont{
  position: relative;
  width: 250px;
  height: 80px;
  left: calc(100vw - 250px);
  top: 00px;
  /* background: blue; */
}
/* ======================================================================LOGGED IN!? - PROFILE  */
#loginBtn, #dashIcon {
  position: relative;
  background-color: #1691BC !important;
  margin: 10px;
  display: block;}
#loginBtn:hover{  background-color: black !important;}
#dashIcon{
  position: absolute;
  top: 25px;
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
  /* overflow:hidden; */
  flex-flow: column;
  justify-content: flex-start;
  width: auto;
  top: 33px;
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
.profileOptions:hover{
  display: block;}
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
  position: fixed;
  z-index: 10;
  cursor: pointer;
  color: white;
  top: 16px;}
.logoCont:hover{ color: #134F2B;}
.everTtl{
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