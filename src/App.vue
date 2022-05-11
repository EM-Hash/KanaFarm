<template>
  <div id="app" :class="theme + ' ' + background">
    <v-app>
      <v-app-bar clipped-right clipped-left app fixed id="banner">
        <site-banner :home-page="homePage"></site-banner>
      </v-app-bar>
      <router-view class="actionPanel" :user="user" :avatar-url="avatarUrl" :badges="badges" :themes="themeArray"
                   :currentTheme="theme" :background-names="backgrounds" :error-message="errorMessage"
                   v-on:update-username="updateUsername" v-on:change-theme="changeTheme" v-on:add-user="addUser"
                   v-on:refresh-avatar="refreshAvatar" v-on:change-background="changeBackground"
                   v-on:check-badges="checkBadges"></router-view>
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
  import {Badge, FOCI, METHODS} from "@/models/Badge";

  export default {
    name: 'App',
    data(){
      return {
        users: [],
        user: null,
        avatarUrl: '',
        backgrounds: ['bg-default', 'bg-striped-blue', 'bg-striped-green', 'bg-flowers-blue'],
        errorMessage: '',
        badges: [
          new Badge('Sweet Tooth', 'Play Treat Time 1 Time', '', [FOCI.TREAT_TIME], METHODS.PLAY, 1),
          new Badge(`We're just getting started`, 'Reach level 2', '', [FOCI.LEVEL], METHODS.LEVEL_UP, 2),
        ]
      }
    },
    computed: {
      theme(){
        return this.user ? this.user.theme : 'default';
      },
      homePage(){
        return this.user ? 'farm-hub-page' : 'home-page-guest';
      },
      themeArray(){
        let array = [];
        for(let theme in themes){
          array.push(theme);
        }
        return array;
      },
      background(){
        return this.user ? this.user.background : this.backgrounds[0];
      }
    },
    components: {SiteFooter, SiteBanner},
    methods: {
      changeTheme(newTheme){
        db.collection('users').doc(this.user._id).update({
          theme: newTheme,
        }).then(() => {
          this.updateTheme();
        });
      },
      updateTheme(){
        this.$vuetify.theme.themes.light = themes[this.theme];
      },
      addUser(user){
        //Create the user
        auth.createUserWithEmailAndPassword(user.email, user.password).then((createdUser) => {
          let _id = createdUser.user.uid;
          console.log(_id);
          let newUser = new User();
          newUser.username = user.username;
          newUser.farmName = user.farmName;
          newUser.email = user.email;
          newUser.theme = 'default';
          newUser.background = 'bg-default';
          newUser._id = _id;
          newUser.level = 1;
          //Add the user to firebase
          db.collection('users').doc(createdUser.user.uid).set(User.toFirestore(newUser)).catch(error => {
            console.log("Error Code " + error.code + ": " + error.message);
          });
          //If all went well, redirect them to the home page
          this.$router.push({'name':'farm-hub-page'});
        }).catch((error) => {
          this.errorMessage = error.message;
          console.log("Error Code " + error.code + ": " + error.message);
        });
      },
      refreshAvatar(){
        if(this.user.imageUrl && this.user.imageUrl !== ''){
          storage.ref("avatars").child(this.user.imageUrl).getDownloadURL().then(url => {
            this.avatarUrl = url;
          });
        }
      },
      updateUsername(username){
        db.collection("users").doc(this.user._id).update({
          username: username,
        })
      },
      changeBackground(newBackground){
        db.collection('users').doc(this.user._id).update({
          background: newBackground,
        });
      },
      loggedOnSameDay(user){
        //If the user has been on two separate days, add to the days on
        //Get both values as ISO dates
        let now = new Date(Date.now());
        now = now.toISOString();
        let lastOn = new Date(user.lastActive).toISOString();
        //Cut the time values
        now = now.slice(0, now.indexOf('T'));
        lastOn = lastOn.slice(0, lastOn.indexOf('T'));
        return(now === lastOn);
      },
      checkBadges(foci){
        if(this.user){
          //Find all the badges with the given foci
          let targetBadges = [];
          this.badges.forEach((badge) => {
            if(this.equalArrays(badge.foci, foci)){
              targetBadges.push(badge);
            }
          });
          //For each target badge, see if the conditions are met
          targetBadges.forEach((badge) => {
            //If they don't already have this badge
            if(this.user.badges.indexOf(badge.name) !== -1){
              //For each badge, see if they've done the method the target number of times
              switch(badge.method){
                case METHODS.VISIT_SITE: {
                  //Check if they've visited the site the target numbeer of days
                  if(this.user.daysActive >= badge.target){
                    this.giveBadge(badge);
                  }
                  break;
                }
                case METHODS.LEVEL_UP: {
                  //Check if the user's level is at least the target
                  if(this.user.level >= badge.target){
                    this.giveBadge(badge);
                  }
                  break;
                }
                case METHODS.PLAY: {
                  //Check if the user's played the focus game(s) target+ times
                  break;
                }
                case METHODS.SCORE: {
                  //Check if the user's score for the focus game(s) is at least the target
                  break;
                }
              }
            }
          });
        }
      },
      equalArrays(a, b){
        if(a.length !== b.length){
          return false;
        } else {
          for(let i = 0; i < a.length; i++){
            console.log(b.includes(a[i]));
            if(!b.includes(a[i])){
              return false;
            }
          }
        }
        return true;
      },
      giveBadge(badge){
        //Give the user the badge, do something to show so on the screen
        this.user.badges.push(badge.name);
        //TODO: Show the user they got the badge
      }
    },
    router,
    vuetify,
    firebase,
    updated(){
      this.updateTheme();
    },
    firestore(){
      auth.onAuthStateChanged(user => {
        if(user){
          new Promise(() => {
            db.collection('users').doc(user.uid).withConverter(User).onSnapshot((doc) => {
              this.user = doc.data();
              this.refreshAvatar();
              //Update when the user was on/if needed the days active
              //If needed, add to the days the user's logged on
              if(!this.loggedOnSameDay(this.user)){
                //Add to the days on
                this.user.daysActive = this.user.daysActive + 1;
              }
              this.user.lastActive = Date.now();
              //Update the doc's user
              db.collection('users').doc(user.uid).set(User.toFirestore(this.user));
            });
            //If they're on the guest page
            if(this.$router.currentRoute.name == 'home-page-guest'){
              //Redirect to  farm-hub-page
              this.$router.push({name: "farm-hub-page"});
            }
          }).then(() => {
            console.log("Hello!");
          });
          db.collection('users').doc(user.uid).withConverter(User).onSnapshot((doc) => {
            this.user = doc.data();
            this.refreshAvatar();
            //Update when the user was on/if needed the days active
            //If needed, add to the days the user's logged on
            if(!this.loggedOnSameDay(this.user)){
              //Add to the days on
              this.user.daysActive = this.user.daysActive + 1;
            }
            this.user.lastActive = Date.now();
            //Update the doc's user
            db.collection('users').doc(user.uid).set(User.toFirestore(this.user));
          });
          //If they're on the guest page
          if(this.$router.currentRoute.name == 'home-page-guest'){
            //Redirect to  farm-hub-page
            this.$router.push({name: "farm-hub-page"});
          }
        } else {
          this.user = null;
        }
      });
    },
    watch:{
      theme(){
        this.updateTheme();
      },
    },
    mounted(){
      this.updateTheme();
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

.actionPanel{
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

nav.side-bar.v-navigation-drawer{
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

.page{
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  border-radius: 1.5rem;
}
</style>
