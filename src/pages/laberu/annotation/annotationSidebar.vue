<template>
  <div class="label-tools" v-if="imageData">
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
        <q-item-label class="description-crop"
          >example description</q-item-label
        >
        <q-item-label
          class="text-black q-px-lg q-py-md"
          style="font-size: 16px"
          >{{ imageData.annotation?.decsription }}</q-item-label
        >
        <q-item-label class="description-crop">action</q-item-label>
        <q-scroll-area style="height: 30vh">
          <div class="q-pa-md">
            <q-input
              bg-color="white"
              outlined
              v-model="text"
              label="Outlined"
              v-on:keyup.enter="pressEnter()"
            />
            <div class="flex-row tag-wrapper">
              <div v-for="(tag, index) in texts" :key="index">
                <q-btn flat dense no-caps rounded unelevated
                  ><q-badge
                    style="padding: 5px 10px; border-radius: 100px"
                    rounded
                    color="primary"
                  >
                    {{ tag }}
                  </q-badge></q-btn
                >
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-between q-gutter-x-md q-pa-md">
          <!-- <q-btn dense label="Skip" style="background: white; width: 75px" />
             -->
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
import { useQuasar } from "quasar";
import { IProject } from "src/store/module-project/state";
import { IImageData } from "src/store/module-task-image/state";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    project: Object as () => IProject,
    imageData: Object as () => IImageData,
    descriptions: String,
  },
  setup(props, { emit }) {
    const q = useQuasar();

    const text = ref("");
    const texts = ref<string[]>([]);

    const pressEnter = () => {
      if (text.value.replace(/ /g, "") != "") {
        texts.value.push(text.value);
      }
      text.value = "";
      return text.value;
    };

    const onSave = () => {
      if (texts.value.length < 5) {
        q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณากรอกอย่างน้อย 5 คำ",
        });
        return;
      }
      emit("onSave", texts.value);
      texts.value = [];
    };

    const onSkip = () => {
      emit("onSkip");
    };

    return {
      text,
      texts,
      pressEnter,
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
