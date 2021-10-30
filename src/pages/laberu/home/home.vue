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
import { defineComponent, ref } from "vue";
import homeHeader from "src/pages/laberu/home/home-header.vue";
import ProjectList from "src/pages/laberu/home/project-list.vue";
export default defineComponent({
  components: {
    ProjectList,
    homeHeader,
  },
  setup() {
    const projects = [
      {
        id: 0,
        labelType: "labelling",
        project_name: "steve johnson industry",
        ppi: 3,
      },
      {
        id: 1,
        labelType: "classification",
        project_name: "alan donois mcconnahay",
        ppi: 2,
      },
      {
        id: 2,
        labelType: "annotation",
        project_name: "phillip ian jozenkovsky",
        ppi: 1,
      },
      {
        id: 0,
        labelType: "labelling",
        project_name: "pattrick meet smboerboel",
        ppi: 3,
      },
      {
        id: 1,
        labelType: "classification",
        project_name: "james luis slovakia",
        ppi: 2,
      },
    ];
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
