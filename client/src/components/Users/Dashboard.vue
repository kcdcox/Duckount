<template>
  <v-container fluid pa-0 ma-0>

      <v-row id="firstlook">

        <div class="title text1 block">
          <h1 class="text1 fsH1">Dashboard</h1>
        </div>

        <div class="dash">

          <div class="toDo text1">
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

        <div>
          <p class="par">{{idToken}}</p>
           <v-data-table 
            class="dataTable elevation-1"
            :headers="headers"
            :items="myFeedings"
            light
            dense
            calculate-widths
            rows-per-page="All"
            multi-sort>
          </v-data-table>
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
        })
        .catch(error => console.log(error))
    }
  },
  created () { 
    this.idToken = this.$store.getters.token; 
    this.fetchFeedings();
  }
}
</script>

<style scoped>
#firstlook{
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  align-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  padding-bottom: 500px;
  padding-top: 160px;
  padding-left: 10vw;
  padding-right: 10vw;
  background-color:#5daa58;}
@media screen and (max-width: 700px) {.title{ align-self: center;}}
@media screen and (min-width: 701px) {.title{ align-self: flex-start;}}
.welcome{ font-size: 18px;}
.dash{
  position: relative;
  display: flex;
  flex-flow: row wrap;}
.toDo, .complete{
  display: block;
  width: 400px;
  margin: 50px;
  padding-top: 20px;
  background-color: #00000011;
  border: 3px inset #00000e33;
  border-radius: 10px;}
.optionBut{ 
  margin-top: 20px;
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
.fsH1{font-size: 50px;}
.par{
  position: relative;
  display: block;
  overflow: hidden;
  width: 800px;
}
.search-location {
  display: block;
  width: 60vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
</style>