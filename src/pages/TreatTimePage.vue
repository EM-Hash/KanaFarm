<template>
  <game-board title="Treat Time" game-component="TreatGame" game="treat-time" :rules="rules" v-on:add-exp="$emit('add-exp', $event)"></game-board>
</template>

<script>
import GameBoard from "@/components/GameBoard";
export default {
name: "TreatTimePage",
  components: {GameBoard},
  data(){
    return{
      rules: `It's time to give the animals some treats, but since they're a bit picky, you need to sort them, first.
              The treats come out of the basket one at a time, with a character printed on top. Click the treat, and
              then click the cell on the table where the character belongs!`,
    }
  }
}
</script>

<style scoped>

</style>