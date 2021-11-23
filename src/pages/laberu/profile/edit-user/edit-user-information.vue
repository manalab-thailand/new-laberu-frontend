<template>
  <div v-if="user">
    <div class="text-weight-bold text-h6">User Infomation</div>
    <div class="flex-row justify-between">
      <q-input
        ref="nameRef"
        class="col"
        label="Firstname"
        v-model="user.firstname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        class="col"
        label="Lastname"
        v-model="user.lastname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="flex-row justify-between">
      <q-input
        ref="nameRef"
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
        label="Phone Number"
        v-model="user.phone_number"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="flex-row justify-between">
      <q-input
        ref="nameRef"
        class="col"
        label="Career"
        v-model="user.career"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        class="col"
        label="Province"
        v-model="user.province"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { IUser } from "src/store/module-users/state";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "editUserInformation",
  props: {
    user: Object as () => IUser,
  },
  setup() {},
});
</script>

<style scoped lang="scss">
.my-card .col {
  margin: 0;
}
</style>
