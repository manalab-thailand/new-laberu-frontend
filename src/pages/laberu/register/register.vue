<template>
  <div class="content-sidebar-60">
    <div class="col">
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
    <div class="col">
      <div class="flex-row justify-center items-center">
        <div
          style="
            display: flex;
            margin-top: 3em;
            padding: 0 2em;
            width: 100%;
            justify-content: center;
          "
        >
          <div class="flex-col">
            <div class="top-section q-mb-xs">Sign Up</div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                First Name
              </div>
              <q-input v-model="firstname" filled />
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Last Name
              </div>
              <div>
                <q-input style="width: 100%" v-model="Lastname" filled />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                phone number
              </div>
              <div>
                <q-input v-model="phone_number" filled />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">Career</div>
              <div>
                <q-input v-model="career" filled />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Province
              </div>
              <div>
                <q-input v-model="province" filled />
              </div>
            </div>

            <div class="flex-row justify-end">
              <q-btn unelevated flat label="Next" class="signup-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { IPayment } from "src/store/module-users/state";
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "register",
  setup() {
    const user = reactive({
      firstname: ref(""),
      lastname: ref(""),
      email: ref(""),
      phone_number: ref(""),
      career: ref(""),
      province: ref(""),

      payment: {
        bank_name: ref(""),
        bank_account_no: ref(""),
        bank_account_name: ref(""),
      },
    });
    return {
      ...user,
    };
  },
});
</script>
