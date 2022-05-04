<template>
  <div id="app" :class="theme">
    <v-app>
      <v-app-bar clipped-right clipped-left app fixed id="banner">
        <site-banner :home-page="homePage"></site-banner>
      </v-app-bar>
      <router-view :user="user" :avatar-url="avatarUrl"
      v-on:change-theme="changeTheme($event)"></router-view>
      <site-footer></site-footer>
    </v-app>
  </div>
</template>

<script>
  import router from "@/router/routes";
  import vuetify from "@/plugins/vuetify";
  import firebase from "firebase/app";
  import SiteBanner from "@/components/SiteBanner";
  import SiteFooter from "@/components/SiteFooter";
  import {db, auth, storage} from "@/plugins/vuefire";
  import User from "@/models/User";
  import themes from "@/styles/styles";

  export default {
    name: 'App',

    data(){
      return {
        user: null,
        avatarUrl: '',
      }
    },
    computed: {
      theme(){
        return this.user ? this.user.theme : 'default';
      },
      homePage(){
        return this.user ? 'farm-hub-page' : 'home-page-guest';
      }
    },
    components: {SiteFooter, SiteBanner},
    methods: {
      changeTheme(){
        //TODO: Change theme for the user
        //Change the theme in the app
        this.updateTheme();
      },
      updateTheme(){
        this.$vuetify.theme.themes.light = themes[this.theme];
      }
    },
    router,
    vuetify,
    firebase,
    updated(){
      this.updateTheme();
    },
    mounted(){
      auth.onAuthStateChanged(user => {
        if(user){
          let targetUser;
          db.collection('users').doc(user.uid).get().then(querySnapshot => {
            targetUser = querySnapshot.data();
            this.user = new User(targetUser, user.uid);
            storage.ref("avatars").child(this.user.imageUrl).getDownloadURL().then(url => {
              this.avatarUrl = url;
            });
          });
          //If they're on the guest page
          if(this.$router.currentRoute.name == 'home-page-guest'){
            //Redirect to  farm-hub-page
            this.$router.push({name: "farm-hub-page"});
          }
        } else {
          this.user = null;
        }
      })
    },
    watch:{
      theme(){
        this.updateTheme();
      }
    }
  }
</script>

<style lang="scss">

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.container{
  margin-top: 5rem;
  height: 100%;
  width: 100%;
  padding: 0;
}

header#banner{
  background-color: var(--v-secondary-base);
  a{
    color: black;
    text-decoration: none;
  }
}

nav.side-bar{
  background-color: var(--v-primary-base);
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
