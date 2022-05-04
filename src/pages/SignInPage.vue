<template>
  <v-container>
    <h1 class="mt-5">Sign In</h1>
    <v-subheader class="justify-center">New to Kana Farm?<router-link :to="{name: 'sign-up-page'}" class="px-2">Sign Up Here</router-link></v-subheader>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" :hidden="errorMessageHidden">
            <div id="errorMessage"></div>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Email" outlined v-model="email"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Password" outlined v-model="password" type="password"></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn color="info" @click="login">Log In</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import {auth, db} from "@/plugins/vuefire";
import $ from 'jquery';
import User from "@/models/User";

export default {
name: "SignInPage",
  data(){
    return {
      email: '',
      password: '',
      errorMessageHidden: true,
    }
  },
  props(){
    return{
      user: {
        required: true
      },
    }
  },
  methods: {
    login(){
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          db.collection('users').doc(userCredential.user.uid).get().then(querySnapshot => {
            let targetUser = querySnapshot.data();
            this.user = new User(targetUser, userCredential.user.uid);
          });
          this.$router.push({'name':'farm-hub-page'});
        })
        .catch(error => {
          this.errorMessageHidden = false;
          $("#errorMessage").text(`Error: ${error.message}`).css("color","red");
        });
    }
  }
}
</script>

<style scoped>
  .v-subheader{
    height: auto;
  }
</style>