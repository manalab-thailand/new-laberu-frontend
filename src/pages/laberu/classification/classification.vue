<template>
  <div class="content-sidebar">
    <div class="col">
      <ClassificationHeader />
      <div class="row">
        <div id="app">
          <div
            id="image-wrapper"
            :style="{ backgroundImage: `url(images/gridbox.png)` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="col"><ClassificationSidebar /></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ClassificationSidebar from "src/pages/laberu/classification/ClassificationSidebar.vue";
import ClassificationHeader from "pages/laberu/classification/ClassificationHeader.vue";
export default defineComponent({
  components: {
    ClassificationSidebar,
    ClassificationHeader,
  },
});
</script>

<style lang="scss" scoped></style>
