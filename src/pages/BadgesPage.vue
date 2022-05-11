<template>
  <v-container class="page">
    <h1>Under Construction</h1>
  </v-container>
<!--  <v-container class="page">-->
<!--    <v-row align="center">-->
<!--      <v-col cols="1">-->
<!--        <v-btn :to="{name:'farm-hub-page'}"><v-icon>mdi-arrow-left</v-icon> Return to Farm</v-btn>-->
<!--      </v-col>-->
<!--      <v-col cols="10">-->
<!--        <h1>Backgrounds</h1>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-row>-->
<!--      <v-col v-for="(badge) in badges" :key="badge.name">-->
<!--        <v-card>-->
<!--          <v-container v-if="hasBadge(badge)">-->
<!--            <v-img alt="Badge image here"></v-img>-->
<!--          </v-container>-->
<!--          <v-container v-else>-->
<!--            <v-img alt="Haven't gotten image yet here"></v-img>-->
<!--          </v-container>-->
<!--          <v-card-text>{{badge.description}}</v-card-text>-->
<!--          <v-card-title v-if="hasBadge(badge)">{{badge.name}}</v-card-title>-->
<!--          <v-card-title v-else>???</v-card-title>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->
</template>

<script>
// import Badge from "@/models/Badge";

export default {
  name: "BadgesPage",
  data(){
    return{

    }
  },
  props: {
    user: {required: true},
    badges: {required: true},
  },
  computed: {
    userBadges(){
      if(this.user){
        return this.user.badges;
      } else {
        return [];
      }
    }
  },
  methods: {
    hasBadge(badge){
      return this.userBadges.includes(badge);
    }
  }
}
</script>

<style scoped>

</style>