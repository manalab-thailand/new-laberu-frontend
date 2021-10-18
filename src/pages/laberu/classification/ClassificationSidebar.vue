<template>
  <div class="label-tools">
    <q-list>
      <q-item class="flex-col" style="padding: 0">
        <q-item-label class="row justify-between items-center header-crop">
          <div class="header">Labelling tools</div>
          <div class="flex-row">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </q-item-label>
        <q-item-label class="sub-header-crop"> Quick Guidelines </q-item-label>
        <q-item-label class="description-crop">action</q-item-label>
        <q-scroll-area style="height: 30vh">
          {{ item }}
          <q-form>
            <div>asd</div>
          </q-form>
        </q-scroll-area>
        <div class="row justify-end q-gutter-x-md q-pa-md">
          <q-btn dense label="Skip" style="background: white; width: 75px" />
          <q-btn
            dense
            label="Submit"
            style="background: #98da56; width: 75px"
          />
        </div>
        <q-item-label class="document-crop row justify-between items-center"
          ><div>document</div>
          <div>
            <q-btn icon="zoom_out_map" size="15px" dense flat /></div
        ></q-item-label>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {
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
