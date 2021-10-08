<template>
  <div v-if="item">
    <q-item clickable v-ripple>
      <q-item-section
        ><div class="row items-center">
          <div class="circle q-mr-xs" :style="style"></div>
          <div style="font-size: 16px">{{ item.short_code }}</div>
        </div>
        <div class="row" style="color:#393A3F;font-size: 12px">{{ item.date }}</div></q-item-section
      >
  
    </q-item>
  </div>
</template>

<script>
export default {
  data() {},
  props: {
    item: {
      type: Object,
    },
    style: {
      type: String,
    },
  },
};
</script>

<style scoped>
.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
