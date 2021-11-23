<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { auth } from "./boot/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();

    onMounted(() =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          router.push({ name: "home" });
        } else {
          router.push({ name: "login" });
        }
      })
    );
  },
});
</script>
