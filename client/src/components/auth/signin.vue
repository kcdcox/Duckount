<template>
  <v-container fluid ma-0 pa-0>

    <v-row class="sInRow">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="signinLab">
              <h1>Sign in</h1>
          </div>
          <div class="orange-line"></div>
         <div class="input" :class="{invalid: $v.email.$error}">
            <label for="email">Email</label>
            <input
                    type="email"
                    id="email"
                    name="email"
                    @blur="$v.email.$touch()"
                    v-model="email">
            <p class="warner" v-if="!$v.email.email">Invalid Email</p>
            <p class="warner" v-if="!$v.email.exists">The is no account with that email.</p>
          </div>
          <div class="input" :class="{invalid: $v.password.$error}">
            <label for="password">Password</label>
            <input
                    type="password"
                    name="password"
                    id="password"
                    @click="correctPass=true"
                    @blur="$v.password.$touch()"
                    v-model="password">
            <p class="warner" v-if="!correctPass & $v.email.exists">Incorrect Password.</p>
          </div>
          <div class="orange-line"></div>
          <div class="submit">
            <button type="submit" :disabled="$v.$invalid">Submit</button>
          </div>
        </form>
      </div>

      <div class="signup">
        <h2 class="infoLab">Don't already have an account?</h2>
        <router-link to="/signup">
          <v-btn 
            id="signupBtn" 
            small 
            outlined>Sign Up</v-btn>
        </router-link>
      </div>
       
    </v-row>

  </v-container>
</template>

<script>
/* eslint-disable */
  import axios from 'axios'
  import {required, email} from 'vuelidate/lib/validators';
  export default {
    data () {
      return {
        email: '',
        password: '',
        correctPass: true,
      }
    },
    validations: {
      email: { required, email,
        exists: val => {
          if (val === '') return true;
          return axios.get('/api/checkUserEmails', {headers:{Email: val}})
            .then(res => { 
              return Object.keys(res.data).length !== 0;
            })
            .catch(err => {
              console.log(err);
            })
        }  
      },
      password: { required }
    },
    watch: {
      correctPass(){
        if(this.correctPass!=true){this.correctPass = false;}
      }
    },
    methods: {
      auth () { return this.$store.getters.isAuthenticated; },
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        // console.log(formData)
        this.$store.dispatch('signin', formData);
        setTimeout(() => {this.correctPass = this.auth();}, 700);
      }
    }
  }
</script>

<style scoped>
.sInRow{
  position: relative;
  left: 0;
  top: 0;
  height: auto;
  min-height: 97vh;
  width: 100vw;
  padding-bottom: 300px;
  overflow: hidden;
  background-color: #5daa58;
  /* background-image: url('../../assets/blueClouds.jpg');
  background-position: 0% 100%; */
  background-size: cover;
  }
.signin-form {
  position: relative;
  width: 400px;
  top: 18vh;
  z-index: 20;
  left: calc(50vw - 200px);
  height: auto;
  background-color: rgb(66,102,80, 1);
  border-radius: 20px;
  padding: 20px;
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
  left: 80px;
  border-radius: 3px;
  height: 6px;
  width: 200px;
  margin-top: 10px;
  margin-bottom: 25px;
  justify-content: center;
  border: 3px solid #DA8241;}
.signup{
  position: relative;
  top: 168px;
  z-index: 100;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;}
.infoLab{
  font-family: 'Cabin', sans-serif;
  display: inline-block;
  color: black;
  font-size: 16px;
  line-height: 1em;
  font-weight: 400;
  text-align: center;}
.input {
  margin: 0px 20px;}
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
.submit{
  display: flex;
  justify-content: center;
  margin-top: 24px;}
.submit button {
  border: 3px solid #005c1d;
  border-radius: 15px;
  color: white;
  padding: 10px 20px;
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
  #signupBtn {
  display: inline-block;
  top: -6px;
  color:#134F2B;
  left: 11px; }
#signupBtn:hover{ color: white;}
.warning{
  position: relative;
  top: -30px;
  color: #C879A9;}
.input.invalid label{ color: white; }
.input.invalid input{
  padding: 10px 12px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 2px solid red;
  background-color:  #E6BEC3;}
.warner{
  font-family: Roboto, sans-serif;
  margin: 0;
  padding-bottom: 10px;
  padding-left: 5px;
  color: white;
  font-size: 16px;
  line-height: 1.2em;
  font-weight: 400;
}
</style>