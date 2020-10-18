<template>
  <!-- <img :class = "spinnerClass" alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Spinner /> -->
  <Ammortization/>
  
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <HelloWorld msg="Hello Vue 4.0 + Vite" /> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Spinner from './components/Spinner.vue';
import Ammortization  from './components/Ammortization/Ammortization.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Spinner,
    Ammortization
  },
  data() {
    return {
      spinnerClass: "test-color"
    }
  }
}
</script>
