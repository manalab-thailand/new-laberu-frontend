<template>
  <div class="text-weight-bold text-h6">User Payment</div>
  <div class="row justify-evently" v-if="user">
    <q-select
      ref="nameRef"
      class="col-8"
    
      label="Bank Account"
      v-model="user.payment.bank_name"
      map-options
      emit-value
      :options="bankAccount"
      lazy-rules
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input
      ref="nameRef"
      class="col"
    
      label="Bank Account No"
      v-model="user.payment.bank_account_no"
      lazy-rules
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input
      ref="nameRef"
      class="col-12"
    
      label="Bank Account Name"
      v-model="user.payment.bank_account_name"
      lazy-rules
      :rules="[(val) => !!val || 'Field is required']"
    />
  </div>
</template>

<script lang="ts">
import { IUser } from "src/store/module-users/state";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "editUserPayment",
  props: {
    user: Object as () => IUser,
  },
  setup() {
    const bankAccount = ref([
      { label: "(SCB) ธนาคารไทยพาณิชย์", value: "SCB" },
      { label: "(KTB) ธนาคารกรุงไทย", value: "KTB" },
      { label: "(KBANK) ธนาคารกสิกรไทย", value: "KBANK" },
      { label: "(BAY) ธนาคารกรุงศรีอยุธยา", value: "BAY" },
      { label: "(GSB) ธนาคารออมสิน", value: "GSB" },
      { label: "(KBANK) ธนาคารกรุงเทพ", value: "BBL" },
    ]);

    return {
      bankAccount,
    };
  },
});
</script>

<style></style>
