<template>
  <div class="flex-row">
    <log-drawer />
    <div class="flex-col">
      <labelling-header />
      <image-area />
    </div>
    <labelling-area />
  </div>
</template>

<script>
import labellingHeader from "pages/laberu/labelling/labelling-header.vue";
import logDrawer from "components/log-drawer.vue";
import ImageArea from "pages/laberu/labelling/image-area.vue";
import labellingArea from "pages/laberu/labelling/labelling-area.vue";
export default {
  components: {
    labellingHeader,
    logDrawer,
    ImageArea,
    labellingArea,
  },
  data() {
    return {
      drawerLeft: false,
      leftDrawerOpen: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
