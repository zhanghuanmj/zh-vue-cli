<template>
  <div class="test">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TestChild',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
