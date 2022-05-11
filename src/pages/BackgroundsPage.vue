<template>
  <v-container class="page">
    <v-row align="center">
      <v-col cols="1">
        <v-btn :to="{name:'farm-hub-page'}"><v-icon>mdi-arrow-left</v-icon> Return to Farm</v-btn>
      </v-col>
      <v-col cols="10">
        <h1>Backgrounds</h1>
      </v-col>
    </v-row>
    <v-item-group v-model="newBackground">
      <v-container>
        <v-row>
          <v-col v-for="(bg) in backgrounds" :key="bg.name()">
            <v-item v-slot="{active, toggle}" :value="bg.class">
              <v-card :class="'bg ' + bg.class + (active ? ' selected' : '')" v-on:click="toggle"></v-card>
            </v-item>
            <v-subheader>{{bg.name()}}</v-subheader>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-btn @click="$emit('change-background', newBackground)">Change Background</v-btn>
  </v-container>
</template>

<script>
import Background from "@/models/Background";

export default {
name: "BackgroundsPage",
  data(){
    return{
      newBackground: 'Default',
    }
  },
  props:{
    backgroundNames: {},
    user: {},
  },
  computed: {
    userBackground(){
      return this.user ? this.user.background : 'default';
    },
    backgrounds(){
      let backgrounds = [];
      this.backgroundNames.forEach(function(bg){
        backgrounds.push(new Background(bg));
      });
      return backgrounds;
    }
  },
}
</script>

<style lang="scss" scoped>
  .bg{
    height: 20rem;
    width: 20rem;
    background-repeat: no-repeat;
    background-size: 100% 34rem;
  }

  //div.bg-default{
  //  background-color: #f7ede2;
  //}

  .bg-striped-blue{
    background-repeat: no-repeat;
    background-image: url("../assets/Stripes Blue.png");
  }

  .bg-striped-green{
    background-repeat: no-repeat;
    background-image: url("../assets/Stripes Green.png");
  }
  .bg-flowers-blue{
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../assets/Flowers Blue.png");
  }

  div.selected{
    border-color: var(--v-info-base);
    border-style: solid;
    border-width: 5px;
  }

</style>