<template>
  <div>
    <div @click="setStorege"> localStorge</div>
  </div>
</template>

<script>
export default {

  methods: {
    setStorege () {
      localStorage.setItem('chenkai', 23)
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