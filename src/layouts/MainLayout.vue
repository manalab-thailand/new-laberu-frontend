<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title
          @click="$router.push({ name: 'home' })"
          class="text-bold row"
          style="flex-wrap: nowrap"
        >
          <q-avatar size="28px" class="cursor-pointer">
            <img src="../images/bg-icon.png" />
          </q-avatar>
          <div
            class="cursor-pointer"
            style="
              font-weight: bold;
              letter-spacing: 5px;
              margin-left: 7px;
              color: #d15eff;
            "
          >
            ABERU.TECH
            <q-tooltip> Home </q-tooltip>
          </div>
          <q-space />

        </q-toolbar-title>
        <q-btn
          :to="{ name: 'profile' }"
          color="black"
          flat
          round
          dense
          icon="account_circle"
        />
        <q-btn
          dense
          icon="logout"
          class="text-black text-weight-bold q-mr-md q-ml-sm"
          flat
          @click="logoutFirebase()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { logout } from "src/boot/firebase";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  setup() {
    const router = useRouter();

    const logoutFirebase = async () => {
      await logout();
      router.push({ name: "login" });
    };

    return {
      logoutFirebase,
    };
  },
});
</script>

<style scoped>
.switch-project-btn {
  padding-left: 2em;
  color: #767272;
}
.switch-project-btn:focus {
  background: #000;
}
</style>
