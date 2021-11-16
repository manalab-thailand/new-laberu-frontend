<template>
  <div class="label-tools" v-if="imageData">
    <div class="flex-col">
      <div class="row justify-between items-center header-crop">
        <div class="header">Labelling tools</div>
        <div class="flex-row">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
      <div class="sub-header-crop">Quick Guidelines</div>
      <div class="description-crop">example description</div>
      <div class="text-black q-px-lg q-py-md" style="font-size: 16px">
        {{ imageData.annotation?.decsription }}
      </div>
      <div class="description-crop">action</div>

      <div class="q-pa-md scrollable">
        <q-select
          class="annotation-overflow"
          label="Mode: 'add-unique'"
          filled
          v-model="text"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
        />
      </div>

      <div class="row justify-between q-pa-md">
        <q-btn
          dense
          label="Skip"
          @click="onSkip"
          style="background: #98da56; width: 75px"
        />
        <q-btn
          dense
          label="Submit"
          @click="onSave"
          style="background: #98da56; width: 75px"
        />
      </div>

      <div class="document-crop row justify-between items-center">
        <div>document</div>
        <div>
          <q-btn icon="zoom_out_map" size="15px" dense flat />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { IProject } from "src/store/module-project/state";
import { IImageData } from "src/store/module-task-image/state";
import { log } from "util";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    project: Object as () => IProject,
    imageData: Object as () => IImageData,
    descriptions: String,
  },
  setup(props, { emit }) {
    const q = useQuasar();

    const text = ref<any>(null);

    const onSave = () => {
      if (text.value.length < 5) {
        q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณากรอกอย่างน้อย 5 คำ",
        });
        return;
      }
      emit("onSave", text.value);
      text.value = null;
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      text,
      onSave,
      onSkip,
    };
  },
});
</script>

<style lang="scss">
.classification-toggle-btn {
  .q-toggle__label {
    min-width: 5em;
  }
}


.tag-wrapper {
  max-width: 32vw;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
  gap: 0.2em 0.5em;
}
</style>
