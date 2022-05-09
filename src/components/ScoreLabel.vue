<template>
  <div id="score">Score: {{score}}</div>
</template>

<script>
import 'animate.css';

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve) => {
      const animationName = `${prefix}${animation}`;
      // const node = document.querySelector(element);

      element.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        element.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      element.addEventListener('animationend', handleAnimationEnd, {once: true});
});

export default {
  name: "ScoreLabel",
  props: {
    score: {
      required: true
    }
  },

  watch: {
    score: {
      handler: function(newScore, oldScore){
        if (oldScore > newScore) {
          //Wrong Animation
          animateCSS(this.$el, 'shakeX');
        } else {
          console.log("Right answer!!");
          //Right Animation if old score < 50
          if(oldScore < 50){
            animateCSS(this.$el, 'shakeY');
          }
        }
      }
    }
  },
}
</script>

<style scoped>
  .animate__shakeX{
    color: red;
  }

  .animate__shakeY{
    color: green;
  }
</style>