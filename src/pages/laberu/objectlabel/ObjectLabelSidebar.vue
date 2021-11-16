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

        <div class="q-mt-sm flex-col to-center label-overflow" v-if="boxes">
          <div v-for="(box, i) in boxes" :key="i" class="q-my-md">
            <q-select
              style="width: 300px"
              bg-color="white"
              outlined
              emit-value
              map-options
              v-model="box.label"
              :options="options"
            />
          </div>
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
        <q-item-label class="document-crop row justify-between items-center"
          ><div>document</div>
          <div>
            <q-btn icon="zoom_out_map" size="15px" dense flat /></div
        ></q-item-label>
      </q-item>
    </q-list>
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
