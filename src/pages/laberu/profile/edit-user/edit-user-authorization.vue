<template>
  <div class="text-weight-bold text-h6">User Authorization</div>
  <div class="row justify-evently" v-if="user">
    <q-select
      ref="nameRef"
      outlined
      class="q-pr-sm col-6"
      dense
      label="Status"
      v-model="user.status"
      map-options
      emit-value
      :options="status"
      lazy-rules
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-select
      ref="nameRef"
      outlined
      class="q-pl-sm col-6"
      dense
      label="Role"
      v-model="user.role"
      map-options
      emit-value
      :options="role"
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
    const role = ref([
      { label: "user", value: "user" },
      { label: "admin", value: "admin" },
      { label: "customer", value: "customer" },
    ]);

    const status = ref([
      { label: "active", value: "active" },
      { label: "disable", value: "disable" },
    ]);

    return {
      role,
      status,
    };
  },
});
</script>

<style>
</style>