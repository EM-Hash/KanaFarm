<template>
    <v-row>
      <v-col class="grid-col col-10">
        <hiragana-table :currentChar="currentChar" :cellClasses="['hidden']"
                        v-on:right-answer="handleRightAnswer"
                        v-on:wrong-answer="handleWrongAnswer"></hiragana-table>
      </v-col>
      <v-col class="col-2">
        <div id="treat" v-text="currentChar"></div>
      </v-col>
    </v-row>
</template>

<script>
import HiraganaTable from "@/components/HiraganaTable";

export default {
  name: "TreatGame",
  components: {HiraganaTable},
  data(){
    return {
      currentChar: '',
    }
  },
  props: {
    generateCharacter: {
      required: true,
    },
    score: {required: true}
  },
  methods: {
    startGame(){
      this.$emit('fill-unused-chars');
      this.currentChar = this.generateCharacter();
    },
    handleRightAnswer(charClicked) {
      //If their score is below 50, increase it by 5
      if (this.score < 50) {
        this.$emit('add-to-score', 5);
        // this.score += 5;
      }
      //Remove the char from the table of hidden chars
      this.$emit('use-char', charClicked);
      //Generate new char
      this.currentChar = this.generateCharacter();
    },
    handleWrongAnswer() {
      //Deduct from score (don't go below 0)
      if(this.score > 0){
        this.$emit('take-from-score', 5);
      }
    },
  },
  mounted() {
    this.startGame();
  },
}
</script>

<style lang="scss">
  #treat{
    position: absolute;
    right: 3rem;
    top: 13rem;
    height: 3.5rem;
    width: 3.5rem;
    background-image: url("../assets/Cookie.png");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: xx-large;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  table {
    position: absolute;
    top: 5.5rem;
    left: 3.7rem;
    height: 25rem;
    width: 45rem;
    font-size: x-large;
    border-collapse: collapse;

    tbody td:not(.key){
      font-size: xx-large;
      border: solid 1px black;
    }

    tbody td:not(.key):hover{
      cursor: pointer;
      background: aliceblue;
      opacity: 0.5;
    }
  }
</style>