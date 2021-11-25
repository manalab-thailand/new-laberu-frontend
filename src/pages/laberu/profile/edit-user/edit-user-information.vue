<template>
  <div v-if="user">
    <div class="text-weight-bold text-h6">User Infomation</div>
    <div class="flex-row justify-between">
      <q-input
        class="col"
        label="Firstname"
        v-model="user.firstname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        class="col"
        label="Lastname"
        v-model="user.lastname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="flex-row justify-between">
      <q-input
        class="col"
        label="Email"
        v-model="user.email"
        readonly
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        class="col"
        mask="###-###-####"
        label="Phone Number"
        v-model="user.phone_number"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="flex-row justify-between">
      <q-select
        class="col"
        label="Career"
        v-model="user.career"
        :options="careerTH"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-select
        class="col"
        label="Province"
        v-model="user.province"
        :options="provinceTH"
        @filter="filterFn"
        use-input
        emit-value
        map-options
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { IUser } from "src/store/module-users/state";
import { defineComponent, ref } from "vue";
import provinceJSON from "src/service/province_th.json";
export default defineComponent({
  name: "editUserInformation",
  props: {
    user: Object as () => IUser,
  },
  setup() {
    const provinceTH = ref<string[]>();

    const bankAccountTH = ref([
      { label: "(SCB) ธนาคารไทยพาณิชย์", value: "SCB" },
      { label: "(KTB) ธนาคารกรุงไทย", value: "KTB" },
      { label: "(KBANK) ธนาคารกสิกรไทย", value: "KBANK" },
      { label: "(BAY) ธนาคารกรุงศรีอยุธยา", value: "BAY" },
      { label: "(GSB) ธนาคารออมสิน", value: "GSB" },
      { label: "(KBANK) ธนาคารกรุงเทพ", value: "BBL" },
    ]);

    const careerTH = ref<string[]>([
      "การเกษตร",
      "การศึกษา",
      "การแพทย์",
      "การเงินและธุรกิจ",
      "การท่องเที่ยว",
      "การคมนาคม",
      "ข้าราชการ",
      "กฏหมาย",
      "อื่นๆ",
    ]);

    const filterFn = (val: string, update: any) => {
      if (val === "") {
        update(() => {
          provinceTH.value = provinceJSON;
        });
        return;
      }
      update(() => {
        provinceTH.value = provinceJSON.filter(
          (name) => name.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    };

    return {
      provinceTH,
      bankAccountTH,
      careerTH,
      filterFn,
    };
  },
});
</script>

<style scoped lang="scss">
.my-card .col {
  margin: 0;
}
</style>
