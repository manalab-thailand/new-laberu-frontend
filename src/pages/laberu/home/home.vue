<template>
  <div class="flex-col items-center q-pa-md">
    <div class="flex-container">
      <home-header />
      <div class="q-my-lg grid-ish">
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
.home-header {
  font-size: calc(2em + 2vw);
  color: #ffffff;
  font-weight: 900;
  letter-spacing: 10px;
  text-shadow: 3px 3px #acacac;
}
.grid-ish {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.grid-ish > * {
  flex: 0 1 30%;
}
</style>
