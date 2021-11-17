<template>
  <q-card bordered class="my-card shadow-9 q-ma-md" v-if="editUser">
    <q-card-section>
      <div class="text-h4 text-weight-bold text-center">Manage User</div>
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="onSubmitUpdate(editUser)"
        class="q-gutter-x-lg q-gutter-y-xs q-px-md"
      >
        <EditUserInformation :user="editUser" />
        <!-- <EditUserAuthorization :user="user" /> -->
        <EditUserPayment :user="editUser" />

        <div class="row justify-center">
          <q-btn
            label="Submit Update"
            color="primary"
            class="text-weight-bold"
            type="submit"
            no-caps
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { IUser } from "src/store/module-users/state";
import { defineComponent, ref, reactive } from "vue";
import { Store } from "vuex";
import { StateInterface, useStore } from "src/store";
import { QVueGlobals, useQuasar } from "quasar";
import EditUserInformation from "./edit-user-information.vue";
import EditUserAuthorization from "./edit-user-authorization.vue";
import EditUserPayment from "./edit-user-payment.vue";

export default defineComponent({
  name: "editUser",
  components: {
    EditUserInformation,
    EditUserAuthorization,
    EditUserPayment,
  },
  props: {
    user: Object as () => IUser,
  },
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();

    const user = props.user!;

    const editUser = reactive<IUser>({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone_number: user.phone_number,
      career: user.career,
      province: user.province,
      payment: {
        bank_name: user.payment.bank_name,
        bank_account_no: user.payment.bank_account_no,
        bank_account_name: user.payment.bank_account_name,
      },
    });

    return {
      editUser,
      ...UpdateUserFunction(store, q, emit),
    };
  },
});

const UpdateUserFunction = (
  store: Store<StateInterface>,
  q: QVueGlobals,
  emit: any
) => {
  const onSubmitUpdate = async (user: IUser | undefined) => {
    try {
      q.loading.show();
      await store.dispatch("moduleAuth/updateUser", user);
      q.notify({
        message: `Update User Information Success`,
        color: "positive",
        timeout: 5000,
      });
      emit("onUpdateUser");
    } catch (error) {
      console.log(error);
    } finally {
      q.loading.hide();
    }
  };

  return { onSubmitUpdate };
};
</script>