<template>
  <div class="top-section q-mb-xs">Sign Up</div>
  <q-form @submit="registerFirebase">
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">Email address</div>
      <q-input
        clearable
        v-model="email"
        type="email"
        label="Email"
        filled
        :rules="[(val) => !!val || 'Field is require']"
      />
    </div>
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">Password</div>
      <div>
        <q-input
          clearable
          v-model="password"
          type="password"
          filled
          label="Password"
          :rules="[(val) => !!val || 'Field is require']"
        />
      </div>
    </div>
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">
        Confirm Password
      </div>
      <div>
        <q-input
          clearable
          v-model="confirmPwd"
          type="password"
          filled
          label="Confirm Password"
          :rules="[(val) => !!val || 'Field is require']"
        />
      </div>
    </div>
    <q-btn label="Sign Up" type="submit" class="signin-btn" />
  </q-form>
</template>
<style lang="scss"></style>
<script lang="ts">
import { useQuasar } from "quasar";
import { registerWithFirebase } from "src/boot/firebase";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "registerEmail",
  setup() {
    const router = useRouter();
    const q = useQuasar();

    const email = ref<string>();
    const password = ref<string>();
    const confirmPwd = ref<string>();

    const registerFirebase = async () => {
      if (password != confirmPwd) {
        q.dialog({
          title: "Password not match",
          message: "Plaese check your password or confirm password",
          persistent: true,
        }).onOk(() => {
          window.location.reload();
        });
        return;
      }

      //   const user = await registerWithFirebase(email.value!, password.value!);

      if (true) {
        q.dialog({
          title: "Register Success",
          message: "Your account has registered successful",
          persistent: true,
        }).onOk(() => {
          window.location.reload();
        });
      }
    };

    return {
      email,
      password,
      confirmPwd,
      registerFirebase,
    };
  },
});
</script>
