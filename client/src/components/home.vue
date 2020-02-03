<template>
  <v-container fluid pa-0 ma-0>
    <v-row id="firstlook">

     <p>{{fedToday}}</p>

    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console*/
import axios from 'axios';

export default {
  data() {
    return {
      fedToday: 0,
    };
  },
  methods: {
    fetchDucksFedToday() {
      axios.get('/api/fetchTodayDucks')
        .then(res => { 
          console.log(res);
          this.fedToday = res;
        })
        .catch(error => console.log(error))
    }
  },
  created() {
    this.fetchDucksFedToday();
  }

}
</script>

<style scoped>
#firstlook{
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: orange;}

</style>