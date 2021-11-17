<template>
  <div v-if="user">
    <div class="text-weight-bold text-h6">User Infomation</div>
    <div class="row justify-evently">
      <q-input
        ref="nameRef"
        outlined
        class="q-pr-sm col-6"
        dense
        label="Firstname"
        v-model="user.firstname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        outlined
        class="q-pl-sm col-6"
        dense
        label="Lastname"
        v-model="user.lastname"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="row justify-evently">
      <q-input
        ref="nameRef"
        outlined
        class="q-pr-sm col-8"
        dense
        label="Email"
        v-model="user.email"
        readonly
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        outlined
        class="q-pl-sm col-4"
        dense
        label="Phone Number"
        v-model="user.phone_number"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
    <div class="row justify-evently">
      <q-input
        ref="nameRef"
        outlined
        class="q-pr-sm col-6"
        dense
        label="Career"
        v-model="user.career"
        lazy-rules
        :rules="[(val) => !!val || 'Field is required']"
      />
      <q-input
        ref="nameRef"
        outlined
        class="q-pl-sm col-6"
        dense
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

<style>
</style>