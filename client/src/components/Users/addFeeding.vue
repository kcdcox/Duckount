
<template>
  <v-container fluid pa-0 ma-0 class="feed d-flex justify-center align-start">

    <div class="formCont d-flex flex-column justify-start align-start">

      <div class="title text1 block">
        <h1 class="text1 fsH1">Add Feeding</h1>
      </div>

      <form ref="form" @submit.prevent="onSubmit"
        class="inputForm d-flex flex-column justify-start align-start">
        <!-- =================================COUNTRY -->
        <div class="form-group d-flex flex-column justify-start align-start"
          :class="{invalid: $v.country.$error}">
          <label for="country">Country*</label>
          <input
                  type="text"
                  id="country"
                  class="form-control"
                  @blur="$v.country.$touch()"
                  v-model="country">

        </div>
        <!-- =================================STATE -->
        <div class="form-group d-flex flex-column justify-start align-start"
          :class="{invalid: $v.state.$error}">
          <label for="state">State*</label>
          <input
                  type="text"
                  id="state"
                  class="form-control"
                  @blur="$v.state.$touch()"
                  v-model="state">
        </div>
        <!-- =================================CITY -->
        <div class="form-group  d-flex flex-column justify-start align-start"
          :class="{invalid: $v.city.$error}">
          <label for="city">City*</label>
          <input
                  type="text"
                  id="city"
                  class="form-control"
                  @blur="$v.city.$touch()"
                  v-model="city">
        </div>
        <!-- =================================PARK -->
        <div class="form-group  d-flex flex-column justify-start align-start">
          <label for="park">Park</label>
          <input
                  type="text"
                  id="park"
                  class="form-control"
                  v-model="park">
        </div>
        <!-- =================================DATE -->
        <div class="form-group d-flex flex-column justify-start align-start"
          :class="{invalid: $v.dateTime.$error}">
          <label for="datetime-local">Date*</label>
          <input
                  type="datetime-local"
                  id="dateTime"
                  class="form-control"
                  @blur="$v.dateTime.$touch()"
                  v-model="dateTime">
        </div>
        <!-- =================================DUCKNUM -->
        <div class="form-group d-flex flex-column justify-start align-start"
          :class="{invalid: $v.duckNumber.$error}">
          <label for="duckNumber">Number of Ducks Fed*</label>
          <input
                  type="number"
                  id="duckNumber"
                  class="form-control"
                  @blur="$v.duckNumber.$touch()"
                  v-model="duckNumber">
          <p class="warner" v-if="!$v.duckNumber.integer">Please enter an integer.</p>
        </div>
        <!-- =================================FOODTYPE -->
        <div class="form-group d-flex flex-column justify-start align-start">
          <label for="foodType">Type of Food Fed</label>
          <div class="clari">( ex. seeds, birdseed, corn, oats, rice etc.)</div>
          <input
                  type="text"
                  id="foodType"
                  class="form-control"
                  v-model="foodType">
        </div>
        <!-- =================================FOODAMOUNT -->
        <div class="form-group d-flex flex-column justify-start align-start"
          :class="{invalid: $v.foodAmount.$error}">
          <label for="foodAmount">How Much Food Did you Feed the Ducks? (grams)</label>
          <input
                  type="number"
                  id="foodAmount"
                  class="form-control"
                  @blur="$v.foodAmount.$touch()"
                  v-model="foodAmount">
          <p class="warner" v-if="!$v.foodAmount.numeric">Please enter a number.</p>
        </div>
        <!-- =================================SUBMIT -->
        <div class="submit d-flex justify-center align-center" for="submit">
          <button class="suBut" type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
          
      </form>


    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
const moment = require('moment');
import {required, integer, numeric} from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        country: "",
        city: "",
        state: "",
        park: "",
        duckNumber: 1,
        dateTime: "",
        foodType: "",
        foodAmount: 0,
      }
    },
    validations: {
      country:        { required },
      city:           { required },
      state:          { required },
      duckNumber:     { required, integer},
      dateTime:       { required },
      foodAmount:     { numeric }
    },
    methods: {
      onSubmit() {
        var parseDate = moment(this.dateTime, moment.HTML5_FMT.DATETIME_LOCAL).format("MMM D, YYYY");
        var parseTime = moment(this.dateTime, moment.HTML5_FMT.DATETIME_LOCAL).format("h:mm a");

        const formData = {
          country: this.country,
          city: this.city,
          state: this.state,
          park: this.park,
          dateTime: this.dateTime,
          date: parseDate,
          time: parseTime,
          duckNumber: this.duckNumber,
          foodType: this.foodType,
          foodAmount: this.foodAmount
        }
        console.log(formData);
        this.$store.dispatch('addFeeding', formData);
      },
    }
  }
</script>

<style scoped>
.feed{
  background: orange;
  height: auto;}
.formCont{
  padding-top: 200px;
  padding-bottom: 200px;
  position: relative;
  width: 90vw;
  left: 0;
  max-width: 500px;
  height: auto;}
.addFeeding{
  width: 100%;}
.text1{
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  text-align: center;
  font-size: 50px;
  padding-bottom: 10px;
  color: white;}
.inputForm{
  position: relative;
  width: 100%;
  font-size: 16px;
  background: white;
  padding-top: 10px;
  border-radius: 15px;}
.form-group{
  position: relative;
  width: 100%;
  padding: 10px 30px;}
label{
  padding: 3px 0px;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;}
.clari{ padding: 0px 0px 3px 4px;}
.form-control{
  border: 1px solid grey;
  border-radius: 3px;
  padding: 2px;
  font-size: 16px;
  padding-left: 10px;
  height: 40px;
  width: 100%}
.submit{
  height: 100px;
  width: 100%;}
.suBut{
  background: #1691BC;
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 200;
  font-size: 24px;
  z-index: 100;
  cursor: pointer;
}
.input.invalid label{ color: red !important; }
.invalid{ color: red !important; }
.input.invalid input{
  padding: 10px 12px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 2px solid red;
  background-color:  #E6BEC3;}
.warner{ color: #C879A9;}
.submit button:hover,
.submit button:active {
  background-color: #5daa58;
  color: white;}
.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: grey;
  cursor: not-allowed;}

</style>
