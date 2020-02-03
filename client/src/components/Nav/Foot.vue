<template>
  <v-container fluid pa-0 ma-0 class="footer" id="contact">

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
  height: 140px;}
.lvl1{ height: 100px;}
.lbl{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;}
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

</style>