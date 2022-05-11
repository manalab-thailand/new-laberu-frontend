<template>
  <div class="q-mt-md">
    <div class="flex justify-center text-weight-bold q-my-sm">
      ประวัติล่าสุด
    </div>
    <div class="q-mt-sm" v-for="(data, index) in historyList" :key="index">
      <div class="flex items-center justify-left text-weight-medium">
        <div>
          <div class="">
            รหัส <span class="text-weight-bold">{{ data.shortcode }}</span>
          </div>
          <div class="">ณ วันที่ {{ formatDateThai(data.createdAt) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "src/store";
import { useQuasar } from "quasar";
import { ITaskSuccess } from "src/store/module-task-success/state";
import { formatDateThai } from "src/common/util";

export default defineComponent({
  components: {},
  props: {
    shortcode: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const q = useQuasar();

    const { project_id, group_id } = route.query;

    const user = computed(() => store.state.moduleAuth.user);

    const historyList = computed(
      () => store.state.moduleTaskSuccess.history_lists
    );

    return {
      historyList,
      formatDateThai,
    };
  },
});
</script>
