<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title class="text-bold row" style="flex-wrap: nowrap">
          <q-avatar size="28px">
            <img src="../images/bg-icon.png" />
          </q-avatar>
          <div
            style="
              font-weight: bold;
              letter-spacing: 5px;
              margin-left: 7px;
              color: #d15eff;
            "
          >
            ABERU.TECH
          </div>
          <q-space />
          <q-btn
            color="black"
            flat
            @click="leftDrawerOpen = !leftDrawerOpen"
            round
            dense
            icon="menu"
          />
        </q-toolbar-title>
        <q-btn color="black" flat round dense icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div class="flex-col">
            <div>Menu</div>
            <q-item clickable v-ripple style="align-items: center">
              <q-item-list> Home </q-item-list>
            </q-item>
            <q-expansion-item label="Project">
              <q-item clickable v-ripple class="switch-project-btn">
                <q-item-label style="align-items: center">
                  classification1
                </q-item-label>
              </q-item>
            </q-expansion-item>
            <q-item clickable v-ripple style="align-items: center">
              <q-item-list> Profile </q-item-list>
            </q-item>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRoute } from "vue-router";

import { defineComponent, ref } from "vue";
import router from "src/router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup(props, emit) {
    const route = useRoute();
    const currentPage = computed(() => route.name);
    console.log(currentPage.value);
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
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
