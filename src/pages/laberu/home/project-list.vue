<template>
  <div v-if="project" class="project-card">
    <div class="flex-row items-center">
      <img style="width: 100%" :src="randomImage(project.label_type)" alt="" />
    </div>
    <div class="flex-row justify-start text-section q-my-md">
      {{
        project.label_type == "labelling"
          ? "Object Label"
          : capFirstLetter(project.label_type)
      }}
      {{ labelThai(project.label_type) }}
    </div>
    <div class="flex-row justify-start sub-text-section q-my-md">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis nam
      minima voluptate sunt praesentium aperiam quam optio magni explicabo
      voluptatem.
    </div>
    <div class="flex-row justify-end">
      <q-btn
        dense
        flat
        no-caps
        label="Get Start"
        class="get-start-btn"
        @click="onSelectedProject(project)"
      />
    </div>
    <q-dialog v-model="customDialog">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h6">Select Group</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-x-md flex-row">
          <q-select
            :options="customAttribute"
            emit-value
            map-options
            ref="groupInput"
            v-model="group_id"
            label="Group"
            class="col"
            outlined
            dense
          />
          <q-input
            outlined
            dense
            class="col"
            label="Password"
            v-model="accessPwd"
            @keyup.enter="validateAccessPwd()"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="validateAccessPwd()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { IProject } from "src/store/module-project/state";
import { useRouter } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  props: {
    project: Object as () => IProject | undefined,
  },
  setup(props) {
    const q = useQuasar();
    const router = useRouter();

    const arrType = [
      {
        label_type: "classification",
        thai_name: "การจัดหมวดหมู่รูปภาพ",
        color: "primary",
        image: [
          "/images/classification/c1.png",
          "/images/classification/c2.png",
          "/images/classification/c3.png",
        ],
      },
      {
        label_type: "labelling",
        thai_name: "การตีกรอบรูปภาพ",
        color: "negative",
        image: [
          "/images/labelling/l1.png",
          "/images/labelling/l2.png",
          "/images/labelling/l3.png",
        ],
      },
      {
        label_type: "annotation",
        thai_name: "การอธิบายรูปภาพ",
        color: "positive",
        image: [
          "/images/annotation/a1.png",
          "/images/annotation/a2.png",
          "/images/annotation/a3.png",
        ],
      },
    ];

    const randomImage = (label_type: string) => {
      return arrType.find((type) => type.label_type == label_type)!.image[
        Math.floor(Math.random() * 2)
      ];
    };

    const capFirstLetter = (project_name: string) => {
      return project_name.charAt(0).toUpperCase() + project_name.slice(1);
    };

    const labelThai = (label_type: string) => {
      return arrType.find((type) => type.label_type == label_type)!.thai_name;
    };

    const colorButton = (label_type: string) => {
      return arrType.find((type) => type.label_type == label_type)!.color;
    };

    const customAttribute = ref<{ label: string; value: string }[]>([]);
    const customDialog = ref(false);
    const selectedProject = ref<IProject>();
    const groupInput = ref();
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

    const accessPwd = ref<string>();

    const validateAccessPwd = () => {
      if (!group_id.value) {
        groupInput.value.focus();
        return;
      }

      if (props.project?.access_password == accessPwd.value) {
        customDialog.value = false;
        pushPage();
      } else {
        q.notify({
          message: "Invalid access password",
          color: "negative",
        });
      }
    };

    const pushPage = () => {
      router.push({
        name: selectedProject.value!.label_type,
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
      validateAccessPwd,
      randomImage,
      capFirstLetter,
      group_id,
      groupInput,
      customAttribute,
      customDialog,
      accessPwd,
    };
  },
});
</script>

<style lang="scss" scoped>
.get-start-btn {
  font-family: Inter;
  font-weight: Medium;
  font-size: 14px;
  padding: 5px 1em;
  color: #fff;
  background: #149bfc;
  border-radius: 0;
}

.text-section {
  width: 100%;
  text-align: start;
  font-size: 16px;
  font-weight: 700;
  color: #242424;
}

.sub-text-section {
  font-size: 14px;
  text-align: start;
  width: 100%;
  color: #888888;
}
</style>
