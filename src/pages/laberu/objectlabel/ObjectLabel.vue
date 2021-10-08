<template>
  <div class="content-sidebar">
    <div class="col">
      <ObjectLabelHeader />
      <div class="row justify-center">
        <div class="image-wrapper">
          <div
            id="image-size"
            :style="{ backgroundImage: `url(images/gridbox.png)` }"
            @mousedown="startDrawingBox"
            @mousemove="changeBox"
            @mouseup="stopDrawingBox"
          >
            <Box
              v-if="drawingBox.active"
              :bWidth="drawingBox.width"
              :bHeight="drawingBox.height"
              :bTop="drawingBox.top"
              :bLeft="drawingBox.left"
            />
            <Box
              v-for="(box, index) in boxes"
              :key="index"
              :bTop="box.top"
              :bLeft="box.left"
              :bWidth="box.width"
              :bHeight="box.height"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <ObjectLabelSidebar />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import ObjectLabelHeader from "pages/laberu/objectlabel/ObjectLabelHeader.vue";
import ObjectLabelSidebar from "pages/laberu/objectlabel/ObjectLabelSidebar.vue";
import Box from "pages/laberu/objectlabel/Box.vue";
import { pick } from "lodash";
const getCursorLeft = (e) => {
  return e.pageX - 0;
};

const getCursorTop = (e) => {
  return e.pageY - 0;
};
export default defineComponent({
  components: {
    ObjectLabelHeader,
    ObjectLabelSidebar,
    Box,
  },

  setup() {
    onMounted(() => {
      console.log(
        "Your screen resolution is: " +
          window.screen.width +
          "x" +
          window.screen.height
      );
    });

    return {
      drawingBox: { active: false, top: 0, left: 0, height: 0, width: 0 },
      boxes: [],
      startDrawingBox(e) {
        drawingBox = {
          width: 0,
          height: 0,
          top: getCursorTop(e),
          left: getCursorLeft(e),
          active: true,
        };
      },
      changeBox(e) {
        if (drawingBox.active) {
          drawingBox = {
            ...drawingBox,
            width: getCursorLeft(e) - drawingBox.left,
            height: getCursorTop(e) - drawingBox.top,
          };
        }
      },
      stopDrawingBox() {
        if (drawingBox.active) {
          if (drawingBox.width > 5) {
            boxes.push({
              ...pick(drawingBox, ["width", "height", "top", "left"]),
            });
          }
          drawingBox = {
            active: false,
            top: 0,
            left: 0,
            height: 0,
            width: 0,
          };
        }
      },
    };
  },
});
</script>

<style lang="scss" scoped>
#image-size {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}

@media only screen and(min-width:768px) {
  .image-wrapper {
    width: 320px;
    height: 175px;
    position: relative;
  }
}
@media only screen and(min-width:1024px) {
  .image-wrapper {
    width: 640px;
    height: 427.5px;
    position: relative;
  }
}
@media only screen and(min-width:1440px) {
  .image-wrapper {
    width: 880px;
    height: 517.5px;
    position: relative;
  }
}
</style>
