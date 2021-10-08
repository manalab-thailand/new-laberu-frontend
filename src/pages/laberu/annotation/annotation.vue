<template>
  <q-item class="flex-col" style="padding: 0">
    <q-item-label class="description-crop"> Description</q-item-label>
    <q-item-label class="description"
      >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, repellat!
      Unde, quae. A, id. Dignissimos ratione exercitationem vero modi similique
      voluptate, aliquam, itaque aut.</q-item-label
    >
    <q-item-label class="description-crop">action</q-item-label>
    <q-input bg-color="white" outlined v-model="text" label="input" dense />
  </q-item>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      text: ref(""),
    };
  },
});
</script>

<style lang="scss" scoped></style>
