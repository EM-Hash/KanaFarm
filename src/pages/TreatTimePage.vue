<template>
  <v-container class="table pa-0">
    <v-card id="gameStartCard" :class="startCardClass">
        <div class="justify-start d-flex pt-3 pl-3"><v-btn outlined color="white" :to="{name:'farm-hub-page'}"><v-icon color="white">mdi-arrow-left</v-icon>Return to Farm</v-btn></div>
        <div class="text-center text-h2 py-6">Treat Time</div>
        <v-card-text>
          <div class="text-h5 py-3">How to Play:</div>
          <div class="text-body-1 px-16 mx-16 mt-3 mb-5">It's time to give the animals some treats, but since they're a bit picky, you need to sort them, first.
            The treats come out of the basket one at a time, with a character printed on top. Click the treat, and
            then click the cell on the table where the character belongs!</div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn dark rounded outlined v-on:click="startClassArray.push('hidden-card')">Start Game</v-btn>
        </v-card-actions>
      </v-card>
    <v-card id="gameEndCard" :class="endCardClass">
      <div class="text-center text-h2 py-6">Game Over!</div>
      <v-card-text>
        <div class="text-h5 py-3">Your Score: {{score}}</div>
        <div class="text-h6">Exp Earned: {{this.expEarned}}</div>
      </v-card-text>
      <v-card-actions class="justify-space-around">
        <v-btn color="white" outlined :to="{name:'farm-hub-page'}"><v-icon color="white">mdi-arrow-left</v-icon>Return to Farm</v-btn>
        <v-btn color="white" outlined v-on:click="restartGame()"><v-icon color="white">mdi-refresh</v-icon>Again</v-btn>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-col class="col-12 header">
        <v-row class="d-flex justify-space-between">
          <v-col class="col-3 text-left pl-10">
            <v-btn plain :to="{name: 'farm-hub-page'}"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
          </v-col>
          <v-col class="col-6">
            <score-label :score="score" :class="scoreClass"></score-label>
          </v-col>
        </v-row>

      </v-col>
      <v-col class="grid-col col-10">
        <hiragana-table :currentChar="currentChar" :cellClasses="['hidden']" :key="tableKey"
                        v-on:right-answer="handleRightAnswer($event)" v-on:wrong-answer="handleWrongAnswer($event)"></hiragana-table>
      </v-col>
      <v-col class="col-2">
        <div id="treat" v-text="currentChar"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HiraganaTable from "@/components/HiraganaTable";
import HiraganaData from "@/models/Hiragana";
import 'animate.css';
import ScoreLabel from "@/components/ScoreLabel";

export default {
  name: "TreatTimePage",
  components: {ScoreLabel, HiraganaTable},
  data(){
    return{
      hiraganaReference: new HiraganaData().getCharacters(),
      score: 100,
      incorrect: 0,
      currentChar: '',
      hiddenChars: [],
      tableKey: 0,
      scoreClass: '',
      startClassArray: ['absolute'],
      endClassArray: ['absolute','hidden-card'],
    }
  },
  computed: {
    expEarned: function(){
      return Math.floor(this.score / 10);
    },
    startCardClass(){
      return this.startClassArray.join(" ");
    },
    endCardClass(){
      return this.endClassArray.join(" ");
    }
  },
  methods: {
    generateCharacter(){
      let loop = 0;
      if(this.hiddenChars.length > 0){
        let char;
        do{
          let index = Math.floor(Math.random() * (this.hiraganaReference).length);
          char = this.hiraganaReference[index].character;
          if(this.hiddenChars.indexOf(char) !== -1){
            this.currentChar = char;
          }
          loop++;
        } while(this.hiddenChars.length >= 1 && !(this.hiddenChars.indexOf(char) !== -1) && loop < 100);
        if(loop >= 100){
          //Double-check that the hiddenChars length is 0
          if(this.hiddenChars.length > 0){
            //If it is, force the currentChar to be the first value of hidden chars
            this.currentChar = this.hiddenChars[0];
          } else {
            //Otherwise, end the game
            this.endGame();
          }
        }
      } else {
        this.endGame();
      }
    },
    endGame(){
      this.score -= (this.incorrect * 5);
      this.score = this.score < 0 ? 0 : this.score;
      this.endClassArray.splice(this.endClassArray.indexOf('hidden-card'),1);
      this.$emit('add-exp', this.expEarned);
    },
    fillHiddenChars(){
      this.hiraganaReference.forEach((kana) => {
        this.hiddenChars.push(kana.character);
      })
    },
    handleRightAnswer(charClicked){
      //If their score is below 50, increase it by 5
      if(this.score < 50){
        this.score += 5;
      }
      //Remove the char from the table of hidden chars
      this.hiddenChars.splice(this.hiddenChars.indexOf(charClicked),1);
      //Generate new char
      this.generateCharacter();
    },
    handleWrongAnswer(){
      //Deduct from score (don't go below 0)
      this.score = this.score <= 0? 0 : this.score - 5;
    },
    wait(){
      return new Promise(resolve => {setTimeout(resolve, 3000)})
    },
    restartGame(){
      //Force the table to reload
      this.tableKey++;
      this.score = 100;
      this.endClassArray.push('hidden-card');
      this.startGame();
    },
    startGame(){
      this.fillHiddenChars();
      this.generateCharacter();
    }
  },
  mounted() {
    this.startGame();
  },
  firestore: {
  }
}
</script>

<style lang="scss">

  #score{
    position: relative;
  }


  body .table{
    height: 34rem;
    width: 100%;
    background-image: url("../assets/Table.png");
    background-repeat: no-repeat;
    background-size: 100% 34rem;
  }

  body .absolute{
    position: absolute;
  }

  body .header *{
    font-size: large;
  }

  #gameStartCard, #gameEndCard{
    z-index: 4;
    height: 100%;
    width: 100%;
    background-color: rgb(54, 124, 133, .9);
    div{
      color: white;
      font-size: large;
    }
  }

  .hidden *{
    visibility: hidden;
  }

  .hidden-card{
    visibility: hidden;
  }

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