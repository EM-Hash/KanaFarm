<template>
  <v-container>
    <h1>Welcome to Kana Farm!</h1>
    <div class="py-3">
      Kana Farm is an app for practicing and remembering Japanese Hiragana. Round up your animals, feed them, and give
      them treats as you learn!
    </div>
    <div class="raven-image"></div>
    <h2 class="py-5">Ready to get started?</h2>
    <v-row>
      <v-col>
        <v-btn :to="{name:'sign-in-page'}">Sign In</v-btn>
      </v-col>
      <v-col>
        <v-btn :to="{name:'sign-up-page'}">Sign Up</v-btn>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>
export default {
name: "HomePageGuest",
  props: {
    user: {required: true}
  }
}
</script>

<style scoped lang="scss">

.container{
  margin-top: 5rem;
  height: 100%;
  width: 100%;
  padding: 0;
}

.raven-image{
  background-image: url("../assets/Raven.png");
  height: 20rem;
  width: auto;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

body div a.v-btn.v-btn--router{
  background-color: var(--v-info-base);
  color: white;
}
</style>