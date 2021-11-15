<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-toolbar-title
          @click="$router.push({ name: 'home' })"
          class="text-bold row"
          style="flex-wrap: nowrap"
        >
          <q-avatar size="28px">
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
          </div>
          <q-space />
          <!-- <q-btn
            color="black"
            flat
            @click="leftDrawerOpen = !leftDrawerOpen"
            round
            dense
            icon="menu"
          /> -->
        </q-toolbar-title>
        <q-btn
          :to="{ name: 'profile' }"
          color="black"
          flat
          round
          dense
          icon="account_circle"
        />
      </q-toolbar>
    </q-header>

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
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleLeftDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
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
