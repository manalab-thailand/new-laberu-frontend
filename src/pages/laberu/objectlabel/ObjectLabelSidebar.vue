<template>
  <div class="label-tools">
    <div class="flex-col">
      <div class="flex-row items-center" style="position: relative">
        <div class="sidebar-header">Labelling tools</div>
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

      <div class="flex-row justify-center label-sec">
        <div class="flex-col" v-if="boxes && boxes.length > 0">
          <div v-for="(box, i) in boxes" :key="i" class="q-my-md">
            <q-select
              style="width: 300px"
              bg-color="white"
              label="Select Related Object"
              outlined
              emit-value
              map-options
              v-model="box.label"
              :options="options"
            />
          </div>
        </div>
        <div v-else class="drag-to-label q-mt-sm">drag to start labelling</div>
      </div>
      <div class="flex-row justify-end q-mt-md q-gutter-x-md">
        <q-btn
          dense
          no-caps
          label="Not Found"
          style="background: #dddddd; padding: 5px 1em; color: black"
          @click="onSaveNotFound()"
        />
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
import { IProject } from "src/store/module-project/state";
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "src/store";
import { useQuasar } from "quasar";
import { IImageData, ITaskImage } from "src/store/module-task-image/state";

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

      emit("onSave", detection);
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

      //? xmin = left
      //? ymin = top
      //? xmax = left + width
      //? ymax = top + height

      const detection = props.boxes?.map((box) => {
        return {
          name: box.label,
          xmin: convertSizeX(box.left),
          ymin: convertSizeY(box.top),
          xmax: convertSizeX(box.left + box.width),
          ymax: convertSizeY(box.top + box.height),
        };
      });

      emit("onSave", detection);
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
    };
  },
});
</script>

<style lang="scss" scoped>
.drag-to-label {
  border: dashed 2px rgb(71, 156, 71);
  border-radius: 5px;
  padding: 1em;
  text-align: center;
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
