<template>
  <v-container fluid pa-0 ma-0 class="dashCont">

    <v-row id="firstlook">

      <div class="title text1 block">
        <h1 class="text1 fsH1">Actions</h1>
      </div>

      <div class="dash d-flex justify-start">

        <div class="toDo text1 d-flex justify-start align-start flex-column">
          <router-link to="/addFeeding" style="textDecoration: none !important;">
            <v-btn class="optionBut" raised large>
              Add Duck Feeding
              <v-icon :style="{marginLeft: '10px'}">mdi-call-made</v-icon>
            </v-btn>
          </router-link>
          <router-link to="/addFeeding" style="textDecoration: none !important;">
            <v-btn class="optionBut" raised large>
              Create Automated Feeding Schedule
              <v-icon :style="{marginLeft: '10px'}">mdi-call-made</v-icon>
            </v-btn>
          </router-link>
        </div>
      </div>

      <div class="title text1 block">
        <h1 class="text1 fsH1">Feeding History</h1>
      </div>

      <div>
          <v-data-table 
          class="dataTable elevation-1"
          :headers="headers"
          :items="myFeedings"
          light
          dense
          rows-per-page="All"
          multi-sort>
        </v-data-table>
      </div> 

      <div class="title text1 block">
        <h1 class="text1 fsH1">Your Stats</h1>
      </div>

      <div class="toDo d-flex justify-start flex-column">
        <p class="par">Total Feedings: {{totalFeedings}}</p>
        <p class="par">Total Ducks Fed: {{totalDucks}}</p>
        <p class="par">Total Food Fed: {{totalFood}}</p>
        <p class="par">Ducks Fed Per Feeding: {{totalDucks/totalFeedings}}</p>
      </div>
      

    </v-row>

  </v-container>
</template>

<script> 
/* eslint-disable no-console*/
import axios from 'axios';

export default {
  data () {
    return {
      totalDucks: 0,
      totalFeedings: 0,
      totalFood: 0,
      myFeedings: [],
      idToken: "",
      headers: [
        { text: 'Date',                 align: 'center', value: 'date' },
        { text: 'Time',                 align: 'center', value: 'time' },
        { text: 'Country',              align: 'center', value: 'country'  },
        { text: 'City',                 align: 'center', value: 'city'  },
        { text: 'State',                align: 'center', value: 'state' },
        { text: 'Number of Ducks',      align: 'center', value: 'duckNumber'},
        { text: 'Food Type',            align: 'center', value: 'foodType'},
        { text: 'Food Amount (grams)',  align: 'center', value: 'foodAmount' },
      ],
    }
  },
  methods: {
    fetchFeedings() {
      axios.get('/api/fetchFeedings', {
        headers:{
          Authorization: 'Bearer ' + this.idToken
        }})
        .then(res => { 
          console.log(res);
          this.myFeedings = res.data.feedings;
          this.getStats(res.data.feedings);
        })
        .catch(error => console.log(error))
    },
    getStats() {
      var i = 0;
      var food = 0;
      var ducks = 0;
      for(i in this.myFeedings){
        ducks+= this.myFeedings[i].duckNumber;
        food+= this.myFeedings[i].foodAmount;
      }
      this.totalDucks = ducks;
      this.totalFeedings = ++i;
      this.totalFood = food;
    }
  },
  created () { 
    this.idToken = this.$store.getters.token; 
    this.fetchFeedings();
  }
}
</script>

<style scoped>
.dashCont{
  position: relative;
  width: 100vw;
  height: auto;
  top: 0;
  left: 0;}
#firstlook{
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  align-content: center;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: auto;
  padding-bottom: 100px;
  padding-top: 160px;
  padding-left: 10vw;
  padding-right: 10vw;
  background-color:#5daa58;}
@media screen and (max-width: 700px) {.title{ align-self: center;}}
@media screen and (min-width: 701px) {.title{ align-self: flex-start;}}
.welcome{ font-size: 18px;}
.dash{
  position: relative;
  width: 100%;
  left: 0;
  flex-flow: row wrap;}
.toDo{
  left: 0;
  top: 0;
  position: relative;
  width: 100%;
  margin: 0px;
  margin-top: 30px;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #00000011;
  border: 3px inset #00000e33;
  border-radius: 10px;}
.optionBut{ 
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;}
.block{ display: block; position: relative;}
.text2{
  font-family: roboto, sans-serif;
  text-align: center;
  color: white;}
.text1{
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  text-align: center;
  padding-bottom: 10px;
  color: white;}
.fsH1{font-size: calc(30px + 2vw);}
.par{
  position: relative;
  display: block;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  color: white;
  padding-left: 20px;
  font-size: calc(12px + 1vw);
  overflow: hidden;
  width: 100%;}
.dataTable{
  margin-bottom: 50px;
}
</style>