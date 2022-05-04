<template>
  <td v-on:click="checkCell()" :class="classList"><div>{{kana.character}}</div></td>
</template>

<script>
export default {
name: "KanaCell",
  data() {
    return{
      classes: [],
    }
  },
  props: {
    kana: {
      required: true
    },
    initialClasses: {
      required: true,
      type: Array
    },
    currentChar: {
      required: false,
    }
  },
  methods:{
    checkCell(){
      if(this.kana.character === this.currentChar){
        this.classes.splice(this.classes.indexOf('hidden'),1);
        this.$emit('right-answer',this.kana.character);
      } else {
        this.$emit('wrong-answer',this.kana.character);
      }
    }
  },
  computed: {
    classList(){
      return this.classes.join(" ");
    }
  },
  mounted(){
    this.classes = Object.assign([], this.initialClasses);
  }
}
</script>

<style scoped>

</style>