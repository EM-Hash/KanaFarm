<template>
  <v-container class="farm">
    <router-link :to="{name: 'feeding-time-page'}">
      <v-tooltip left>
        <template v-slot:activator="{on, attrs}">
          <img id="barn" class="hoverable" src="../assets/Barn.png" alt="barn" v-bind="attrs" v-on="on"/>
        </template>
        <span>Play "Feeding Time"</span>
      </v-tooltip>
    </router-link>
    <router-link :to="{name: 'round-up-page'}" v-on:add-exp="$emit('addExp',$event)">
      <v-tooltip left>
        <template v-slot:activator="{on, attrs}">
          <img id="signpost" class="hoverable" src="../assets/Signpost.png" alt="signpost" v-bind="attrs" v-on="on"/>
        </template>
        <span>Play "Roundup"</span>
      </v-tooltip>
    </router-link>
    <router-link :to="{name: 'treat-time-page'}">
      <v-tooltip right>
      <template v-slot:activator="{on, attrs}">
        <div id="animal" class="horse" v-bind="attrs" v-on="on"></div>
      </template>
      <span>Play "Treat Time"</span>
    </v-tooltip>
    </router-link>
  </v-container>
</template>

<script>
export default {
name: "FarmHubPage",
  methods:{
  }
}
</script>

<style scoped lang="scss">
.container{
  height: 100%;
  width: 100%;
  padding: 0;
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
  height: 10rem;
  width: 15rem;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: 10%;
  bottom: 20%;

  &.bunny{
    background-image: url('../assets/Bunny.png');
    height: 20%;
  }

  &.horse{
    background-image: url("../assets/Horse.png");
    height: 40%;
  }
}

.hoverable:hover{
  cursor: pointer;
}
</style>