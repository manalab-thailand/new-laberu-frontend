<template>
  <div class="q-gutter-md flex-row wrapper justify-center">
    <project-item
      v-for="(project, index) in projects"
      :key="index"
      :item="project"
    />
  </div>
</template>

<script>
import projectItem from "src/pages/laberu/home/project-item.vue";
export default {
  components: {
    projectItem,
  },

  data: () => ({
    projects: [
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
    ],
  }),
};
</script>

<style lang="scss" scoped>
.wrapper {
  flex-wrap: wrap;
}
</style>
