<template>
  <game-board title="Feeding Time" game-component="FeedingGame" game="feeding-time" :rules="rules" v-on:add-exp="$emit('add-exp', $event)"></game-board>
</template>

<script>
import GameBoard from "@/components/GameBoard";

export default {
  name: "FeedingTimePage",
  components: {GameBoard},
  data(){
    return {
      rules: `It's time for dinner, and each animal needs their own special feed! Match the characters on the
      feed bags with the letters in the pens by clicking the feed bag, and then the pen you think it matches. Once
      each pen is filled with feed, click the 'Feeding Time!' button to check your work!`,
    }
  }
}
</script>

<style scoped>

</style>