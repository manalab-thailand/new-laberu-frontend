<template>
  <div class="page-container">
    <div class="flex-row flex-wrap q-my-lg">
      <ProfileGeneral />
      <ProfileStat />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import ProfileGeneral from "src/pages/laberu/profile/ProfileGeneral.vue";
import ProfileStat from "src/pages/laberu/profile/ProfileStat.vue";

export default defineComponent({
  name: "profile",
  components: { ProfileGeneral, ProfileStat },
  setup() {},
});
</script>

<style scoped lang="scss">
.border {
  border: black 2px solid;
  min-width: 300px;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
}

.page-container {
  max-width: 1400px;
}
</style>
