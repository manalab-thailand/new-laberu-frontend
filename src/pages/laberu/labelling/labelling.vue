<template>
<div class="flex-row">
    <log-drawer />
    <labelling-header />
    </div>
</template>

<script>
import labellingHeader from "pages/laberu/labelling/labelling-header.vue";
import logDrawer from "components/log-drawer.vue";
export default {
  components: {
    labellingHeader,
    logDrawer,
  },
  data() {
    return {
      drawerLeft: false,
      leftDrawerOpen: true,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
