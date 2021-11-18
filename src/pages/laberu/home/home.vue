<template>
  <HomeBanner />
  <div class="flex-row justify-center">
    <div>
      <div class="flex-row project-card-list">
        <ProjectList
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
          :style="`width: ${widthPerItem}%`"
          class="project-card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import homeHeader from "src/pages/laberu/home/home-header.vue";
import ProjectList from "src/pages/laberu/home/project-list.vue";
import HomeBanner from "src/pages/laberu/home/HomeBanner.vue";
import { useStore } from "src/store";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "home",
  components: {
    ProjectList,
    homeHeader,
    HomeBanner,
  },
  setup() {
    const q = useQuasar();
    const store = useStore();

    onMounted(async () => {
      try {
        q.loading.show();
        await store.dispatch("moduleProjects/getProjects");
      } catch (error) {
        console.log(error);
      } finally {
        q.loading.hide();
      }
    });
    const projects = computed(() => store.state.moduleProjects.projects);

    const widthPerItem = computed(() => {
      const { width } = q.screen;
      const itemPerRow = width < 1000 ? `${width / 2}`.charAt(0) : "4";
      return 100 / parseInt(itemPerRow, 10) - 2;
    });
    return {
      projects,
      widthPerItem,
    };
  },
});
</script>

<style scoped lang="scss"></style>
