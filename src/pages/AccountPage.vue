<template>
<v-container>
  <h1>Account</h1>
  <h2 class="pt-5">Avatar</h2>
  <v-row class="pt-10">
    <v-col class="col-4">
      <v-avatar size="200">
        <v-img :src="avatarPreviewUrl" alt="avatar preview" :key="imageKey"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="col-4 align-self-center">
      <v-form ref="avatarForm" submit.prevent v-model="validAvatar">
        <v-file-input accept="image/*" v-on:change="changeImage" class="avatarPicker"
                      :rules="avatarRules" label="Upload New Avatar" show-size></v-file-input>
        <v-subheader class="pt-5">Please upload an image no larger than 5MB</v-subheader>
        <v-btn class="mt-5 submitButton" @click="setAvatarPreview">Change Avatar</v-btn>
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
          <v-text-field disabled outlined label="Current Username: " :value="usernamePreview"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field outlined label="New username: " v-model="newUsername"></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="mt-5 submitButton" @click="setUsernamePreview">Change Username</v-btn>
    </v-form>
  <hr>
  <h2>Theme</h2>
  <v-form ref="themeForm" submit.prevent>
    <v-radio-group mandatory v-model="newTheme">
      <v-radio value="default" label="Default" color="black"></v-radio>
      <v-radio value="natural" label="Natural" color="green"></v-radio>
    </v-radio-group>
  </v-form>
  <v-btn class="finalButton" @click="changeProfile">Save Changes</v-btn>
</v-container>
</template>

<script>

import { storage} from "@/plugins/vuefire";

export default {
  name: "AccountPage",
  data(){
    return{
      newImage: '',
      imageKey: 0,
      avatarPreviewUrl: '',
      newAvatarUrl: '',
      showPreview: false,
      avatarRules: [avatar => !!avatar || 'Please Upload a New Avatar',
                    avatar => avatar.size < 5000000000 || 'Please Choose an Image Smaller Than 5MB'],
      validAvatar: true,
      usernamePreview: '',
      newUsername: '',
      newTheme: '',
      themePreview: '',
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
    }
  },
  methods: {
    setAvatarPreview(){
      if(this.$refs.avatarForm.validate()){
        console.log(this.newImage);
        //Change src of avatar preview
        this.avatarPreviewUrl = URL.createObjectURL(this.newImage);
        this.showPreview = false;
        this.newAvatarUrl = '';
        this.$refs.avatarForm.reset();
      }
    },
    avatarSubmit(){
      if(this.$refs.avatarForm.validate()){
       //Upload to firebase
       //Get to the right spot
       let path = storage.ref("avatars").child(this.user.imageUrl);
       path.put(this.newImage);
       new Promise(() => {
         this.$emit('refresh-avatar');
       }).then(() => {
         this.imageKey++;
       });
      }
    },
    changeImage(file){
      if(file){
        this.newImage = file;
        this.newAvatarUrl = URL.createObjectURL(file);
        this.showPreview = true;
      }
    },
    setUsernamePreview(){
      if(this.$refs.usernameForm.validate()){
        this.usernamePreview = this.newUsername;
        this.newUsername = '';
      }
    },
    usernameSubmit(){
      console.log("New username: " + this.usernamePreview);
      console.log("Id: " + this.user.id);
      // db.collection("users").doc(this.user.id).update({
      //   username: this.newUsername,
      // })
    },
    changeProfile(){
      //If there's a new value in an area that hasn't been validatied
      if(this.newAvatarUrl){
        //Validate it
        this.setAvatarPreview();
      }
      if(this.newUsername){
        this.setUsernamePreview();
      }
      //Apply the changes
      this.avatarSubmit();
      this.usernameSubmit(this.newUsername);
      this.$emit('change-theme', this.newTheme);
    }
  },
  mounted(){
    console.log("Hello");
    this.avatarPreviewUrl = this.avatarUrl;
    this.usernamePreview = this.user.username;
  },
}
</script>

<style scoped lang="scss">
  .avatarPicker {
    //TODO: Theme here
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