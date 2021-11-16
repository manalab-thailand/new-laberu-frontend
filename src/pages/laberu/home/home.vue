<template>
  <div class="page-container">
    <home-header />
    <div class="orientation-portrait">
      <div class="flex-row justify-center project-card-list">
        <ProjectList
          v-for="(project, index) in projects"
          :key="index"
          :item="project"
        />
      </div>
    </div>
    <div class="orientation-landscape">
      <div class="flex-row justify-start project-card-list">
        <ProjectList
          v-for="(project, index) in projects"
          :key="index"
          :item="project"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import homeHeader from "src/pages/laberu/home/home-header.vue";
import ProjectList from "src/pages/laberu/home/project-list.vue";
import { useStore } from "src/store";
export default defineComponent({
  name: "home",
  components: {
    ProjectList,
    homeHeader,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      try {
        store.dispatch("moduleProjects/getProjects");
      } catch (error) {}
    });
    const projects = computed(() => store.state.moduleProjects.projects);
    return {
      projects,
    };
  },
});
</script>

<style scoped lang="scss">
.project-card-list {
  padding: 20px;
  flex-wrap: wrap;
  gap: 2vw 1vw;
}
</style>
