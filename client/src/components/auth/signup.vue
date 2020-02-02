<template>
  <v-container fluid ma-0 pa-0>

    <v-row class="sInRow">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="signinLab">
              <h1>Sign Up</h1>
          </div>
          <div class="orange-line"></div>
          <div class="input" :class="{invalid: $v.firstName.$error}">
            <label for="firstName">First Name</label>
            <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    @blur="$v.firstName.$touch()"
                    v-model="firstName">
            <p class="warner" v-if="!$v.firstName.alpha">Please enter a valid name.</p>
          </div>
          <div class="input" :class="{invalid: $v.lastName.$error}">
            <label for="lastName">Last Name</label>
            <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    @blur="$v.lastName.$touch()"
                    v-model="lastName">
            <p class="warner" v-if="!$v.lastName.alpha">Please enter a valid name.</p>
          </div>
          <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">Email</label>
            <input
                    type="email"
                    id="email"
                    name="email"
                    @blur="$v.email.$touch()"
                    v-model="email">
            <p class="warner" v-if="!$v.email.unique">That email has already been used!</p>
            <p class="warner" v-if="!$v.email.email">Invalid Email</p>
          </div>
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">Password</label>
            <input
                    type="password"
                    name="password"
                    id="password"
                    @blur="$v.password.$touch()"
                    v-model="password">
            <p class="warner" v-if="!$v.password.minLen">Must be at least {{$v.password.$params.minLen.min}} characters long.</p>
          </div>
          <div class="input" :class="{invalid: $v.confirmPassword.$error}">
            <label for="confirmPassword">Confirm Password</label>
            <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    @blur="$v.confirmPassword.$touch()"
                    v-model="confirmPassword">
            <p class="warner" v-if="!$v.confirmPassword.sameAs">Passwords do not match.</p>
          </div>
          <div class="input inline" :class="{invalid: !$v.checkbox.$model}">
            <input 
                    type="checkbox" 
                    class="checkbox"
                    id="checkbox" 
                    @blur="$v.checkbox.$touch()"
                    v-model="checkbox">
            
            <label for="terms" class="accept" >Accept Terms of Use</label>
          </div>
          <div class="orange-line"></div>
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid || !$v.checkbox.$model">Submit</button>
          </div>
        </form>
      </div>
       
    </v-row>

  </v-container>
</template>
// ======================================================SCRIPT
<script>
import axios from 'axios'
import {required, email, alpha, minLength, sameAs} from 'vuelidate/lib/validators';
  export default {
    data () {
      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        checkbox: false
      }
    },
    validations: {
      firstName:      { required, alpha },
      lastName:       { required, alpha },
      password:       { required, minLen: minLength( 6 ) },
      confirmPassword:{ sameAs: sameAs( 'password' ) },
      checkbox:       { required},
      email:          { required, email,  
        unique: val => {
          if (val === '') return true;
          return axios.get('/api/checkUserEmails', {headers:{Email: val}})
            .then(res => { 
              return Object.keys(res.data).length === 0;
            }
          )
        }   
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          terms: this.terms
        }
        // console.log(formData);
        this.$store.dispatch('signup', formData);
      }
    } 
  }
</script>
// ======================================================STYLES
<style scoped>
.sInRow{
  position: relative;
  left: 0;
  top: 0;
  height: auto;
  width: 100vw;
  padding-bottom: 300px;
  overflow: hidden;
  background-color: #5daa58;
  /* background-image: url('../../assets/blueClouds.jpg');
  background-position: 0% 100%; */
  background-size: cover;}
.signin-form {
  position: relative;
  width: 400px;
  display: block;
  top: 18vh;
  z-index: 20;
  left: calc(50vw - 200px);
  height: auto;
  background-color: rgb(66,102,80, 1);
  border-radius: 20px;
  padding: 20px;
  margin: 0;
  box-shadow: 0 5px 5px #134F2B;}
.signinLab{
  display: flex;
  justify-content: center;
  margin-bottom: 15px;}
.signinLab h1{
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 0px;
  color: white;}
.orange-line{
  position: relative;
  left: 70px;
  border-radius: 3px;
  height: 6px;
  width: 220px;
  margin-top: 5px;
  margin-bottom: 25px;
  justify-content: center;
  border: 3px solid #DA8241;}
.warning{
  position: relative;
  top: -30px;
  color: #C879A9;}
.signup{
  position: absolute;
  top: calc(18vh + 429px);
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;}
.infoLab{
  font-family: Roboto, sans-serif;
  display: inline-block;
  color: white;
  font-size: 16px;
  line-height: 1em;
  font-weight: 400;
  text-align: center;}
#signupBtn {
  display: inline-block;
  top: -6px;
  color:#134F2B;
  left: 11px; }
#signupBtn:hover{ color: white;}
.input {
  margin: 0px 20px;}
.submit{
  display: flex;
  justify-content: center;
  margin-top: 24px;}
.submit button {
  border: 3px solid #005c1d;
  border-radius: 15px;
  color: white;
  padding: 10px 20px;
  margin-bottom: 30px;
  font-family: acier-bat-solid, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;}
.submit button:hover,
.submit button:active {
  background-color: #5daa58;
  color: white;}
.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: white;
  cursor: not-allowed;}
.inline{
  position: relative;
  display: flex;
  justify-content: center;
  height: 50px;}
.inline input{
  margin-top: 2px;
  width: 20px;}
.input label {
  display: block;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  line-height: 1em;
  font-weight: 500;
  color: #ccc;}
.input input {
  width: 100%;
  padding: 0px 12px;
  margin-top: 6px;
  margin-bottom: 26px;
  box-sizing: border-box;
  border-radius: 1px;
  border-bottom: 2px solid white;}
 .input input:focus {
  outline: none;
  padding: 10px 12px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 4px;
  border-bottom: 3px solid white;
  background-color: #DA8241;}
.accept{ padding: 5px 10px; }
.checkbox{ margin-left: 5px; width: 20px !important;}
.input.invalid label{ color: red !important; }
.invalid{ color: red !important; }
.input.invalid input{
  padding: 10px 12px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 2px solid red;
  background-color:  #E6BEC3;}

</style>