<template>
  <v-container>
    <h1>Sign Up</h1>
    <v-subheader class="justify-center">
      Already have an account?<router-link :to="{name:'sign-in-page'}" class="pl-1">Sign In Here</router-link>
    </v-subheader>
    <v-container class="red--text" v-if="errorMessage !== ''">Error: {{errorMessage}}</v-container>
    <v-form submit.prevent>
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="Username" v-model="username"></v-text-field>
      <v-text-field label="Password" v-model="password" :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"></v-text-field>
      <v-text-field label="Name your Farm!" v-model="farmName"></v-text-field>
      <v-btn @click="addUser">Sign Up</v-btn>
    </v-form>
  </v-container>
</template>

<script>

export default {
name: "SignUpPage",
  data(){
    return{
      email: '',
      password: '',
      showPassword: false,
      username: '',
      farmName: '',
    }
  },
  props: {
    errorMessage: {default: ''},
  },
  methods: {
    addUser(){
      let newUser = {
        "email": this.email,
        "password": this.password,
        "username": this.username,
        "farmName": this.farmName,
      };
      this.$emit('add-user', newUser);
    }
  }
}
</script>

<style scoped>

</style>