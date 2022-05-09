<template>
  <v-container :class="classList" v-on:click="$emit('bag-clicked', feedBag)">{{feedBag.character}}</v-container>
</template>

<script>
export default {
name: "FeedBag",
  props: {
    feedBag: {required: true},
  },
  computed: {
    classList(){
      return this.feedBag.classes.join(" ");
    }
  }
}
</script>

<style scoped>
  .container{
    background-color: lightgoldenrodyellow;
  }

  .selected{
    background-color: goldenrod;
    color: green;
  }
</style>