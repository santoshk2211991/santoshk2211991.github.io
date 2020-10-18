<template>
  <div id="loader1" class="centered">
    <div class="centeredBorder">

      <div class="centered1">

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Spinner',
  props: {
    enable: Boolean
  },
  data() {
    return {
      enable: true
    }
  }
}
</script>
