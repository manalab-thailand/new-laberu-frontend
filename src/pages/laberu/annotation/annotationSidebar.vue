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
          <q-item-label class="description-crop"
            >example desciption</q-item-label
          >
          <q-item-label
            class="text-white q-px-lg q-py-md"
            style="font-size: 16px"
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem nulla
            fugiat repellat nobis sint? Optio reprehenderit labore amet nisi
            laudantium? Totam temporibus eum placeat sunt?</q-item-label
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
          <div class="row justify-end q-gutter-x-md q-pa-md">
            <!-- <q-btn dense label="Skip" style="background: white; width: 75px" />
            <q-btn
              dense
              label="Submit"
              type="submit"
              style="background: #98da56; width: 75px"
            /> -->
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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    return {
      text: ref(""),
      texts: ref([]),
      pressEnter() {
        if (this.text.replace(/ /g, "") != "") {
          this.texts.push(this.text);
        }
        this.text = "";
        return this.texts;
      },
      actions: ref([
        {
          label: "ads",
          value: false,
        },
        {
          label: "snake",
          value: false,
        },
        {
          label: "food",
          value: false,
        },
        {
          label: "travel",
          value: false,
        },
      ]),
      onSubmit(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [label, value] of formData.entries()) {
          data.push({
            label,
            value,
          });
        }
        emit("onSubmit", data);
      },
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
