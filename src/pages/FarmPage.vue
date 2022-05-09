<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-navigation-drawer class="side-bar" permanent clipped absolute app floating>
          <v-list class="text-left">
            <v-list-item>
              <v-list-item-avatar class="mx-auto" size="100">
                <v-img :src="avatarUrl" alt="avatar"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="username">{{user ? user.username : 'User'}}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row class="justify-space-between">
                  <v-col class="col-auto">
                    <v-list-item-subtitle>{{userExp}}/{{maxExp}}</v-list-item-subtitle>
                  </v-col>
                  <v-col class="col-auto">
                    <v-list-item-subtitle>Lv. {{user ? user.level : 0}}</v-list-item-subtitle>
                  </v-col>
                </v-row>
                <v-progress-linear :value="userExp/maxExp * 100" rounded striped color="custom"></v-progress-linear>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name:'badges-page'}">
              <v-list-item-title>Badges</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name:'backgrounds-page'}">
              <v-list-item-title>Backgrounds</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name:'account-page'}">
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><a href="#" @click="logOut()">Log Out</a></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col fluid>
        <v-container fluid class="mt-0">
          <v-card>
            <router-view v-on:add-exp="addExp($event)"></router-view>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="1">
        <v-navigation-drawer class="side-bar" permanent right clipped absolute app floating>
          <v-list class="text-left">
            <v-list-item :to="{name:'farm-hub-page'}">
              <v-list-item-title>{{farmName}}</v-list-item-title>
            </v-list-item>
            <v-list-group :value="true" id="activities-subgroup">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Activities</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item :to="{name:'feeding-time-page'}">
                <v-list-item-title>Feeding Time</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{name:'treat-time-page'}">
                <v-list-item-title>Treats Time</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{name:'round-up-page'}">
                <v-list-item-title>Round-Up</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {auth, db} from "@/plugins/vuefire";
import LevelExpFormula from "@/models/LevelExpFormula";

export default {
name: "FarmPage",
  data(){
    return{
      avatar: '',
    }
  },
  props:{
    user: {required: true},
    avatarUrl: {required: true},
  },
  computed:{
    userExp: function(){
      if(this.user){
        return this.user.exp;
      } else {
        return 0;
      }
    },
    maxExp: function(){
      if(this.user){
        return LevelExpFormula(this.user.level);
      } else {
        return 0;
      }
    },
    farmName(){
      if(this.user){
        let farmName = this.user.farmName;
        if(farmName !== ''){
          //Trim the quotation marks off
          farmName = farmName.slice(1).slice(0, farmName.length - 2);
          return farmName;
        }
      }
      return "My Farm";

    }
  },
  methods:{
    logOut(){
      auth.signOut();
      this.$router.push({name:'home-page-guest'});
    },
    addExp(exp){
      let user = this.user
      if(user){
        user.exp += exp;
        if(user.exp >= LevelExpFormula(user.level)){
          user.exp = user.exp - LevelExpFormula(user.level);
          user.level++;
        }
        console.log(user);
        //Update doc
        db.collection('users').doc(user._id).update({
          exp: user.exp,
          level: user.level
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .v-progress-linear{
    background-color: var(--v-accent-base);
  }

  .farm{
    height: 34rem;
    background-image: url("../assets/Field.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  #barn{
    position: absolute;
    right: 0;
    max-height: 100%;
    object-fit: contain;
    object-position: right bottom;
  }

  #signpost{
    position: absolute;
    right: 40%;
    bottom: 45%;
    max-height: 40%;
    object-fit: contain;
  }

  #animal{
    position: absolute;
    left: 10%;
    bottom: 20%;
    max-height: 40%;
    object-fit: contain;
  }

  .hoverable:hover{
    cursor: pointer;
  }

  #activities-subgroup{
    position: relative;
  }

  .username{
    font-size: x-large;
    text-align: center;
  }
</style>