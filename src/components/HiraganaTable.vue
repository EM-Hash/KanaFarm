<template>
  <table>
    <thead>
      <tr>
        <td v-for="head in header" :key="head">{{head}}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in body" :key="row.row">
        <kana-cell v-for="cell in row.letters" :kana="cell" :key="cell.letter" :initial-classes="cellClasses"
                   v-on:wrong-answer="$emit('wrong-answer',$event)"
                   v-on:right-answer="$emit('right-answer',$event)" :current-char="currentChar"></kana-cell>
        <td class="key">{{row.row}}</td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import HiraganaData from "@/models/Hiragana";
import KanaCell from "@/components/KanaCell";

export default {
name: "HiraganaTable",
  data(){
    return {
      header: ["n","w-","r-","y-","m-","h-","n-","t-","s-","k-",""," "],
      body: new HiraganaData().getBody(),
    }
  },
  props: {
    cellClasses: {
      type: Array,
      required: true
    },
    currentChar: {
      required: false
    }
  },
  methods: {
  },
  components: {KanaCell},
  mounted(){
  }
}
</script>

<style scoped lang="scss">

</style>