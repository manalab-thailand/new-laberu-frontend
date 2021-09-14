<template>
  <div v-if="item">
    <div class="project-card content-between">
      <div v-if="item.labelType == 'labelling'">
        <div class="row items-center q-pa-md">
          <div><q-icon name="image_search" size="30px" /></div>
          <div class="text-bold q-mx-sm text-wrapper">
            Object Labelling/ตีกรอบรูปภาพ
          </div>
        </div>
        <div class="row project-name q-mb-md justify-center">
          {{ item.project_name }}
        </div>
        <div class="row justify-center getstart-hover">
          <q-btn
            dense
            flat
            no-caps
            class="text-white col"
            @click="$router.push({ path: 'labelling' })"
            >Get Start!<q-icon name="arrow_right_alt"
          /></q-btn>
        </div>
      </div>
      <div v-else-if="item.labelType == 'annotation'">
        <div class="row items-center q-pa-md">
          <div><q-icon name="image_search" size="30px" /></div>
          <div class="text-bold q-mx-sm text-wrapper">
            Annotation/การบรรยายรูปภาพ
          </div>
        </div>
        <div class="row project-name q-mb-md justify-center">
          {{ item.project_name }}
        </div>
        <div class="row justify-center getstart-hover">
          <q-btn
            dense
            flat
            no-caps
            class="text-white col"
            @click="$router.push({ path: 'annotation' })"
            >Get Start!<q-icon name="arrow_right_alt"
          /></q-btn>
        </div>
      </div>
      <div v-else>
        <div class="row items-center q-pa-md">
          <div><q-icon name="image_search" size="30px" /></div>
          <div class="text-bold q-mx-sm text-wrapper">
            Classification/การจัดหมวดหมู่รูปภาพ
          </div>
        </div>
        <div class="row project-name q-mb-md justify-center">
          {{ item.project_name }}
        </div>
        <div class="row justify-center getstart-hover">
          <q-btn
            dense
            flat
            no-caps
            class="text-white col"
            @click="$router.push({ path: 'classification' })"
            >Get Start!<q-icon name="arrow_right_alt"
          /></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.project-name {
  font-size: 28px;
  font-weight: bold;
  color: rgb(57, 56, 87);
  width: 250px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 30px;
}

.project-card {
  width: 100%;
  max-width: 400px;
  height: 200px;
  display: flex;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  transition: all 0.3s;
}

.project-card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.05) translateY(-5px);
}

.text-wrapper {
  max-width: 166px;
}

.getstart-hover {
  width: 100%;
  background: #d15eff;
}

.getstart-hover:hover {
  background: #195cd1;
}
</style>
