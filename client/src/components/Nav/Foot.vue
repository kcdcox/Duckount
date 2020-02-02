<template>
  <v-container fluid pa-0 ma-0 class="footer" id="contact">

    <div id="evergreenBottom"></div>

    <v-row pa-0 ma-0 class="lvl1">
      <div class="lbl">
        <h1 class="bgLab">DUCKOUNT</h1>
      </div>
    </v-row>


    <v-row class="logoBox">
			<h3 class="copyright">
				Kevin Cox Web Development &#169; 2019
			</h3>
		</v-row>

  </v-container>
</template>
//====================================================================================SCRIPT
<script>
export default {

}
</script>
//====================================================================================STYLE
<style scoped>
.footer{
  position: relative;
  background-color: #1691BC;
  width: 100vw;
  left: 0;
  top: 0;
  height: auto;
  min-height: calc(100px + 10vh);}
.lvl1{ height: 100px;}
.lvl2{ top: 0; height: auto; padding-bottom: 70px;}
.email:hover{
  color: #8D3D05;
  font-weight: 700;}
.bgLab{
  font-size: calc(20px + 1vw) !important;
  padding-bottom: 4vh !important;
}
.lbl{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;}
.infoLab{
  font-family: 'Cabin', sans-serif;
  text-decoration: none !important;
  font-weight: 400;
  display: block;
  font-size: calc(10px + 0.7vw);
  color: #e4e1e1;
  line-height: 1.1em;
  text-align: center;}
.smLab{
  font-size: calc(20px + 2vw);
  font-weight: bold !important;
  line-height: 1em;
  font-family: 'Amatic SC' !important;
  color: #134F2B;
  margin-bottom: 3vh;}
.logoBox{
  position: absolute;
  bottom: 0px;
  padding-bottom: 20px;
  margin-top: 40px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;}
.copyright{
  font-family: montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  bottom: 20px;
  color: #134F2B;
  text-align: center; 
  padding-bottom: 10px;}
  .email{ line-height: 1.5em;}
  #evergreenBottom{
    position: absolute;
    width: 100vw;
    top: -30vh;
    left: 0;
    height: 30vh;

    background-repeat: repeat-x;}
</style>