<template>
  <div v-if="project" class="project-card">
    <div class="card-width">
      <div class="flex-row items-center q-pa-md">
        <div><q-icon name="image_search" size="30px" /></div>
        <div class="text-bold q-mx-sm">
          {{ project.label_type }}/{{ labelThai(project.label_type) }}
        </div>
      </div>
      <div class="flex-row justify-center project-name q-mb-md">
        {{ project.project_name }}
      </div>
      <div class="flex-row getstart-hover">
        <q-btn
          dense
          flat
          no-caps
          color="primary"
          class="text-white col"
          label="Get Start"
          icon-right="arrow_right_alt"
          @click="onSelectedProject(project)"
        />
      </div>
      <div class="flex-row">
        <q-btn
          dense
          flat
          no-caps
          :color="colorButton(project.label_type)"
          label="Get Start"
          icon-right="arrow_right_alt"
          @click="onSelectedProject(project)"
        />
      </div>
      <q-dialog v-model="customDialog">
        <q-card style="width: 700px">
          <q-card-section>
            <div class="text-h6">Select Group</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              :options="customAttribute"
              emit-value
              map-options
              v-model="group_id"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              @click="pushPage()"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { IProject } from "src/store/module-project/state";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    project: Object as () => IProject | undefined,
  },
  setup() {
    const router = useRouter();

    const arrType = [
      {
        label_type: "classification",
        thai_name: "การจัดหมวดหมู่รูปภาพ",
        color: "primary",
      },
      {
        label_type: "labelling",
        thai_name: "การตีกรอบรูปภาพ",
        color: "negative",
      },
      {
        label_type: "annotation",
        thai_name: "การอธิบายรูปภาพ",
        color: "positive",
      },
    ];

    const labelThai = (label_type: string) => {
      return arrType.find((type) => type.label_type == label_type)!.thai_name;
    };

    const colorButton = (label_type: string) => {
      return arrType.find((type) => type.label_type == label_type)!.color;
    };

    const customAttribute = ref<{ label: string; value: string }[]>([]);
    const customDialog = ref(false);
    const selectedProject = ref<IProject>();
    const group_id = ref("");
    const onSelectedProject = (project: IProject | undefined) => {
      selectedProject.value = project!;
      if (project!.require_custom) {
        customAttribute.value = project!.custom_attribute.map((custom) => ({
          label: custom.display_name,
          value: custom.value,
        }));
        customDialog.value = !customDialog.value;
      } else {
        pushPage();
      }
    };

    const pushPage = () => {
      router.push({
        path: selectedProject.value!.label_type,
        query: {
          group_id: group_id.value,
          project_id: selectedProject.value?._id,
        },
      });
    };

    return {
      labelThai,
      onSelectedProject,
      pushPage,
      colorButton,
      group_id,
      customAttribute,
      customDialog,
    };
  },
});
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
