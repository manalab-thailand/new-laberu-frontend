<template>
  <div class="top-section q-mb-sm">Hello ! Welcome to LABERU</div>
  <div class="sub-top-section">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </div>
  <div class="q-my-md">
    <div class="text-bold q-mb-sm" style="color: #888888">Email address</div>
    <div>
      <q-input clearable v-model="email" type="email" filled />
    </div>
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
      />
    </div>
  </div>
  <q-btn label="Sign In" class="signin-btn" @click="onLoginWithFirebase" />
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
<script lang="ts">
import { StateInterface, useStore } from "src/store";
import { IAuthState } from "src/store/module-auth/state";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute, Router } from "vue-router";
import { loginWithGoogle, loginWithFirebase } from "../../boot/firebase";
import { Store } from "vuex";
import { QVueGlobals, useQuasar } from "quasar";
import { ok } from "assert";

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
  const email = ref<string>("doublepor@gmail.com");
  const password = ref<string>("zxc123**");
  const uid = ref<string | undefined>("");
  const currentUser = ref<IAuthState>();

  const onLoginWithFirebase = async () => {
    try {
      q.loading.show();
      const user = await loginWithFirebase(email.value, password.value);
      if (user) {
        uid.value = user!.uid;
      }
      // uid.value = "6130613022";
      setAuhentication();
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

  const onClickLoginGoogle = async () => {
    try {
      q.loading.show();
      const result = await loginWithGoogle();
      if (result) {
        uid.value = result?.user.uid;
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
    await store.dispatch("moduleAuth/onLogin", { uid: uid.value });
    const user = store.state.moduleAuth.user;
    const { status } = user;

    // if (status !== "active") {
    //   q.dialog({
    //     title: "Unauthorized access",
    //     message: "Your account has been disabled",
    //     ok: true,
    //     persistent: true,
    //   }).onOk(async () => {
    //     router.push({ name: "login" });
    //   });
    // }

    // q.dialog({
    //   title: "Unauthorized access",
    //   message: "Your account has been disabled",
    //   ok: true,
    //   persistent: true,
    // }).onOk(async () => {
    //   router.push({ name: "login" });
    // });
  };

  return {
    onLoginWithFirebase,
    onClickLoginGoogle,
    setAuhentication,
    email,
    password,
  };
};
</script>
