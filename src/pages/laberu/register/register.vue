<template>
  <div class="content-sidebar-60">
    <div class="col-6">
      <div class="login-img">
        <!--source: https://codepen.io/alvaromontoro/pen/RmRjvg -->
        <div class="animated-title">
          <div class="text-top">
            <div>
              <span>Welcome to</span>
              <span>LABERU.TECH</span>
            </div>
          </div>
          <div class="text-bottom">
            <div class="row">
              Image Labelling Platform. Let’s Get
              <div
                class="q-ml-md fancy-link cursor-pointer"
                style="padding-bottom: 0; text-shadow: 2px 2px 5px #d15eff"
              >
                Start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <RegisterInformation />
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import RegisterInformation from "./register-information.vue";

export default defineComponent({
  name: "register",
  components: {
    RegisterInformation,
  },
  setup() {},
});
</script>
