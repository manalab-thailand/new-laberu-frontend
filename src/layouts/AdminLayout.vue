<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar class="bg-tb-color">
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-black">
          Laberu Admin App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8 text-weight-bold text-center">
          Main Menu
        </q-item-label>

        <EssentialLink
          v-for="data in essentialLinks"
          :key="data.title"
          v-bind="data"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'View user',
    caption: 'view list user in table',
    icon: 'copyright',
    link: '/admin/view-user',
  },

  {
    title: 'View project',
    caption: 'list all of project in laberu',
    icon: 'payment',
    link: '/admin/view-project',
  },
  {
    title: 'Payment',
    caption: 'confirm payment in project',
    icon: 'apps',
    link: '/admin/payment',
  },
  {
    title: 'Create project',
    caption: 'Create your project',
    icon: 'person',
    link: '/admin/create-project',
  },
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
<style scoped>
.bg-tb-color {
  background-color: antiquewhite;
}
</style>
