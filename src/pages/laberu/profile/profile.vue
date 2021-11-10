<template>
  <div class="flex-row q-mx-md" style="flex-wrap: wrap;gap:1em">
    <div class="col to-center">
      <ProfileGeneral />
    </div>
    <div class="col to-center">
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
.to-center {
  display: flex;
  justify-content: center;
}
</style>
