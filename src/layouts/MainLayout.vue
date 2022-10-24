<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title class="text-bold">
          <div class="row" style="flex-wrap: nowrap" @click="pushPage('home')">
            <div
              class="cursor-pointer"
              style="
                font-weight: bold;
                letter-spacing: 5px;
                margin-left: 7px;
                color: #d15eff;
              "
            >
              LABERU.TECH
              <q-tooltip> Home </q-tooltip>
            </div>
          </div>
          <q-space />
        </q-toolbar-title>
        <q-btn
          v-if="routerName !== 'register'"
          color="black"
          dense
          flat
          class="text-weight-bold"
          no-caps
          :label="!$q.platform.is.mobile ? user.email : ''"
          icon="account_circle"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="pushPage('profile')">
                <q-item-section>
                  <div class="text-weight-bold text-subtitle1">Profile</div>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="pushPage('reject-task')">
                <div class="text-weight-bold text-subtitle1">Reject Task</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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

<script lang="ts">
import EssentialLink from "components/EssentialLink.vue";
import { logout } from "src/boot/firebase";
import { useStore } from "src/store";
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const routerName = computed(() => router.currentRoute.value.name);

    const user = computed(() => store.state.moduleAuth.user);

    const logoutFirebase = async () => {
      await logout();
      router.push({ name: "login" });
    };

    const pushPage = (name: string) => {
      if (routerName.value !== "register") {
        router.push({ name: name });
      }
    };

    return { routerName, logoutFirebase, pushPage, user };
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
