<template>
  <div class="content-sidebar">
    <div class="col">
      <ObjectLabelHeader />
      <div class="text-white row justify-center">
        {{ windowSize }}
      </div>
      <div class="row">
        <div id="app">
          <div
            id="image-wrapper"
            :style="{ backgroundImage: `url(images/gridbox.png)` }"
            @mousedown="startDrawingBox"
            @mousemove="changeBox"
            @mouseup="stopDrawingBox"
          >
            <Box
              v-if="drawingBox.active"
              :b-width="drawingBox.width"
              :b-height="drawingBox.height"
              :b-top="drawingBox.top"
              :b-left="drawingBox.left"
            />
            <Box
              v-for="(box, i) in boxes"
              :key="i"
              :bTop="box.top"
              :bLeft="box.left"
              :bLabel="box.label"
              :bWidth="box.width"
              :bHeight="box.height"
              :bActive="i === activeBoxIndex"
              :on-select="makeBoxActive"
              :bIndex="i"
              :on-delete="removeBox"
            />
          </div>
        </div>
      </div>
      <div
        class="text-white flex-col"
        v-for="(no, index) in boxes"
        :key="index"
      >
        <div v-if="windowWide > 1600">
          top:{{ (no.top * 5) / 3 }},left:{{ (no.left * 5) / 3 }},width:{{
            (no.width * 5) / 3
          }},height:{{ (no.height * 5) / 3 }}
        </div>
        <div v-if="windowWide > 1366 && windowWide <= 1600">
          top:{{ no.top * 2 }},left:{{ no.left * 2 }},width:{{
            no.width * 2
          }},height:{{ no.height * 2 }}
        </div>
        <div v-if="windowWide > 1024 && windowWide <= 1366">
          top:{{ (no.top * 40) / 17 }},left:{{ (no.left * 40) / 17 }},width:{{
            (no.width * 40) / 17
          }},height:{{ (no.height * 40) / 17 }}
        </div>
        <div v-if="windowWide > 800 && windowWide <= 1024">
          top:{{ (no.top * 25) / 8 }},left:{{ (no.left * 25) / 8 }},width:{{
            (no.width * 25) / 8
          }},height:{{ (no.height * 25) / 8 }}
        </div>
      </div>
    </div>
    <div class="col">
      <ObjectLabelSidebar :boxes="boxes" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import ObjectLabelHeader from "pages/laberu/objectlabel/ObjectLabelHeader.vue";
import ObjectLabelSidebar from "pages/laberu/objectlabel/ObjectLabelSidebar.vue";
import Box from "components/Box.vue";
import { pick } from "lodash";

const getCoursorLeft = (e) => {
  let vertical = 0;
  // if (window.innerWidth <= 1920 && window.innerWidth > 1600) vertical = 202;
  // else if (window.innerWidth <= 1600 && window.innerWidth > 1360)
  //   vertical = 218;
  // else if (window.innerWidth <= 1360 && window.innerWidth > 1250)
  //   vertical = 250 + (1360 - window.innerWidth) / 2;
  // else if (window.innerWidth <= 1250 && window.innerWidth > 1024)
  //   vertical = 200;
  // else if (window.innerWidth <= 1024 && window.innerWidth > 800) vertical = 320;

  return e.pageX - 255;
};

const getCoursorTop = (e) => {
  return e.pageY - 147;
};

export default defineComponent({
  components: { Box, ObjectLabelSidebar, ObjectLabelHeader },
  data: function () {
    return {
      windowSize: window.innerHeight + "+" + window.innerWidth,
      windowWide: window.innerWidth,
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      },
      boxes: [],
      activeBoxIndex: null,
    };
  },
  methods: {
    startDrawingBox(e) {
      this.drawingBox = {
        width: 0,
        height: 0,
        top: getCoursorTop(e),
        left: getCoursorLeft(e),
        active: true,
      };
    },
    changeBox(e) {
      if (this.drawingBox.active) {
        this.drawingBox = {
          ...this.drawingBox,
          width: getCoursorLeft(e) - this.drawingBox.left,
          height: getCoursorTop(e) - this.drawingBox.top,
        };
      }
    },
    stopDrawingBox() {
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
    },
    makeBoxActive(i) {
      this.activeBoxIndex = i;
    },
    removeBox(i) {
      this.boxes = this.boxes.filter((elem, index) => {
        return index !== i;
      });
      this.activeBoxIndex = null;
    },
  },
});
</script>

<style lang="scss" scoped>
// @media only screen and(min-width:768px) {
//   #image-wrapper {
//     width: 320px;
//     height: 175px;
//     position: relative;
//   }
// }
// @media only screen and(min-width:1024px) {
//   #image-wrapper {
//     width: 640px;
//     height: 427.5px;
//     position: relative;
//   }
// }
// @media only screen and(min-width:1440px) {
//   #image-wrapper {
//     width: 880px;
//     height: 517.5px;
//     position: relative;
//   }
// }
</style>
