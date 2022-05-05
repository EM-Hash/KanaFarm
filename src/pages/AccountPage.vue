<template>
<v-container>
  <v-row align="center">
    <v-col cols="1">
      <v-btn :to="{name:'farm-hub-page'}"><v-icon>mdi-arrow-left</v-icon> Return to Farm</v-btn>
    </v-col>
    <v-col cols="10">
      <h1>{{user ? user.username + "'s " : ''}}Account</h1>
    </v-col>
  </v-row>
  <h2 class="pt-5">Avatar</h2>
  <v-row class="pt-10">
    <v-col class="col-4 mb-3">
      <h3>Your Avatar:</h3>
      <v-avatar size="200">
        <v-img :src="loadedAvatarUrl" alt="avatar preview"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="col-4 align-self-center">
      <v-form ref="avatarForm" submit.prevent>
        <v-file-input accept="image/*" v-on:change="changeImage" class="avatarPicker"
                      :rules="avatarRules" label="Upload New Avatar" show-size></v-file-input>
        <v-subheader class="pt-5">Please upload an image no larger than 5MB</v-subheader>
        <v-btn class="mt-6 submitButton" @click="changeAvatar">Change Avatar</v-btn>
      </v-form>
    </v-col>
    <v-col class="col-4" v-if="showPreview">
      <h3>New Avatar:</h3>
      <v-avatar size="200">
        <v-img :src="newAvatarUrl"  alt="new avatar preview"></v-img>
      </v-avatar>
    </v-col>
  </v-row>
  <hr>
  <h2>Username</h2>
    <v-form ref="usernameForm" submit.prevent>
      <v-row>
        <v-col>
          <v-text-field disabled outlined label="Current Username: " :value="loadedUsername"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field outlined label="New username: " :rules="usernameRules" v-model="newUsername"></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="my-3 submitButton" @click="changeUsername">Change Username</v-btn>
    </v-form>
  <hr>
  <h2>Theme</h2>
  <v-form ref="themeForm" submit.prevent>
    <v-radio-group mandatory v-model="newTheme">
      <v-radio v-for="theme of themes" :key="theme" :disabled="!themeUnlocked(theme)"
               :value="theme" :label="theme"></v-radio>
    </v-radio-group>
  </v-form>
  <v-btn class="submitButton" @click="changeTheme">Change Theme</v-btn>
  <hr class="my-3">
  <v-btn class="finalButton" @click="changeProfile">Save Changes</v-btn>
</v-container>
</template>

<script>
import {storage} from "@/plugins/vuefire";
import ThemeLevelFormula from "@/models/ThemeLevelFormula";

export default {
  name: "AccountPage",
  data(){
    return{
      newAvatar: '',
      newAvatarUrl: '',
      previewAvatarUrl: '',
      showPreview: false,
      avatarRules: [avatar => !!avatar || 'Please Upload a New Avatar',
                    avatar => (avatar && (avatar?.size !== undefined || avatar.size < 5000000000)) ||
                        'Please Choose an Image Smaller Than 5MB'],

      newUsername: '',
      previewUsername: '',
      usernameRules: [username => (username && username.trim().length > 0) || 'Please Enter a Username'],

      newTheme: '',
    }
  },
  props: {
    user: {
      required: true,
      default: {},
    },
    avatarUrl: {
      required: true,
      default: '',
    },
    currentTheme: {
      required: true
    },
    themes: {
      required: true,
      default: [],
    }
  },
  computed:{
    loadedAvatarUrl(){
      if(this.previewAvatarUrl === ''){
        return this.avatarUrl;
      } else {
        return this.previewAvatarUrl;
      }
    },
    loadedUsername(){
      if(this.previewUsername === ''){
        return this.user?.username;
      } else {
        return this.previewUsername;
      }
    },
  },
  methods: {
    changeAvatar(){
      if(this.$refs.avatarForm.validate()){
        this.newAvatarUrl = '';
        this.showPreview = false;
        //Upload to firebase
        let path = storage.ref("avatars").child(this.user.imageUrl);
        path.put(this.newAvatar).then(() => {
          this.$emit('refresh-avatar');
        });
        this.$refs.avatarForm.reset();
      }
    },

    changeImage(file){
      if(file){
        this.newAvatar = file;
        this.newAvatarUrl = URL.createObjectURL(file);
        this.showPreview = true;
      }
    },

    changeUsername(){
      if(this.$refs.usernameForm.validate()){
        console.log(this.newUsername);
        this.$emit('update-username', this.newUsername);
        this.newUsername = '';
        this.$refs.usernameForm.reset();
      }
    },

    themeUnlocked(theme){
      return this.user?.level >= ThemeLevelFormula(this.themes.indexOf(theme));
    },
    changeTheme(){
      if(this.$refs.themeForm.validate()){
        this.$emit('change-theme', this.newTheme);
      }
    },
    changeProfile(){
      //If there's values the user hasn't submitted them, try to submit them
      if(this.newAvatarUrl !== ''){
        this.changeAvatar();
      }
      if(this.newUsername !== ''){
        this.changeUsername();
      }
      if(this.newTheme !== this.currentTheme){
        this.changeTheme();
      }
    },
  },
  watch: {
    currentTheme(newTheme){
      this.newTheme = newTheme;
    }
  },
  mounted(){
    this.newTheme = this.currentTheme;
  }
}
</script>

<style scoped lang="scss">
  .avatarPicker {
    //TODO: Theme Here
    //@include generateThemes(){
    //  padding: 1rem;
    //  border-radius: 0.5rem;
    //  background-color: themeValue('secondary');
    //}
  }

  input[type="file"]{
    opacity: 0;
    z-index: -1;
    position: absolute;
  }

  button.v-btn.finalButton{
    background-color: var(--v-success-base);
  }

  button.v-btn.submitButton{
    background-color: var(--v-info-base);
  }
</style>