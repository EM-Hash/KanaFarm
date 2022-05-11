<template>
  <v-container :class="'barn pa-0 d-flex ' + roundClass">
    <v-container class="penArea">
      <v-row justify="space-around" align-content="space-between">
        <template v-for="(pen, index) in pens">
          <v-col :key="pen.letter" cols="auto">
            <barn-pen :pen="pen" v-on:bag-clicked="selectBag" v-on:pen-clicked="penClicked(pen)"></barn-pen>
          </v-col>
          <v-responsive width="100%" v-if="(index-1) % 2 === 0" :key="index"></v-responsive>
        </template>
      </v-row>
      <v-row class="absolute" justify="center" align-content="center">
        <v-col cols="12">
          <v-btn v-on:click="checkWork">Check Work</v-btn>
        </v-col>
        <v-col cols="12">
          <v-container class="mt-0">Round {{currentRound}} / {{rounds}}</v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="feedArea">
      <v-col v-for="(feed) in feedBags" :key="feed.char">
        <feed-bag :feed-bag="feed" v-on:bag-clicked="selectBag"></feed-bag>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Bag from "@/models/FeedBag";
import Pen from "@/models/Pen";
import HiraganaData from "@/models/Hiragana";
import FeedBag from "@/components/FeedBag";
import BarnPen from "@/components/BarnPen";
export default {

name: "FeedingGame",
  components: {FeedBag, BarnPen},
  data(){
    return{
      pens: [],
      feedBags: [],
      rounds: 3,
      currentRound: 0,
      hiraganaRef: new HiraganaData().getCharacters(),
    }
  },
  props: {
    generateCharacter: {
      required: true,
    },
    score: {required: true}
  },
  computed: {
    penCount(){
      return 4 + (2 * [this.currentRound - 1]);
    },
    feedCount(){
      if(this.currentRound > 2){
        return this.penCount + 2;
      } else {
        return this.penCount;
      }
    },
    roundClass(){
      return "round-" + this.currentRound;
    }
  },
  methods: {
    startGame: function(){
      this.$emit('fill-unused-chars');
      this.currentRound = 0;
      this.startNewRound();
    },
    fillPensAndBags(){
      //Fill in the pens
      for(let i = 0; i < this.penCount; i++){
        let character = this.generateCharacter();
        let char = this.hiraganaRef.filter(function(hiragana){
          return (hiragana.character === character);
        })[0];
        let feed = new Bag(character, ['ma-0']);
        console.log(char.letter);
        let pen = new Pen(char.letter);
        this.pens.push(pen);
        this.feedBags.push(feed);
        this.$emit('use-char', character);
      }
      //Fill in any remaining feedbags
      if(this.feedCount > this.penCount){
        let extraBags = this.feedCount - this.penCount;
        for(let i = 0; i < extraBags; i++){
          let character = this.generateCharacter();
          let taken = [];
          this.feedBags.forEach(function(bag){
            taken.push(bag.character);
          });
          if(taken.indexOf(character) === -1){
            //If this character isn't being used already, add it
            let feed = new Bag(character, ['ma-0']);
            this.feedBags.push(feed);
          }
        }
      }
    },
    selectBag(bag){
      //If the bag is hidden, do nothing
      if(bag.classes.indexOf('d-none') === -1){
        //If there's a bag already selected...
        let selected = this.feedBags.filter(function(bag){
          return (bag.classes.indexOf('selected') !== -1);
        });
        if(selected.length > 0){
          //If if the selected bag is different from what the user just clicked, then toggle the class and continue
          selected[0].classes.splice(selected[0].classes.indexOf('selected'), 1);
          if(selected[0].char !== bag.char){
            //Add the 'selected' class to the bag (unless it's the one already selected)
            bag.classes.push('selected');
          }
        } else {
          bag.classes.push('selected');
        }
      }
    },
    moveBag(bag, pen){
      //Hide the bag
      bag.classes.push('d-none');
      //Remove the selected class from the bag
      bag.classes.splice(bag.classes.indexOf('selected'),1);
      //Set the text in the pen
      pen.feedBag.character = bag.character;
      //If the text is currently hidden, show it
      let hiddenIndex = pen.feedBag.classes.indexOf('d-none');
      if(hiddenIndex !== -1){
        pen.feedBag.classes.splice(hiddenIndex,1);
      }
      //If the bag is in a pen, set its text to blank
      let penBags = [];
      this.pens.forEach(function(pen){
        penBags.push(pen.feedBag);
      });
      if(penBags.indexOf(bag) !== -1){
        bag.character = '';
      }
    },
    penClicked(pen){
      //The bag selected
      let selected = this.feedBags.filter(function(bag){
        return (bag.classes.indexOf('selected') !== -1);
      });
      let penBags = [];
      this.pens.forEach(function(pen){
        penBags.push(pen.feedBag);
        console.log(pen.feedBag);
      });
      penBags = penBags.filter(function(feedBag){
        return (feedBag.classes.indexOf('selected') !== -1);
      });
      console.log("Filtered pen bags:", penBags);
      selected = selected.concat(penBags);
      console.log("Selected", selected);
      //If there's already a character in the pen
      if(pen.feedBag.character !== ''){
        //If it's already been selected, then deselect it
        if(selected.length < 1){
          //Otherwise, if no bag is currently selected, select the text
          pen.feedBag.classes.push('selected');
          selected.push(pen.feedBag);
        } else {
          //Else, Move that character back to its original spot and move the other character to this spot
          let originalSpot = this.feedBags.filter(function(bag){
            return (bag.character === pen.feedBag.character);
          })[0];
          //Show the original bag
          originalSpot.classes.splice(originalSpot.classes.indexOf('d-none'), 1);
          //Move the selected bag into the pen
          this.moveBag(selected[0], pen);
        }
      } else {
        if(selected.length > 0){
          //Move the character to the pen
          this.moveBag(selected[0], pen);
        }
      }
    },
    checkWork(){
      let mistakes = 0;
      let game = this;
      this.pens.forEach(function(pen){
        //The character that matches the pen
        let refChar = game.hiraganaRef.filter(function(character){
          return character.letter === pen.letter;
        })[0];
        if(refChar.character !== pen.feedBag.character){
          //If they aren't equal, mark it and continue
          console.log("Wrong!");
          console.log("Pen: " + pen.letter);
          console.log("Character: ", refChar);
          mistakes++;
          pen.feedBag.classes.push('incorrect');
          console.log("Current Mistakes: " + mistakes);
          game.$emit('take-from-score', 5);
        } else {
          if(game.score < 50){
            game.$emit('add-to-score', 5);
          }
        }
      });
      if(mistakes === 0){
        if(this.currentRound === this.rounds){
          this.$emit('end-game');
        } else {
          //Go to the next round
          this.startNewRound();
        }
      }
    },
    startNewRound(){
      this.currentRound++;
      this.pens = [];
      this.feedBags = [];
      this.fillPensAndBags();
      //Shuffle the feedbags
      this.feedBags.sort(() => Math.random() - 0.5);
    }
  },
  mounted(){
    this.startGame();
  }
}
</script>

<style scoped lang="scss">
  .barn{
    margin-top: 1rem;
  }

  .round-1{
    font-size: xx-large;
  }

  .round-2{
    font-size: large;
  }

  .round-3{
    font-size: small;
  }

  .penArea{
    position: absolute;
    height: 70%;
    padding:0;
    margin: 0;
  }

  .feedArea{
    height: 20%;
    background: rgba(255, 255, 255, 0.3);
    padding:0;
    margin: 0;
    display: flex;
    align-self: flex-end;
  }

  .selected{
    color: limegreen;
  }

  .absolute{
    position: absolute;
    bottom: 40%;
    left: 33%;
  }
</style>