<template>
  <div class="q-px-sm q-mb-md" v-if="taskImageRejects && pagination">
    <q-table
      title="Task Image Reject"
      :rows="taskImageRejects"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[100]"
      hide-pagination
    >
      <template v-slot:body-cell-actions="props">
        <div
          v-if="props.row.status === 'waiting' || props.row.status === 'reject'"
          class="row justify-around q-ma-sm"
        >
          <q-btn
            color="warning"
            icon="edit"
            flat
            @click="onClickEvent(props.row)"
          />
        </div>
      </template>
    </q-table>

    <q-dialog v-model="isConfirmDialog">
      <q-card style="min-width: 700px">
        <q-card-section class="row justify-center items-center">
          {{ imageUrl }}
          <img :src="imageUrl" />
        </q-card-section>

        <q-card-section>
          <div>จำนวนตัวอักษรปัจจุบัน {{ newDesc?.length }}</div>
          <q-input
            type="textarea"
            outlined
            dense
            label="คำอธิบาย"
            v-model="newDesc"
            @update:model-value="onInputValue"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" color="negative" v-close-popup />
          <q-btn flat label="ยืนยัน" color="primary" @click="onClickConfirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IPagination, ITaskImageReject } from "src/types/interface";
import { columns } from "./columns";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useStore } from "src/store";
import { useRoute } from "vue-router";

const q = useQuasar();
const store = useStore();
const route = useRoute();

defineProps({
  taskImageRejects: Object as () => ITaskImageReject[],
  pagination: Object as () => IPagination,
});

const emits = defineEmits(["onUpdate"]);

const auth = computed(() => store.state.moduleAuth.user);

const list_projects = computed(() => store.state.moduleProjects.projects);

const isConfirmDialog = ref(false);
const dataSelected = ref<ITaskImageReject>();
const imageUrl = ref<string>();

const newDesc = ref<string>();

const onClickEvent = (data: ITaskImageReject) => {
  newDesc.value = "";
  dataSelected.value = data;

  const project = list_projects.value.find((x) => x._id === data.project_id);

  if (data.shortcode.includes(".")) {
    imageUrl.value = `${project?.base_image_url}/${data.shortcode}`;
  } else {
    imageUrl.value = `${project?.base_image_url}/${data.shortcode}.${project?.image_type}`;
  }

  isConfirmDialog.value = true;
};

const onClickConfirm = async () => {
  try {
    q.loading.show();

    if (newDesc.value!.length < 50) {
      q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "กรุณากรอกอย่างน้อย 50 ตัวอักษร",
      });
      return;
    }

    await api.put(`task-image-reject`, {
      id: dataSelected.value!._id,
      new_result: newDesc.value,
    });
    isConfirmDialog.value = false;
    emits("onUpdate");
  } catch (error) {
    console.log(error);
  } finally {
    q.loading.hide();
  }
};

const onInputValue = (val: string) => {
  const lenSpace = val.split(" ");
  if (lenSpace.length > 2) {
    const [first, ...other] = lenSpace.filter((x) => x);
    newDesc.value = `${first} ${other.join("")}`;
  }
};
</script>
