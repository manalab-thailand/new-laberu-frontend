<template>
  <div class="label-tools" v-if="project">
    <div class="flex-col">
      <div class="flex-row items-center" style="position: relative">
        <div class="sidebar-header">{{ project.project_name }}</div>
        <!-- document btn -->
        <a
          href="https://storage.googleapis.com/smooth-street-100k/instruction/Label_document.pdf"
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
          <div class="act-perform-bar-p">Object Labelling Tools</div>
        </div>
      </div>
      <!-- unwrap -->
      <div class="orientation-landscape">
        <div class="flex-row">
          <div class="act-perform-bar-l">Object Labelling Tools</div>
        </div>
      </div>

      <div style="opacity: 0.7" class="q-mt-md label-sec">
        เป็นการตีกรอบเฉพาะจุดที่สนใจภายในรูปภาพ
      </div>

      <q-form @submit="onSave()">
        <div class="flex-row justify-center">
          <div class="flex-col" v-if="boxes && boxes.length > 0">
            <div v-for="(box, i) in boxes" :key="i" class="q-my-md">
              <q-select
                style="width: 100%; min-width: 300px; z-index: 1"
                bg-color="white"
                label="Select Related Object"
                outlined
                emit-value
                map-options
                v-model="box.label"
                :options="options"
                :rules="[(val) => !!val || 'กรุณาเลือกตัวเลือกในช่องตัวเลือก']"
              />
            </div>
          </div>
          <div v-else class="drag-to-label q-mt-sm">
            วาดกรอบในรูปภาพโดยการคลิกเพื่อเริ่มการตีกรอบจุดที่สนใจ
          </div>
        </div>

        <div class="flex-row justify-end q-mt-md">
          <q-btn
            @click="onSaveNotFound()"
            dense
            no-caps
            label="Not Found"
            style="background: #050505; padding: 5px 1em; color: white"
          />
          <q-btn
            no-wrap
            dense
            no-caps
            label="Skip"
            class="q-mx-md"
            style="background: #7a7a7a; padding: 5px 10px; color: white"
            @click="onSkip()"
          />
          <q-btn
            no-wrap
            dense
            no-caps
            type="submit"
            label="Submit"
            style="background: #149bfc; padding: 5px 10px; color: white"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { IProject } from "src/store/module-project/state";
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "src/store";
import { useQuasar } from "quasar";
import { IImageData, ITaskImage } from "src/store/module-task-image/state";
import { IEventResult } from "../classification/classification.vue";

interface Boxes {
  top: number;
  left: number;
  label: string;
  width: number;
  height: number;
}

export default defineComponent({
  props: {
    boxes: {} as () => Boxes[],
    project: {} as () => IProject,
    taskImage: {} as () => ITaskImage,
    imageData: {} as () => IImageData,
    imageSize: {} as () => { width: string; height: string },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const store = useStore();
    const q = useQuasar();

    const project = computed(() =>
      store.state.moduleProjects.projects.find(
        (project) => project._id == route.query.project_id
      )
    );

    const options = project.value?.config_input.labelling?.map((config) => ({
      label: config.display_name,
      value: config.value,
    }));

    const onSaveNotFound = () => {
      const detection = [
        {
          name: "Not Found",
          xmin: 0,
          ymin: 0,
          xmax: 0,
          ymax: 0,
        },
      ];

      emit("onSave", {
        result: detection,
        result_type: "Not Found",
      } as IEventResult);
    };

    const onSave = () => {
      if ((props.boxes?.length as number) < 1) {
        q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณาตีกรอบอย่างน้อย 1 จุด",
        });
        return;
      }

      const detection = props.boxes?.map((box) => {
        return {
          name: box.label,
          xmin: Number(convertSizeX(box.left).toFixed(0)),
          ymin: Number(convertSizeY(box.top).toFixed(0)),
          xmax: Number(convertSizeX(box.left + box.width).toFixed(0)),
          ymax: Number(convertSizeY(box.top + box.height).toFixed(0)),
        };
      });

      emit("onSave", {
        result: detection,
        result_type: "Found",
      } as IEventResult);
    };

    const convertSizeX = (detection: number) => {
      const realSizeX = Number(props.imageData!.labelling.width);
      return (
        (realSizeX / 100) * ((detection / Number(props.imageSize!.width)) * 100)
      );
    };

    const convertSizeY = (detection: number) => {
      const realSizeY = Number(props.imageData!.labelling.height);
      return (
        (realSizeY / 100) *
        ((detection / Number(props.imageSize!.height)) * 100)
      );
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      text: ref(""),
      model: ref(null),
      options,
      onSave,
      onSaveNotFound,
      onSkip,

      convertSizeY,
      convertSizeX,
    };
  },
});
</script>

<style lang="scss" scoped>
.drag-to-label {
  border: dashed 2px rgb(71, 156, 71);
  border-radius: 5px;
  padding: 1em;
  text-align: left;
  width: 100%;
}

.q-select {
  margin-bottom: -1.5em;
}

.label-overflow::-webkit-scrollbar {
  width: 5px;
}
.label-overflow::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #b4b4b4;
  box-shadow: inset 2px 2px 5px 0 rgba(rgb(194, 70, 70), 0.5);
}
.label-overflow::-webkit-scrollbar-track {
  margin: 0 400px 0 400px;
  background-color: #dbdbdb;
  border-radius: 100px;
}
</style>
