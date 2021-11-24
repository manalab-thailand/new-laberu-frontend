<template>
  <div class="label-tools" v-if="imageData">
    <div class="flex-col">
      <div class="flex-row items-center" style="position: relative">
        <div class="sidebar-header">Annotation tools</div>
        <q-icon name="construction" size="20px" />
        <!-- document btn -->
        <a
          href="https://www.w3schools.com"
          target="_blank"
          class="doc-btn cursor-pointer"
        >
          <img class="doc-icon" src="/images/docBtn.png" alt="" />
          <q-tooltip> Guide Document </q-tooltip>
        </a>
      </div>
      <div
        class="flex-row text-blck text-bold q-mt-md q-mb-sm"
        style="font-size: 16px"
      >
        Quick Guidelines
      </div>
      <div class="flex-row sidebar-desc">
        {{ imageData.annotation?.decsription }}
      </div>

      <!-- wrapped -->
      <div class="orientation-portrait">
        <div class="flex-row">
          <div class="act-perform-bar-p">Action Performance</div>
        </div>
      </div>
      <!-- unwrap -->
      <div class="orientation-landscape">
        <div class="flex-row">
          <div class="act-perform-bar-l">Action Performance</div>
        </div>
      </div>

      <div class="flex-row label-sec">
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

      <div class="flex-row justify-end q-mt-md q-gutter-x-md">
        <q-btn
          dense
          no-caps
          label="Skip"
          style="background: #7a7a7a; padding: 5px 1em; color: white"
          @click="onSkip()"
        />
        <q-btn
          dense
          no-caps
          label="Submit"
          style="background: #149bfc; padding: 5px 1em; color: white"
          @click="onSave()"
        />
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

<style lang="scss"></style>
