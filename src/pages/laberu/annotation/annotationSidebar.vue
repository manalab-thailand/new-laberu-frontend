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
      <div
        class="flex-row text-blck text-bold q-mt-md q-mb-sm"
        style="font-size: 16px"
      >
        Quick Guidelines
      </div>
      <div class="flex-row sidebar-desc" v-if="imageData">
        {{ imageData.annotation.description }}
      </div>

      <!-- wrapped -->
      <div class="orientation-portrait">
        <div class="flex-row">
          <div class="act-perform-bar-p">
            Annotation Tools <q-icon name="construction" size="20px" />
          </div>
        </div>
      </div>
      <!-- unwrap -->
      <div class="orientation-landscape">
        <div class="flex-row">
          <div class="act-perform-bar-l">
            Annotation Tools <q-icon name="construction" size="20px" />
          </div>
        </div>
      </div>

      <div class="flex-col q-gutter-sm label-sec">
        <q-select
          class="annotation-overflow"
          label="ตัวอย่างการอธิบายข้อความ"
          v-model="example"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          readonly
          input-debounce="0"
          new-value-mode="add-unique"
        />
        <q-select
          class="annotation-overflow"
          label="Enter Description"
          v-model="text"
          use-input
          use-chips
          multiple
          outlined
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
        />
        <div style="opacity: 0.7" v-if="$q.platform.is.mobile">
          กดปุ่ม Return เพื่อแบ่งคำอธิบายเป็นส่วน ๆ
        </div>
        <div style="opacity: 0.7" v-else>
          กดปุ่ม Enter เพื่อแบ่งคำอธิบายเป็นส่วน ๆ
        </div>
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
    project: {} as () => IProject,
    imageData: {} as () => IImageData,
    descriptions: String,
  },
  setup(props, { emit }) {
    const q = useQuasar();

    const text = ref([]);

    const example = ref([
      "สวัสดีตอนเช้า",
      "ชาว Laberu",
      "อากาศแจ่มใส",
      "หัวใจเบิกบาน",
      "สงกรานต์ยังไม่ถึง",
    ]);

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
      // emit("onSave", text.value);
      text.value = [];
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      text,
      onSave,
      onSkip,
      example,
    };
  },
});
</script>

<style lang="scss"></style>
