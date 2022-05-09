<template>
  <v-container :class="game + ' gameBoard pa-0 board'">
    <v-card id="gameStartCard" :class="startCardClass">
      <div class="justify-start d-flex pt-3 pl-3"><v-btn outlined color="white" :to="{name:'farm-hub-page'}"><v-icon color="white">mdi-arrow-left</v-icon>Return to Farm</v-btn></div>
      <div class="text-center text-h2 py-6">{{title}}</div>
      <v-card-text>
        <div class="text-h5 py-3">How to Play:</div>
        <div class="text-body-1 px-16 mx-16 mt-3 mb-5">{{rules}}</div>
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
    <v-row class="d-flex justify-space-between h-10">
      <v-col class="col-3 text-left pl-10">
        <v-btn plain :to="{name: 'farm-hub-page'}"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
      </v-col>
      <v-col class="col-6">
        <score-label :score="score" :class="scoreClass"></score-label>
      </v-col>
    </v-row>
    <component class="h-90" :is="gameComponent" :generate-character="generateCharacter"
               :score="score" v-on:handle-right-answer="handleRightAnswer" v-on:handle-wrong-answer="handleWrongAnswer"
               v-on:add-to-score="addToScore" v-on:take-from-score="takeFromScore" v-on:use-char="useChar"
               v-on:fill-unused-chars="fillUnusedChars" v-on:end-game="endGame" :key="timesPlayed"></component>
  </v-container>
</template>

<script>
  import HiraganaData from "@/models/Hiragana";
  import ScoreLabel from "@/components/ScoreLabel";
  import TreatGame from "@/components/TreatGame";
  import FeedingGame from "@/components/FeedingGame";

  export default {
    name: "GameBoard",
    components: {TreatGame, ScoreLabel, FeedingGame},
    data() {
      return {
        hiraganaReference: new HiraganaData().getCharacters(),
        score: 100,
        incorrect: 0,
        currentChar: '',
        unusedChars: [],
        scoreClass: '',
        startClassArray: ['absolute'],
        endClassArray: ['absolute', 'hidden-card'],
        timesPlayed: 0,
      }
    },
    props:{
      title: {required: true},
      rules: {required: true},
      game: {required: true},
      gameComponent: {required: true}
    },
    computed: {
      expEarned: function () {
        return Math.floor(this.score / 10);
      },
      startCardClass() {
        return this.startClassArray.join(" ");
      },
      endCardClass() {
        return this.endClassArray.join(" ");
      },
    },
    methods: {
      generateCharacter() {
        let loop = 0;
        if (this.unusedChars.length > 0) {
          let char;
          do {
            let index = Math.floor(Math.random() * (this.hiraganaReference).length);
            char = this.hiraganaReference[index].character;
            if (this.unusedChars.indexOf(char) !== -1) {
              return char;
            }
            loop++;
          } while (this.unusedChars.length >= 1 && !(this.unusedChars.indexOf(char) !== -1) && loop < 100);
          if (loop >= 100) {
            //Double-check that the hiddenChars length is 0
            if (this.unusedChars.length > 0) {
              //If it is, force the currentChar to be the first value of hidden chars
              return this.unusedChars[0];
            } else {
              //Otherwise, end the game
              this.endGame();
            }
          }
        } else {
          this.endGame();
        }
      },
      endGame() {
        //Make sure that the score isn't negative
        this.score = this.score < 0 ? 0 : this.score;
        //Show the end-game card
        this.endClassArray.splice(this.endClassArray.indexOf('hidden-card'), 1);
        //Add the exp
        this.$emit('add-exp', this.expEarned);
      },
      fillUnusedChars() {
        this.unusedChars = [];
        this.hiraganaReference.forEach((kana) => {
          this.unusedChars.push(kana.character);
        });
      },
      handleRightAnswer(charClicked) {
        //If their score is below 50, increase it by 5
        if (this.score < 50) {
          this.score += 5;
        }
        //Remove the char from the table of hidden chars
        this.useChar(charClicked);
        //Generate new char
        this.generateCharacter();
      },
      handleWrongAnswer() {
        //Deduct from score (don't go below 0)
        this.score = this.score <= 0 ? 0 : this.score - 5;
      },
      restartGame() {
        this.score = 100;
        this.endClassArray.push('hidden-card');
        this.fillUnusedChars();
        this.currentChar = this.generateCharacter();
        this.timesPlayed++;
      },
      addToScore(score){
        this.score += score;
      },
      takeFromScore(score){
        this.score -= score;
      },
      useChar(char){
        this.unusedChars.splice(this.unusedChars.indexOf(char.character), 1);
      }
    },
    mounted(){
      this.fillUnusedChars();
    }
  }
</script>

<style lang="scss">

#score{
  position: relative;
}

body .board{
  height: 34rem;
  width: 100%;
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

.treat-time{
  background-image: url("../assets/Table.png")
}

.feeding-time{
  background-image: url("../assets/BarnInside.png");
}

.round-up{
  background-image: url("../assets/Raven.png");
  background-color: skyblue;
}

.h-10{
  height: 10%;
}

div.h-90{
  height: 90%;
}
</style>