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
            <div class="row">Image Labelling Platform</div>
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
          @click="isComponent = 'RegisterEmail'"
          class="fancy-link text-bold q-ml-sm cursor-pointer"
        >
          Click Here
        </div>
      </div>
      <div class="flex-row q-my-md" v-else style="color: #888888">
        Have an account ?
        <div
          @click="isComponent = 'LoginComponent'"
          class="fancy-link text-bold q-ml-sm cursor-pointer"
        >
          Click Here
        </div>
      </div>
      <div class="flex-row items-center">
        <div class="-or- col"></div>
        <div class="or">Or</div>
        <div class="-or- col"></div>
      </div>
      <div>
        <q-btn
          unelevated
          outline
          class="google-btn"
          no-caps
          @click="onClickLoginGoogle"
          ><img src="/images/Google-Logo 1.png" alt="" /> Sign In with
          Google</q-btn
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { useStore } from "src/store";
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { loginWithGoogle } from "src/boot/firebase";
import { useQuasar } from "quasar";
import LoginComponent from "src/pages/laberu/login/Login-component.vue";
import RegisterEmail from "src/pages/laberu/login/register-email.vue";
export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
    RegisterEmail,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();

    const isComponent = ref("LoginComponent");
    const isRegister = ref("RegisterEmail");

    const authentication = () => {
      const email = ref<string>("");
      const password = ref<string>("");
      const uid = ref<string | undefined>("");

      const onClickLoginGoogle = async () => {
        try {
          q.loading.show();
          const result = await loginWithGoogle();
          if (result) {
            uid.value = result.user.uid!;
            email.value = result.user.email!;
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
        try {
          q.loading.show();

          const response = await store.dispatch("moduleAuth/onLogin", {
            uid: uid.value,
            email: email.value,
          });
          console.log("🚀 ~ response", response);

          if (response.status === 404) {
            router.push({ name: "register" });
            return;
          }

          const user = computed(() => store.state.moduleAuth.user);

          if (user.value.status !== "active") {
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
        } catch (error) {
          console.log(error);
        } finally {
          q.loading.hide();
        }
      };

      return {
        onClickLoginGoogle,
        setAuhentication,
        email,
        password,
      };
    };

    return {
      ...authentication(),
      isComponent,
      isRegister,
    };
  },
});
</script>
