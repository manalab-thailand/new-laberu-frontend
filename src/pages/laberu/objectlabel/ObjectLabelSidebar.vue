<template>
  <div class="label-tools">
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
        <div class="flex-col" v-if="boxes.length > 0">
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
          label="Skip"
          style="background: #7a7a7a; padding: 5px 1em; color: white"
        />
        <q-btn
          dense
          no-caps
          label="Submit"
          style="background: #149bfc; padding: 5px 1em; color: white"
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

interface Boxes {
  top: number;
  left: number;
  label: string;
  width: number;
  height: number;
}

export default defineComponent({
  props: {
    boxes: Object as () => Boxes[],
    project: Object as () => IProject,
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

      const detection = props.boxes?.map((box) => ({
        name: box.label,
        xmin: box.left,
        ymin: box.top,
        xmax: box.left + box.width,
        ymax: box.top + box.height,
      }));

      emit("onSave", detection);
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      text: ref(""),
      model: ref(null),
      options,
      onSave,
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
