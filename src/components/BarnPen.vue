<template>
  <v-container class="pen fill-height">
    <v-row>
      <v-col>
        <v-container class="fill-height penFeed pa-0">
          <feed-bag :feed-bag="pen.feedBag" v-on:bag-clicked="$emit('bag-clicked', $event)"></feed-bag>
        </v-container>
      </v-col>
      <v-col>
        <div class="penLetter" v-on:click="$emit('pen-clicked', pen)">{{pen.letter}}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FeedBag from "@/components/FeedBag";
export default {
  name: "BarnPen",
  components: {FeedBag},
  props: {
    pen: {required: true},
  }
}
</script>

<style scoped lang="scss">
  .col{
    z-index: 2;
  }

  .pen{
    height: 100%;
    width: 15rem;
    background-color: grey;
  }

  .penFeed{
    background-color: lightgoldenrodyellow;
  }

  .penLetter{
    margin: 0;
    height: 100%;
    background-color: var(--v-accent-base);
  }
</style>