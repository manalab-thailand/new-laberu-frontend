<template>
  <div class="content-sidebar" style="flex-wrap: wrap">
    <div class="col">
      <div class="row justify-center img-css">
        <div class="outer-img-wrapper">
          <div class="inner-img-wrapper">
            <img
              :src="image_url"
              style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <annotationHeader />
      <annotationSidebar
        :project="project"
        :imageData="imageData"
        @onSave="onSave($event)"
        @onSkip="initState()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-img-wrapper {
  top: 50%;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
}
.main-img-wrapper {
  justify-content: center;
  width: 50vw;
  height: 50vh;
  position: relative;
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import annotationSidebar from "src/pages/laberu/annotation/annotationSidebar.vue";
import annotationHeader from "pages/laberu/annotation/annotationHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { StateInterface, useStore } from "src/store";
import { useQuasar } from "quasar";
import { ExecException } from "child_process";

export default defineComponent({
  components: {
    annotationSidebar,
    annotationHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const q = useQuasar();

    const { project_id, group_id } = route.query;

    const project = computed(() =>
      store.state.moduleProjects.projects.find(
        (project) => project._id == project_id
      )
    );
    const user = computed(() => store.state.moduleAuth.user);
    const taskImage = computed(() => store.state.moduleTaskImage.task_image);
    const imageData = computed(() => store.state.moduleTaskImage.image_data);

    const image_url = ref<string>();
    const startedAt = ref<Date>();

    const initState = async () => {
      try {
        q.loading.show();

        const resp = await store.dispatch("moduleTaskImage/getTaskImage", {
          user_id: user.value._id,
          project_id: project.value?._id,
        });

        if (!resp) {
          q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Task image not avaliable for you",
          });
          router.go(-1);
          return;
        }

        startedAt.value = new Date();
        image_url.value = `${project.value?.base_image_url}/${taskImage.value.shortcode}.${project.value?.image_type}`;
      } catch (error) {
        throw new Error((error as ExecException).message);
      } finally {
        q.loading.hide();
      }
    };

    onMounted(async () => {
      try {
        await initState();
      } catch (error) {
        console.log(error);
      }
    });

    const onSave = async (data: any) => {
      const result = data.join(" ");

      const taskSuccess = ref({
        shortcode: taskImage.value.shortcode,
        result: {
          annotation: {
            decsription: result,
          },
        },
        task_id: taskImage.value._id,
        user_id: user.value._id,
        project_id: project.value?._id,
        custom: {
          user_id: user.value._id,
          group_id: group_id ? group_id : null,
        },
        startedAt: startedAt.value,
      });

      try {
        q.loading.show();
        await store.dispatch(
          "moduleTaskSuccess/createTaskSuccess",
          taskSuccess.value
        );
        await initState();
      } catch (error) {
        console.log(error);
      } finally {
        q.loading.hide();
      }
    };

    return {
      taskImage,
      imageData,
      project,
      image_url,
      onSave,
      initState,
    };
  },
});
</script>
