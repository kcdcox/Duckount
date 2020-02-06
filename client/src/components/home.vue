<template>
  <v-container fluid pa-0 ma-0 id="firstlook">

    <div class="statsCont">
     <p class="hmTxt" style="font-size: 250px; line-height: 180px;">{{fedToday}}</p>
     <p class="hmTxt" style="font-size: 25px; line-height: 30px;">Ducks have been fed</p>
     <p class="hmTxt" style="font-size: 85px; line-height: 70px;">TODAY</p>
     <p class="hmTxt" style="font-size: 16px; line-height: 20px;">{{foodToday}} grams of food over</p>
     <p class="hmTxt" style="font-size: 16px; line-height: 20px;">{{feedingsToday}} feedings.</p>
      <p class="hmTxt" style="font-size: 16px; line-height: 20px;">{{data}} feedings.</p>

    </div>

  </v-container>
</template>

<script>
/* eslint-disable no-console*/
import axios from 'axios';

export default {
  data() {
    return {
      fedToday: 0,
      foodToday: 0,
      feedingsToday: 0,
      data: []
    };
  },
  methods: {
    fetchTodayDucks() {
      axios.get('/api/fetchAllDucks')
        .then(res => { 
          this.fedToday = res.data.totalFed;
          this.foodToday = res.data.totalFood;
          this.feedingsToday = res.data.i;
          this.data = res.data;
        })
        .catch(error => console.log(error))
    },
  },
  created() {
    this.fetchTodayDucks();
  }

}
</script>

<style scoped>
#firstlook{
  position: relative;
  top: 0;
  left: 0px;
  width: 100vw;
  height: auto;
  height: calc(100vh - 140px);
  min-height: 600px;
  background-color: orange;}
.statsCont{
  position: relative;
  top: 140px;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  text-align: center;
  color: white;
  padding-bottom: 100px;}
.statNum{
  font-size: calc(30px + 4vw);
  line-height: calc(30px + 4vw);}
.hmTxt{
  padding: 0;
  margin: 0;}

</style>