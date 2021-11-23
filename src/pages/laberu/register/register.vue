<template>
  <div class="top-section q-mb-sm">Sign Up</div>
  <div class="sub-top-section">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has
  </div>
  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Email address</div>
    <div></div>
    <q-input v-model="email" type="email" filled />
  </div>

  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Password</div>
    <div>
      <q-input v-model="password" type="password" filled />
    </div>
  </div>
  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Confirm Password</div>
    <div>
      <q-input v-model="password" type="password" filled />
    </div>
  </div>

  <div class="flex-row justify-end">
    <q-btn unelevated flat label="Next" class="signup-btn" />
  </div>
  <div class="flex-row items-center">
    <div class="-or- col"></div>
    <div class="or">Or</div>
    <div class="-or- col"></div>
  </div>
  <div>
    <q-btn unelevated outline class="google-btn" no-caps
      ><img src="/images/Google-Logo 1.png" alt="" /> Sign In with Google</q-btn
    >
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "register",
  setup() {
    return {
      email: ref(),
      password: ref(),
    };
  },
});
</script>
