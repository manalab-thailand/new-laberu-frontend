<template>
  <div class="top-section q-mb-sm">Hello ! Welcome to LABERU</div>
  <div class="sub-top-section">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Email address</div>
    <div>
      <q-input v-model="email" type="email" filled />
    </div>
  </div>
  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Password</div>
    <div>
      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        filled
        label="Password"
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
  <q-btn label="Sign In" class="signin-btn" @click="onLoginWithFirebase" />
</template>
<script lang="ts">
import { StateInterface, useStore } from "src/store";
import { defineComponent, ref } from "vue";
import { useRouter, Router } from "vue-router";
import { loginWithFirebase } from "src/boot/firebase";
import { Store } from "vuex";
import { QVueGlobals, useQuasar } from "quasar";

export default defineComponent({
  name: "LoginPage",
  emits: ["toRegister"],
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();

    return {
      ...authentication(store, router, q),
    };
  },
});
const authentication = (
  store: Store<StateInterface>,
  router: Router,
  q: QVueGlobals
) => {
  const email = ref<string>("user2@gmail.com");
  const password = ref<string>("zxc123**");
  const uid = ref<string | undefined>("");
  const isPwd = ref<boolean>();

  const onLoginWithFirebase = async () => {
    try {
      q.loading.show();
      const user = await loginWithFirebase(email.value, password.value);
      if (user) {
        uid.value = user!.uid;
        setAuhentication();
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

  const setAuhentication = async () => {
    const response = await store.dispatch("moduleAuth/onLogin", {
      uid: uid.value,
      email: email.value,
    });

    if (response.status === 404) {
      router.push({ name: "register" });
      return;
    }

    const user = store.state.moduleAuth.user;

    if (user.status !== "active") {
      q.dialog({
        title: "Unauthorized access",
        message: "Your account has been disabled",
        ok: true,
        persistent: true,
      }).onOk(async () => {
        router.push({ name: "login" });
      });
    }

    router.push({ name: "home" });
  };

  return {
    onLoginWithFirebase,
    setAuhentication,
    isPwd,
    email,
    password,
  };
};
</script>
