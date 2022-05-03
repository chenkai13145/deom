<template>
  <div>
    <div @click="storege2">storege2</div>
  </div>
</template>

<script>
export default {
  methods: {
    storege2 () {
      localStorage.setItem('chenkai', 45)
    }
  },
  monted () {
    window.onstorage = function (e) {
      console.log(`The ${e.key}  key has been changed from ${e.oldValue}  to  ${e.newValue} .`);
    }
  }
}
</script>

<style>
</style>