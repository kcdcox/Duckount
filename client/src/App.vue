<template>
  <v-app>
    <NavComponent/>
    <router-view></router-view>
    <FootComponent/>
  </v-app>
</template>

<script>
import NavComponent from './components/Nav/Nav.vue'
import FootComponent from './components/Nav/Foot.vue'

export default {
  name: 'App',
  components: {NavComponent, FootComponent},
  data: () => ({ }),
  created() {
    this.$store.dispatch('tryAutoLogin')
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=BenchNine:300|Baloo+Tammudu|Oswald}Open+Sans|Cabin:400,700|Quicksand:500,700|Bowlby+One|Amatic+SC|Lato:300,400,400italic,600,700|Roboto:400,500,700|Montserrat:100,200,400|Nunito:400,600,700|Raleway:300,400,500,600,700");
@import url("https://use.typekit.net/dzk8mgi.css");

/* ============COLOUR PALLETTE */
.d4Green{color: #134F2B;}
.d3Green{color: #005c1d;}
.d2Green{color: #4C7237;} 
.d1Green{color: #5daa58;}
.d0Green{color: #9abf72;}
.d0range{color: #ac6632;}
.d0Blue{color: #7ab2bc;}
.d0White{color: #e4e1e1;}
.d0Red{ color: #8D3D05}
/* ========================= */
.w100{width: 100%;}
a:link {text-decoration: none !important;}
.v-application a { color: inherit !important;}
li a{ text-decoration: none !important;}
.vButton{
  color: white !important;
  width: auto !important;
  font-size: calc(6px + 0.4vw) !important;
  padding: calc( 8px + 0.4vw) !important;
  height: auto !important;}
.lbl{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;}
.bgLab, .smLab{
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  opacity: 0.75;}
.bgLab{
  color: #e4e1e1;
  font-size: 30px;
  margin-top: 30px;} 

</style>