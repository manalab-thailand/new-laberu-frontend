<template>
  <div class="content-sidebar" style="flex-wrap: wrap">
    <div class="col">
      <annotationHeader />
      <div class="row justify-center q-mb-lg">
        <div
          class="sub-image-wrapper"
          :style="{ backgroundImage: `url(${image_url})` }"
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
            {{ item }}
            <!-- {{ item.label }} = {{ item.value }} -->
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <annotationSidebar
        :project="project"
        :imageData="imageData"
        @onSave="onSave($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import annotationSidebar from "src/pages/laberu/annotation/annotationSidebar.vue";
import annotationHeader from "pages/laberu/annotation/annotationHeader.vue";
import { useRoute } from "vue-router";
import { useStore } from "src/store";
export default defineComponent({
  components: {
    annotationSidebar,
    annotationHeader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const project = computed(() =>
      store.state.moduleProjects.projects.find(
        (project) => project._id == route.query.project_id
      )
    );

    const user = computed(() => store.state.moduleAuth.user);

    const submitResult = ref([]);
    // const onSubmit = (data:any) => {
    //   submitResult.value = data;
    //   console.log(data);
    // };

    onMounted(async () => {
      try {
        store.dispatch("moduleTaskImage/getTaskImage", {
          user_id: user.value._id,
          project_id: project.value?._id,
        });
      } catch (error) {}
    });
    const taskImage = computed(() => store.state.moduleTaskImage.task_image);
    const imageData = computed(() => store.state.moduleTaskImage.image_data);

    const image_url = `${project.value?.base_image_url}/${taskImage.value.shortcode}.${project.value?.image_type}`;
    console.log(image_url);

    const onSave = (data: any) => {
      const result = data.join(" ");
      console.log(result);
    };

    return {
      submitResult,
      taskImage,
      imageData,
      project,
      onSave,
      image_url,
      // onSubmit,
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
