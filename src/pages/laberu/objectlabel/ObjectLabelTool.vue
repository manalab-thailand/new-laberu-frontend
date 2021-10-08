<template>
  <q-item-label class="description-crop">action</q-item-label>
  <q-scroll-area style="height: 30vh">
    <q-form v-if="item">
      <div class="q-pa-md row justify-center q-gutter-y-md">
        <q-select
          :rules="[(val) => !!val]"
          outlined
          v-model="model"
          :options="options"
          label="input"
          bg-color="white"
          class="col-8"
          behavior="menu"
        />
      </div>
    </q-form>
  </q-scroll-area>
  <div class="row justify-end q-gutter-x-md q-pa-md">
    <q-btn dense label="Skip" style="background: white; width: 75px" />
    <q-btn dense label="Submit" style="background: #98da56; width: 75px" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    item: () => {
      label, value;
    },
  },
  setup() {
    const options = [
      {
        label: "snake",
        value: "reptiles",
      },
      {
        label: "tree",
        value: "plant",
      },
      {
        label: "sphynx",
        value: "statue",
      },
    ];
    return {
      options,
      text: ref(""),
      model: ref(null),
    };
  },
});
</script>

<style lang="scss" scoped>
.q-select {
  margin-bottom: -1.5em;
}
</style>
