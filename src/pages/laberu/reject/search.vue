<template>
  <div class="row col-12 q-px-sm q-mb-md items-center">
    <q-card class="full-width q-pa-sm">
      <q-card-section>
        <div class="row col-12 q-pa-none q-ma-none">
          <div class="row col-8">
            <div class="col-6 q-px-sm">
              <div>รหัสรูปภาพ</div>
              <q-input
                class="full-width"
                dense
                outlined
                placeholder="รหัสรูปภาพ"
                v-model="search.shortcode"
              />
            </div>
            <div class="col-4 q-px-sm">
              <div>สถานะ</div>
              <q-select
                class="full-width"
                dense
                outlined
                map-options
                emit-value
                placeholder="สถานะ"
                v-model="search.status"
                :options="status"
              />
            </div>
          </div>
          <div class="row col-4 justify-end items-center">
            <q-btn label="รีเซ็ท" color="negative" @click="onReset" />
            <div class="q-px-sm"></div>
            <q-btn label="ค้นหา" color="primary" @click="onSearch" />
          </div>
        </div>
      </q-card-section>
      <!-- <q-card-section>
        <div class="row justify-end items-center">
          <q-btn label="รีเซ็ท" color="negative" @click="" />
          <div class="q-px-sm"></div>
          <q-btn label="ค้นหา" color="primary" @click="" />
        </div>
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits(["onSearch"]);

const status = ref([
  { label: "ทั้งหมด", value: "" },
  { label: "รอการแก้ไข", value: "waiting" },
  { label: "รอการตรวจสอบ", value: "review" },
  { label: "ไม่อนุมัติ", value: "reject" },
  { label: "อนุมัติ", value: "approved" },
]);

const search = ref({
  shortcode: "",
  status: "",
});

const onReset = () => {
  search.value = {
    shortcode: "",
    status: "",
  };

  emits("onSearch", {});
};

const onSearch = () => {
  const payload = {};

  if (search.value.shortcode) {
    payload["shortcode"] = search.value.shortcode;
  }

  if (search.value.status) {
    payload["status"] = search.value.status;
  }

  emits("onSearch", payload);
};
</script>
