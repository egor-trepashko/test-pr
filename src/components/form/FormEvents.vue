<template>
  <div>
      EVENTS <br />
      <div class="log-list">
        <div class="log" v-for="(item, index) in arrayEventReverse" :key="item + index">
          <span >{{ item }}</span>
        </div>
      </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {

  computed: {
    ...mapGetters(['arrayEventReverse'])
  }
};
</script>

<style lang="css" scoped>
.log-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.log {
  padding: 4px;
  text-align: left;
  border: 1px solid;
  width: 100%;
}
</style>