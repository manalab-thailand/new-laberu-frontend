<template>
  <div class="stat-table">
    <div class="flex-row items-center text-black title-font">สถิติ/Stat</div>
    <div v-for="(item, index) in rows" :key="index">
      <div class="orientation-landscape">
        <q-card class="my-card flex-row" style="overflow: auto">
          <div class="col card-wrapper">
            <div class="flex-col">
              <div class="title">ชื่อโปรเจค</div>
              <div style="font-size: 16px">{{ item.project_name }}</div>
            </div>
          </div>
          <q-separator vertical inset />
          <div class="col">
            <div class="flex-col">
              <div class="title">ประเภทงาน</div>
              <div style="font-size: 16px">{{ item.label_type }}</div>
            </div>
          </div>
          <q-separator vertical inset />
          <div class="col">
            <div class="flex-col">
              <div class="title">ทำไปแล้ว</div>
              <div style="font-size: 16px">{{ item.total }}</div>
            </div>
          </div>
          <q-separator vertical inset />
          <div class="col">
            <div class="flex-col">
              <div class="title">Made(฿)</div>
              <div style="font-size: 16px">{{ item.total_price }}</div>
            </div>
          </div>
          <q-separator vertical inset />
          <div class="col">
            <div class="flex-col">
              <div class="title">จ่ายแล้ว</div>
              <div style="font-size: 16px">{{ item.paid }}</div>
            </div>
          </div>
          <q-separator vertical inset />
          <div class="col">
            <div class="flex-col">
              <div class="title">รอจ่าย</div>
              <div style="font-size: 16px">{{ item.pending }}</div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="orientation-portrait">
        <q-card class="my-card flex-col" style="overflow: auto">
          <div class="flex-row">
            <div class="title">ชื่อโปรเจค:</div>
            <div class="under-title">{{ item.project_name }}</div>
          </div>

          <div class="flex-row">
            <div class="title">ประเภทงาน:</div>
            <div class="under-title">{{ item.label_type }}</div>
          </div>

          <div class="flex-row">
            <div class="title">ทำไปแล้ว:</div>
            <div class="under-title">{{ item.total }}</div>
          </div>

          <div class="flex-row">
            <div class="title">Made(฿):</div>
            <div class="under-title">{{ item.total_price }}</div>
          </div>

          <div class="flex-row">
            <div class="title">จ่ายแล้ว:</div>
            <div class="under-title">{{ item.paid }}</div>
          </div>

          <div class="flex-row">
            <div class="title">รอจ่าย:</div>
            <div class="under-title">{{ item.pending }}</div>
          </div>
        </q-card>
      </div>
    </div>
    <!-- <q-table
      class="stat-table"
      title="สถิติ/Stat"
      :rows="rows"
      :columns="columns"
      row-key="name"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "src/store";
import { IProject } from "src/store/module-project/state";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

interface TotalImage {
  total: Number;
  project_name: string;
  label_type: string;
  paid: Number;
  pending: Number;
  total_price: Number;
}
export default defineComponent({
  setup() {
    const store = useStore();
    const q = useQuasar();
    const router = useRouter();
    const user = computed(() => store.state.moduleAuth.user);

    const columns = [
      {
        name: "project_name",
        required: true,
        label: "project_name",
        align: "left",
        field: "project_name",
        sortable: true,
      },
      {
        name: "label_type",
        align: "left",
        label: "label_type",
        field: "label_type",
        sortable: true,
      },
      {
        name: "total",
        label: "total",
        field: "total",
        sortable: true,
      },
      {
        name: "total_price",
        label: "total_price",
        field: "total_price",
        sortable: true,
      },
      {
        name: "pending",
        label: "pending",
        field: "pending",
        sortable: true,
      },
      {
        name: "paid",
        label: "paid",
        field: "paid",
        sortable: true,
      },
    ];

    onMounted(async () => {
      try {
        q.loading.show();

        await store.dispatch("moduleTaskSuccess/getTaskSuccessByUserId", {
          user_id: "616d538699d65337fca871d5",
        });
      } catch (error) {
        console.log(error);
      } finally {
        q.loading.hide();
      }
    });

    const rows = computed(
      () => store.state.moduleTaskSuccess.user_task_success
    );

    return {
      rows,
      columns,
    };
  },
});
</script>

<style scoped lang="scss"></style>
