<template>
<div>
  <router-link :to="{name:homePage}"><h1 class="text-left">Kana Farm</h1></router-link>

</div>
</template>

<script>
export default {
  name: "SiteBanner",
  props: {
    homePage: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  div{
    background-color: var(--v-secondary-base);
  }
</style>