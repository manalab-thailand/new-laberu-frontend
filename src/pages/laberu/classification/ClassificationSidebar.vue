<template>
  <div class="label-tools" v-if="imageData && project">
    <div class="flex-col">
      <div class="flex-row items-center" style="position: relative">
        <div class="sidebar-header">{{ project.project_name }}</div>
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
        Project Description
      </div>
      <div class="flex-row sidebar-desc">
        {{ project.project_desc }}
      </div>

      <!-- wrapped -->
      <div class="orientation-portrait">
        <div class="flex-row">
          <div class="act-perform-bar-p">
            Classification Tools <q-icon name="construction" size="20px" />
          </div>
        </div>
      </div>
      <!-- unwrap -->
      <div class="orientation-landscape">
        <div class="flex-row">
          <div class="act-perform-bar-l">
            Classification Tools <q-icon name="construction" size="20px" />
          </div>
        </div>
      </div>

      <div class="label-sec q-my-sm" style="opacity: 0.7">
        เป็นการจัดหมวดหมู่ของรูปภาพ
      </div>

      <div
        class="flex-row checkbox-wrapper classification-toggle-btn"
        v-if="options"
      >
        <div v-for="(option, index) in options" :key="index">
          <q-checkbox
            v-model="result[index].value"
            :label="option.label"
            :color="color[index]"
          />
        </div>
      </div>
      <div style="opacity: 0.7" class="q-mt-sm">
        เลือกตัวเลือกให้สอดคล้องกับหมวดหมู่ของรูปภาพ
      </div>
      <div class="flex-row justify-end q-mt-md q-gutter-x-md">
        <q-btn
          @click="onSaveNotFound()"
          dense
          no-caps
          label="Not Found"
          style="background: #050505; padding: 5px 1em; color: white"
        />
        <q-btn
          @click="onSkip()"
          dense
          no-caps
          label="Skip"
          style="background: #7a7a7a; padding: 5px 1em; color: white"
        />
        <q-btn
          @click="onSave()"
          dense
          no-caps
          label="Submit"
          style="background: #149bfc; padding: 5px 1em; color: white"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.checkbox-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 256px;
}

.checkbox-wrapper > * {
  flex: 0 1 50%;
}

.classification-toggle-btn {
  .q-toggle__label {
    min-width: 5em;
  }
}
</style>
<script lang="ts">
import { useQuasar } from "quasar";
import { IProject } from "src/store/module-project/state";
import { IImageData } from "src/store/module-task-image/state";
import { defineComponent, ref, watch, toRef } from "vue";
import { IEventResult } from "./classification.vue";

export default defineComponent({
  props: {
    project: Object as () => IProject,
    imageData: Object as () => IImageData,
  },
  setup(props, { emit }) {
    const q = useQuasar();

    const options = props.project?.config_input.classification!.map(
      (config) => ({
        label: config.display_name,
        value: config.value,
      })
    );

    const color = ref(["teal", "orange", "red", "cyan"]);

    const result = ref(
      options!.map((option) => ({
        label: option.value,
        value: false,
      }))
    );

    const onSaveNotFound = () => {
      const classResult = result.value.reduce((state, cur) => {
        return {
          ...state,
          [cur.label]: false,
        };
      }, {} as any);

      emit("onSave", {
        result: classResult,
        result_type: "Not Found",
      } as IEventResult);

      result.value = options!.map((option) => ({
        label: option.value,
        value: false,
      }));
    };

    const onSave = () => {
      const validateInput = result.value.filter((val) => !val.value);
      if (validateInput.length == result.value.length) {
        q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณาเลือกหมวดหมู่ของรูปภาพอย่างน้อย 1 หมวดหมู่",
        });
        return;
      }

      const classResult = result.value.reduce((state, cur) => {
        return {
          ...state,
          [cur.label]: cur.value,
        };
      }, {} as any);

      emit("onSave", {
        result: classResult,
        result_type: "Found",
      } as IEventResult);

      result.value = options!.map((option) => ({
        label: option.value,
        value: false,
      }));
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      onSave,
      onSkip,
      onSaveNotFound,
      options,
      result,
      color,
    };
  },
});
</script>
