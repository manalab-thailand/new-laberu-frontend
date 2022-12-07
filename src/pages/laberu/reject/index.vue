<template>
  <div
    style="
      background-color: #808080;
      min-height: calc(100vh - 50px);
      height: 100%;
    "
  >
    <div class="flex-row justify-center" v-if="taskImageRejects">
      <div
        class="q-ma-md"
        style="display: flex; flex-direction: column; width: 80%"
      >
        <div
          class="q-pa-md"
          style="background-color: white; border-radius: 5px"
        >
          <Search @on-search="onSearch" />
          <RejectTable
            :task-image-rejects="taskImageRejects"
            :pagination="pagination"
            @on-update="handleFetch"
          />
          <Pagination :pagination="pagination" @on-change-page="handleFetch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RejectTable from "./table.vue";
import Pagination from "./pagination.vue";
import Search from "./search.vue";
import { computed, onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { ITaskImageReject, IPagination } from "src/types/interface";
import { useQuasar } from "quasar";
import { useStore } from "src/store";

const q = useQuasar();
const store = useStore();

const user = computed(() => store.state.moduleAuth.user);

const taskImageRejects = ref<ITaskImageReject[]>();
const pagination = ref<IPagination>();
const payload = ref({});

const fetchTaskImageReject = async (query: any) => {
  const { data } = await api.get("task-image-reject", { params: query });
  return data;
};

const onSearch = (searchVal: any) => {
  payload.value = searchVal;
  handleFetch();
};

const handleFetch = async () => {
  try {
    q.loading.show();
    const query = {
      ...payload.value,
      user_id: user.value._id,
      // user_id: "62a00cb5b4c4111db82d2a32",
      page: pagination.value?.page ?? 1,
      limit: pagination.value?.page_size ?? 10,
    };
    const resp = await fetchTaskImageReject(query);
    taskImageRejects.value = resp.entities;
    pagination.value = resp.pagination;
  } catch (error) {
    console.log(error);
  } finally {
    q.loading.hide();
  }
};

onMounted(() => handleFetch());
</script>
