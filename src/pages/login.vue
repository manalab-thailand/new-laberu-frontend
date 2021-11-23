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
      <!-- <div class="top-section q-mb-sm">Hello ! Welcome to LABERU</div>
      <div class="sub-top-section">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div class="q-my-md">
        <div class="text-bold q-mb-sm" style="color: #888888">
          Email address
        </div>
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
          ><img src="/images/Google-Logo 1.png" alt="" /> Sign In with
          Google</q-btn
        >
      </div>
      <div class="flex-row q-my-md" style="color: #888888">
        Don’t have an account ?
        <div class="fancy-link text-bold q-ml-sm cursor-pointer">
          Click Here
        </div>
      </div> -->
    </div>
  </div>
</template>
<style lang="scss">
.google-btn {
  font-family: Inter, Arial, sans-serif;
  color: #888888;
  font-size: 14px;
  width: 100%;
  background: #fff;
}

.top-section {
  font-weight: bold;
  font-size: calc(10px + 1vw);
}

.sub-top-section {
  color: #888888;
  font-size: 13px;
}

.or {
  margin: 0 1em;
  font-weight: Bold;
  font-size: 20px;
  color: #888888;
}

.-or- {
  height: 30px;
  padding-bottom: 10px;
  width: 100%;
  margin: 20px auto;
  float: left;
}

.-or-:after {
  content: "";
  display: block;
  margin-top: 15px;
  border-bottom: 2px solid #888888;
}
.signin-btn {
  font-family: Inter, Arial, sans-serif;
  font-size: 14px;
  color: white;
  background: #149bfc;
  width: 100%;
}

.signup-btn {
  font-size: 14px;
  color: #149bfc;
}

@keyframes showTopText {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  40%,
  60% {
    transform: translate3d(0, 60%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showBottomText {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.animated-title {
  color: #fff;
  font-family: Inter, Arial, sans-serif;
  height: 100%;
  left: 70%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
}
.animated-title > div {
  height: 50%;
  overflow: hidden;
  position: absolute;
  width: 100%;
}
.animated-title > div div {
  font-size: 2vw;
  padding: 2vmin 0;
  position: absolute;
}
.animated-title > div div span {
  display: block;
}
.animated-title > div.text-top {
  border-bottom: 5px solid #a4da6f;
  border-radius: 1px;
  width: 40vw;
  top: 0;
}
.animated-title > div.text-top div {
  animation: showTopText 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  bottom: 0;
  transform: translate(0, 100%);
}
.animated-title > div.text-top div span:first-child {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.43);
  color: linear(red, blue);
  font-weight: 500;
}
.animated-title > div.text-top div span:nth-child(2) {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  color: #fff;
  font-weight: bold;
  font-size: 5vw;
}
.animated-title > div.text-bottom {
  bottom: 0;
  align-items: baseline;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.43);
}
.animated-title > div.text-bottom div {
  animation: showBottomText 0.5s;
  animation-delay: 1.75s;
  animation-fill-mode: forwards;
  top: 0;
  transform: translate(0, -100%);
  display: inline;
}

.login-img {
  height: 100vh;
  background-image: url("/images/loginImg.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>
<script lang="ts">
import { StateInterface, useStore } from "src/store";
import { IAuthState } from "src/store/module-auth/state";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute, Router } from "vue-router";
import { loginWithGoogle, loginWithFirebase } from "../boot/firebase";
import { Store } from "vuex";
import { QVueGlobals, useQuasar } from "quasar";
import { ok } from "assert";

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
