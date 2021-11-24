<template>
  <div class="sub-profile-box">
    <div class="flex-row items-center text-black sub-box-title">
      Stat <q-icon class="q-ml-sm" name="query_stats" color="blue" />
    </div>
    <q-scroll-area style="height: 600px; max-width: 100%">
      <div class="operation-overflow">
        <div class="flex-row q-mb-md">
          <div class="col columns-header">Project Name</div>
          <div class="col columns-header">Type</div>
          <div class="col columns-header">Done</div>
          <div class="col columns-header">Total Price(฿)</div>
          <div class="col columns-header">Paid(฿)</div>
          <div class="col columns-header">Pending(฿)</div>
        </div>

        <div v-for="(item, index) in rows" :key="index">
          <div class="col">
            <div class="flex-row">
              <div class="col columns-item" style="color: #149bfc">
                {{ item.project_name }}
              </div>
              <div class="col columns-item">{{ item.label_type }}</div>
              <div class="col columns-item">{{ item.total }}</div>
              <div class="col columns-item">
                {{ item.total_price.toFixed(2) }}
              </div>
              <div class="col columns-item">{{ item.paid.toFixed(2) }}</div>
              <div class="col columns-item">{{ item.pending.toFixed(2) }}</div>
            </div>
            <q-separator style="background: #7a7a7a; margin: 1em 0" />
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>
<style scoped lang="scss"></style>
<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "src/store";
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
          user_id: user.value._id,
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
