<template>
  <div class="content-sidebar">
    <div class="col img-wrapper">
      <div class="orientation-portrait">
        <div
          class="img-bg-s"
          :style="{ backgroundImage: `url(${this.image_url})` }"
        ></div>
      </div>
      <div class="orientation-landscape">
        <div class="flex-row justify-center items-center" style="height: 90vh">
          <div
            class="img-bg"
            :style="{ backgroundImage: `url(${this.image_url})` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="col">
      <ClassificationSidebar
        :project="project"
        :imageData="imageData"
        @onSave="onSave($event)"
        @onSkip="initState()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ClassificationSidebar from "src/pages/laberu/classification/ClassificationSidebar.vue";
import { useStore } from "src/store";
import { useQuasar } from "quasar";
import { ExecException } from "child_process";

interface IEventResult {
  value: boolean;
  label: string;
}

export default defineComponent({
  components: {
    ClassificationSidebar,
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
          project_id: project.value!._id,
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

    const onSave = async (result: IEventResult) => {
      const taskSuccess = ref({
        shortcode: taskImage.value.shortcode,
        result: {
          classification: {
            class: result,
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
      project,
      imageData,
      image_url,
      initState,
      onSave,
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
