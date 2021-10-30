<template>
  <div class="box-wrapper">
    <div
      class="box"
      :style="{
        top: bTop + 'px',
        left: bLeft + 'px',
        width: bWidth + 'px',
        height: bHeight + 'px',
      }"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    bTop: { type: Number },
    bLeft: { type: Number },
    bWidth: { type: Number },
    bHeight: { type: Number },
  },
});
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  border: 2px #90ee90 solid;

  &:hover,
  &.active {
    background-color: rgba(144, 238, 144, 0.2);
  }

  z-index: 3;
}
</style>
