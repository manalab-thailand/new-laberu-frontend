<template>
  <div class="flex-col items-center q-pa-md">
    <div class="flex-container">
        <home-header />
      <div class="q-my-lg">
        <project-list />
      </div>
    </div>
  </div>
</template>

<script>
import ref from "vue";
import homeHeader from "src/pages/laberu/home/home-header.vue";
import ProjectList from 'src/pages/laberu/home/project-list.vue';
export default {
  components: {
    ProjectList,
    homeHeader,
  },
    
};
</script>

<style scoped lang="scss">
.home-header {
  font-size: calc(2em + 2vw);
  color: #ffffff;
  font-weight: 900;
  letter-spacing: 10px;
  text-shadow: 3px 3px #acacac;
}
</style>
