<template>
  <div class="stat-table">
    <!-- <div class="flex-row items-center text-black">
      <div style="font-size: 24px">สถิติ/Stat</div>
    </div> -->
    <q-table
      class="stat-table"
      title="สถิติ/Stat"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "src/store";
import { IProject } from "src/store/module-project/state";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    const user = computed(() => store.state.moduleProjects.projects);

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

    const rows = ref<TotalImage[]>([]);

    onMounted(() => {
      rows.value = [
        {
          total: 123,
          project_name: "Road Surface Condition",
          label_type: "annotation",
          paid: 100,
          pending: 23,
          total_price: 100,
        },
        {
          total: 456,
          project_name: "Road Surface Condition Road",
          label_type: "labelling",
          paid: 200,
          pending: 23,
          total_price: 100,
        },
        {
          total: 789,
          project_name: "Road Surface Condition 25",
          label_type: "classification",
          paid: 300,
          pending: 23,
          total_price: 100,
        },
      ];
    });

    return {
      rows,
      columns,
    };
  },
});
</script>

<style scoped lang="scss"></style>
