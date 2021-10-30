<template>
  <div class="content-sidebar" style="flex-wrap:wrap">
    <div class="col">
      <ClassificationHeader />
      <div class="row justify-center q-mb-lg">
        <div
          class="sub-image-wrapper"
          :style="{ backgroundImage: `url(images/gridbox.png)` }"
        ></div>
      </div>
      <q-card
        v-if="submitResult.length > 0"
        flat
        bordered
        class="q-mt-md bg-grey-2"
      >
        <q-card-section
          >Submitted form contains the following formData (key =
          value):</q-card-section
        >
        <q-separator />
        <q-card-section class="row q-gutter-sm items-center">
          <div
            v-for="(item, index) in submitResult"
            :key="index"
            class="
              q-px-sm q-py-xs
              bg-grey-8
              text-white
              rounded-borders
              text-center text-no-wrap
            "
          >
            {{ item.label }} = {{ item.value }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col"><ClassificationSidebar @onSubmit="onSubmit" /></div>
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
  setup() {
    const submitResult = ref([]);
    const onSubmit = (data) => {
      submitResult.value = data;
      console.log(data);
    };
    return {
      submitResult,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.sub-image-wrapper {
  max-width: 50vw;
  width: 100%;
  height: 28.25vw;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
</style>
