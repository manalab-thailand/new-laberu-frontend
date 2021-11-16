<template>
  <div v-if="item" class="project-card">
    <div v-if="item.label_type == 'labelling'" class="card-width">
      <div class="flex-row items-center q-pa-md">
        <div><q-icon name="image_search" size="30px" /></div>
        <div class="text-bold q-mx-sm">Object Labelling/ตีกรอบรูปภาพ</div>
      </div>
      <div class="flex-row justify-center project-name q-mb-md">
        {{ item.project_name }}
      </div>
      <div class="flex-row getstart-hover">
        <q-btn
          dense
          flat
          no-caps
          class="text-white col"
          @click="
            $router.push({
              path: 'labelling',
              query: {
                project_id: item?._id,
              },
            })
          "
          >Get Start!<q-icon name="arrow_right_alt"
        /></q-btn>
      </div>
    </div>
    <div v-else-if="item.label_type == 'annotation'" class="card-width">
      <div class="flex-row items-center q-pa-md">
        <div><q-icon name="image_search" size="30px" /></div>
        <div class="text-bold q-mx-sm">Annotation/การบรรยายรูปภาพ</div>
      </div>
      <div class="flex-row justify-center project-name q-mb-md">
        {{ item.project_name }}
      </div>
      <div class="flex-row getstart-hover">
        <q-btn
          dense
          flat
          no-caps
          class="text-white col"
          @click="
            $router.push({
              path: 'annotation',
              query: {
                project_id: item?._id,
              },
            })
          "
          >Get Start!<q-icon name="arrow_right_alt"
        /></q-btn>
      </div>
    </div>
    <div v-else class="card-width">
      <div class="flex-row items-center q-pa-md">
        <div><q-icon name="image_search" size="30px" /></div>
        <div class="text-bold q-mx-sm">Classification/การจัดหมวดหมู่รูปภาพ</div>
      </div>
      <div class="flex-row justify-center project-name q-mb-md">
        {{ item.project_name }}
      </div>
      <div class="flex-row getstart-hover">
        <q-btn
          dense
          flat
          no-caps
          class="text-white col"
          @click="
            $router.push({
              path: 'classification',
              query: {
                project_id: item?._id,
              },
            })
          "
          >Get Start!<q-icon name="arrow_right_alt"
        /></q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IProject } from "src/store/module-project/state";
export default {
  props: {
    item: Object as () => IProject | undefined,
  },
};
</script>

<style lang="scss" scoped>
.project-name {
  width: 100%;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: rgb(57, 56, 87);
}

.project-card {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  transition: all 0.3s;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
}

.project-card:hover {
  transform: scale(1.05) translateY(-5px);
   box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.4);
}

.getstart-hover {
  text-align: center;
  width: 100%;
  max-width: 400px;
  background: #d15eff;
}

.getstart-hover:hover {
  background: #195cd1;
}

.card-width {
  width: 100%;
}
</style>
