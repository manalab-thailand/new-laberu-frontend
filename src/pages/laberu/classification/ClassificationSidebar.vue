<template>
  <div class="label-tools">
    <q-list
      ><q-form @submit="onSubmit">
        <q-item class="flex-col" style="padding: 0">
          <q-item-label class="row justify-between items-center header-crop">
            <div class="header">Labelling tools</div>
            <div class="flex-row">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </q-item-label>
          <q-item-label class="sub-header-crop">
            Quick Guidelines
          </q-item-label>
          <q-item-label class="description-crop">action</q-item-label>
          <q-scroll-area style="height: 30vh" v-if="options">
            <div class="q-pa-md">
              <div
                class="text-black classification-toggle-btn"
                v-for="(option, index) in options"
                :key="index"
              >
                <q-checkbox
                  v-model="result[index].value"
                  :label="option.label"
                  :color="color[index]"
                />
              </div>
            </div>
          </q-scroll-area>
          <div class="row justify-end q-gutter-x-md q-pa-md">
            <q-btn
              dense
              label="Skip"
              style="background: white; width: 75px"
              @click="onSkip()"
            />
            <q-btn
              dense
              label="Submit"
              type="submit"
              style="background: #98da56; width: 75px"
            />
          </div>
          <q-item-label class="document-crop row justify-between items-center"
            ><div>document</div>
            <div>
              <q-btn icon="zoom_out_map" size="15px" dense flat /></div
          ></q-item-label> </q-item
      ></q-form>
    </q-list>
  </div>
</template>

<script lang='ts'>
import { useQuasar } from "quasar";
import { IProject } from "src/store/module-project/state";
import { IImageData } from "src/store/module-task-image/state";
import { defineComponent, ref, watch, toRef } from "vue";

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

    const onSubmit = () => {
      const validateInput = result.value.filter((val) => !val.value);
      if (validateInput.length == result.value.length) {
        q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณาใส่ติ๊กถูกสักช่องไอสัดดด",
        });
        return;
      }

      const classResult = result.value.reduce((state, cur) => {
        return {
          ...state,
          [cur.label]: cur.value,
        };
      }, {} as any);

      emit("onSave", classResult);

      result.value = options!.map((option) => ({
        label: option.value,
        value: false,
      }));
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      onSubmit,
      onSkip,
      options,
      result,
      color,
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
</style>
