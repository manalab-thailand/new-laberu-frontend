<template>
  <div
    class="row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f); height: 100%"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 525px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h4 text-white q-my-md">Laberu.tech</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            >
              <q-btn fab icon="add" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pa-md q-gutter-md">
              <q-btn round color="indigo-7">
                <q-icon name="fab fa-facebook-f" size="1.2rem" />
              </q-btn>
              <q-btn round color="red-8" @click="onClickLoginGoogle()">
                <q-icon name="fab fa-google-plus-g" size="1.2rem" />
              </q-btn>
              <q-btn round color="light-blue-5">
                <q-icon name="fab fa-twitter" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="purple-4"
              class="full-width text-white"
              label="Sign In"
              @click="onLoginWithFirebase()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { StateInterface, useStore } from "src/store";
import { IAuthState } from "src/store/module-auth/state";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute, Router } from "vue-router";
import {
  getCurrentUser,
  loginWithGoogle,
  loginWithFirebase,
} from "../boot/firebase";
import { Store } from "vuex";
import { QVueGlobals, useQuasar } from "quasar";
import { ok } from "assert";

const authentication = (
  store: Store<StateInterface>,
  router: Router,
  q: QVueGlobals
) => {
  const email = ref<string>("doublepor.pp@gmail.com");
  const password = ref<string>("0957520816");
  const uid = ref<string | undefined>("");
  const currentUser = ref<IAuthState>();

  const onLoginWithFirebase = async () => {
    try {
      q.loading.show();
      // const user = await loginWithFirebase(email.value, password.value);
      // if (user) {
      //   uid.value = user?.uid;

      // }
      uid.value = "6130613022";
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
    const { role } = user;
    if (role == "user") {
      currentUser.value = store.state.moduleAuth;
      router.push({ name: "home" });
    } else {
      q.dialog({
        title: "Unauthorized access",
        message: "Permission denied accessing this website",
        ok: true,
      });
    }
  };

  return {
    onLoginWithFirebase,
    onClickLoginGoogle,
    setAuhentication,
    email,
    password,
  };
};

export default defineComponent({
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();

    return {
      ...authentication(store, router, q),
    };
  },
});
</script>

<style></style>
