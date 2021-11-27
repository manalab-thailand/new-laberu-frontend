<template>
  <!-- <div class="flex-row flex-wrap q-my-lg">
    <div class="col"><ProfileGeneral /></div>
    <div class="col"><ProfileStat /></div>
  </div> -->
  <div class="flex-row justify-center">
    <div class="flex-container">
      <div class="flex-col items-center">
        <div
          class="flex-col"
          style="
            max-width: 500px;
            margin: 2em 0;
            padding: 0 1em;
            text-align: center;
          "
        >
          <div
            class="
              profile-title
              text-weight-bold
              flex-row
              items-center
              justify-center
            "
          >
            Laberu Profile
            <q-icon class="q-ml-sm" name="thumb_up" color="blue" />
          </div>
          <div class="profile-desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            nobis, consequuntur asperiores autem aut aliquam.
          </div>
        </div>

        <div class="wrap-block q-gutter-y-md" style="max-width: 700px">
          <div class="col">
            <ProfileGeneral />
          </div>
          <div class="col">
            <ProfileStat />
          </div>
        </div>

        <!-- <div class="orientation-portrait">
          <div class="wrap-block">
            <div class="col"><ProfileGeneral /></div>
            <div class="col"><ProfileStat /></div>
          </div>
        </div>
        <div class="orientation-landscape">
          <div class="wrap-flex">
            <div class="col"><ProfileGeneral /></div>
            <div class="col"><ProfileStat /></div>
          </div>
        </div> -->
      </div>
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
// @media (min-height: 1060px) and(max-width:1024px) {
//   .flex-wrap {
//     display: block;
//   }
// }

.flex-wrap > * {
  flex: 1 1 50%;
}

.profile-title {
  font-weight: 500;
  font-size: 25px;
}
.profile-desc {
  color: #7a7a7a;
  font-size: 14px;
}
</style>
