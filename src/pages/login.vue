<template>
  <div class="content-sidebar">
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
    <div class="col" style="height: 100vh; padding: 3em">
      <component :is="isComponent"></component>
      <div
        class="flex-row q-my-md"
        v-if="isComponent == 'LoginComponent'"
        style="color: #888888"
      >
        Don’t have an account ?
        <div
          @click="isComponent = 'Register'"
          class="fancy-link text-bold q-ml-sm cursor-pointer"
        >
          Click Here
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { StateInterface, useStore } from "src/store";
import { IAuthState } from "src/store/module-auth/state";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute, Router } from "vue-router";
import { loginWithGoogle, loginWithFirebase } from "../boot/firebase";
import { Store } from "vuex";
import { QVueGlobals, useQuasar } from "quasar";
import { ok } from "assert";
import LoginComponent from "src/pages/laberu/LoginComponent.vue";
import Register from "src/pages/laberu/register/register.vue";
export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
    Register,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();

    const isComponent = ref("LoginComponent");
    const isRegister = ref("Register");

    return {
      ...authentication(store, router, q),
      isComponent,
      isRegister,
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

    if (status !== "active") {
      q.dialog({
        title: "Unauthorized access",
        message: "Your account has been disabled",
        ok: true,
        persistent: true,
      }).onOk(async () => {
        router.push({ name: "login" });
      });
    }

    q.dialog({
      title: "Unauthorized access",
      message: "Your account has been disabled",
      ok: true,
      persistent: true,
    }).onOk(async () => {
      router.push({ name: "login" });
    });
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
