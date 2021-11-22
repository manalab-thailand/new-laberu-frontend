<template>
  <div class="label-tools" v-if="imageData">
    <div class="flex-col">
      <div class="flex-row items-center" style="position: relative">
        <div class="sidebar-header">Annotation tools</div>
        <!-- document btn -->
        <div class="doc-btn cursor-pointer">
          <img class="doc-icon" src="/images/docBtn.png" alt="" />
        </div>
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
      <q-form @submit="onSubmit" v-if="options">
        <div
          class="flex-row label-sec checkbox-wrapper classification-toggle-btn"
        >
          <div v-for="(option, index) in options" :key="index">
            <q-checkbox
              v-model="result[index].value"
              :label="option.label"
              :color="color[index]"
            />
          </div>
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
      </q-form>
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
