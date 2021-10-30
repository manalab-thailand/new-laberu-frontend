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
        <q-scroll-area style="height: 30vh">
          <q-form>
            <div class="q-pa-md row justify-center q-gutter-y-md">
              <div id="app">
                <div id="label-bar">
                  <ul>
                    <li
                      v-for="(box, i) in boxes"
                      :key="i"
                      :class="{ active: i === activeBoxIndex }"
                    >
                      <q-select
                        bg-color="white"
                        outlined
                        v-model="model"
                        :options="options"
                        v-on:click="makeBoxActive(i)"
                      />
                      <a @click="removeBox(i)">x</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </q-form>
        </q-scroll-area>
        <div class="row justify-end q-gutter-x-md q-pa-md">
          <q-btn dense label="Skip" style="background: white; width: 75px" />
          <q-btn
            dense
            label="Submit"
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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    boxes: { type: Array || Object },
  },
  setup() {
    const options = [
      {
        label: "snake",
        value: "reptiles",
      },
      {
        label: "tree",
        value: "plant",
      },
      {
        label: "sphynx",
        value: "statue",
      },
    ];

    function exp() {
      function startDrawingBox(e) {
        this.drawingBox = {
          width: 0,
          height: 0,
          top: getCoursorTop(e),
          left: getCoursorLeft(e),
          active: true,
        };
      }
      function changeBox(e) {
        if (this.drawingBox.active) {
          this.drawingBox = {
            ...this.drawingBox,
            width: getCoursorLeft(e) - this.drawingBox.left,
            height: getCoursorTop(e) - this.drawingBox.top,
          };
        }
      }
      function stopDrawingBox() {
        if (this.drawingBox.active) {
          if (this.drawingBox.width > 5) {
            this.boxes.push({
              ...pick(this.drawingBox, ["width", "height", "top", "left"]),
            });
          }
          this.drawingBox = {
            active: false,
            top: 0,
            left: 0,
            height: 0,
            width: 0,
          };
        }
      }
      function makeBoxActive(i) {
        this.activeBoxIndex = i;
      }
      function removeBox(i) {
        this.boxes = this.boxes.filter((elem, index) => {
          return index !== i;
        });
        this.activeBoxIndex = null;
      }
      return {
        startDrawingBox,
        changeBox,
        makeBoxActive,
        removeBox,
        stopDrawingBox,
      };
    }

    return {
      text: ref(""),
      model: ref(null),
      options,
      ...exp,
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
});
</script>

<style lang="scss" scoped>
.q-select {
  margin-bottom: -1.5em;
}
</style>
