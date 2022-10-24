<template>
  <div class="flex justify-end q-px-sm" v-if="pagination">
    <q-select
      color="secondary"
      label-color="secondary"
      dense
      outlined
      v-model="pagination.page_size"
      :options="[10, 20, 30, 40, 50, 100]"
      @update:model-value="$emit('onChangePage')"
    />
    <q-pagination
      v-model="pagination.page"
      color="secondary"
      :max="pagination.page_count"
      :max-pages="6"
      direction-links
      boundary-links
      @update:model-value="$emit('onChangePage')"
    />
  </div>
</template>

<script setup lang="ts">
import { IPagination } from "src/types/interface";
import { defineProps } from "vue";
defineProps({
  pagination: Object as () => IPagination,
});
defineEmits(["onChangePage"]);
</script>
