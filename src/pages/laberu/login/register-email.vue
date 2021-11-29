<template>
  <div class="top-section q-mb-xs row">
    <div>Sign Up</div>
  </div>
  <q-form @submit="registerFirebase">
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">Email address</div>
      <q-input
        v-model="email"
        type="email"
        label="Email"
        outlined
        dense
        :rules="[(val) => !!val || 'Field is require']"
      />
    </div>
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">Password</div>
      <div>
        <q-input
          v-model="password"
          label="Password"
          outlined
          dense
          :type="isPwd ? 'password' : 'text'"
          :rules="[(val) => !!val || 'Field is require']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-my-md">
      <div class="text-bold q-mb-sm" style="color: #888888">
        Confirm Password
      </div>
      <div>
        <q-input
          v-model="confirmPwd"
          :type="isPwd ? 'password' : 'text'"
          outlined
          dense
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
    const q = useQuasar();

    const email = ref<string>();
    const password = ref<string>();
    const confirmPwd = ref<string>();
    const isPwd = ref<boolean>(true);

    const registerFirebase = async () => {
      if (password.value != confirmPwd.value) {
        q.dialog({
          title: "Password not match",
          message: "Plaese check your password or confirm password",
          ok: true,
        });
        return;
      }

      try {
        q.loading.show();

        const user = await registerWithFirebase(email.value!, password.value!);

        if (user) {
          q.dialog({
            title: "Register Success",
            message: "Your account has been registered",
            persistent: true,
          }).onOk(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        q.notify({
          message: `${error}`,
          icon: "warning",
          color: "negative",
        });
      } finally {
        q.loading.hide();
      }
    };

    return {
      email,
      password,
      confirmPwd,
      isPwd,
      registerFirebase,
    };
  },
});
</script>
