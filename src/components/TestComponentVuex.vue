<template>
  <div class="wrapper">
  <div class="container">
    <form-calculate/>
    <form-events/>
  </div>
  </div>
</template>

<script>

import FormCalculate from './form/FormCalculate.vue'
import FormEvents from './form/FormEvents.vue'

export default {
  components: {
    FormCalculate,
    FormEvents
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  max-width: 1024px;
}
</style>
