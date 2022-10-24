<template>
  <div class="main-profile-box">
    <div class="flex-row main-box-title justify-between items-center q-mb-sm">
      <div class="row items-center">
        Profile <q-icon name="account_circle" class="q-ml-sm" color="blue" />
      </div>
      <div class="flex-row justify-center q-mt-sm">
        <q-btn
          class="text-weight-bold"
          outline
          icon="edit"
          label="Edit"
          color="primary"
          @click="editUserDialog = !editUserDialog"
        />

        <q-dialog v-model="editUserDialog" v-if="user">
          <EditUser
            :user="user"
            @onUpdateUser="editUserDialog = !editUserDialog"
          />
        </q-dialog>
      </div>
    </div>
    <div class="flex-row profile-wrap q-gutter-y-md">
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Name:</div>
          <q-input dense outlined readonly v-model="user.firstname" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Surname:</div>
          <q-input dense outlined readonly v-model="user.lastname" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Email:</div>
          <q-input dense outlined readonly v-model="reactiveUser.email" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Tel:</div>
          <q-input
            dense
            outlined
            readonly
            v-model="reactiveUser.phone_number"
          />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Career:</div>
          <q-input dense outlined readonly v-model="user.career" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Province:</div>
          <q-input dense outlined readonly v-model="user.province" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Bank:</div>
          <q-input dense outlined readonly v-model="reactiveUser.bank_name" />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Acc. No:</div>
          <q-input
            dense
            outlined
            readonly
            v-model="reactiveUser.bank_account_no"
          />
        </div>
      </div>
      <div class="">
        <div class="flex-row items-center">
          <div class="rows-header">Acc. Name:</div>
          <q-input
            dense
            outlined
            readonly
            v-model="user.payment.bank_account_name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.col {
  min-width: 200px;
  margin: 10px 0;
  justify-content: center;
  display: flex;
}

.q-input {
  padding: 0 1em;
}
// div {
//   border: dashed;
// }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
import { useStore } from "src/store";
import EditUser from "./edit-user/edit-user.vue";

function cardHide(card: any) {
  let hideNum: string[] = [];
  for (let i = 0; i < card.length; i++) {
    if (i < card.length - 4) {
      hideNum.push("*");
    } else {
      hideNum.push(card[i]);
    }
  }
  return hideNum.join("");
}
function emailHide(card: any) {
  let hideNum: string[] = [];
  let at = 0;
  for (let i = 0; i < card.length; i++) {
    if (card[i] == "@") {
      at = i + 1;
    }
    if (i < card.length - i - at) {
      if (i < 3) {
        hideNum.push(card[i]);
      } else {
        hideNum.push("*");
      }
    } else {
      hideNum.push(card[i]);
    }
  }
  return hideNum.join("");
}
export default defineComponent({
  components: {
    EditUser,
  },
  setup() {
    const store = useStore();

    const user = computed(() => store.state.moduleAuth.user);

    const bankAccountTH = ref([
      { label: "(SCB) ธนาคารไทยพาณิชย์", value: "SCB" },
      { label: "(KTB) ธนาคารกรุงไทย", value: "KTB" },
      { label: "(KBANK) ธนาคารกสิกรไทย", value: "KBANK" },
      { label: "(BAY) ธนาคารกรุงศรีอยุธยา", value: "BAY" },
      { label: "(GSB) ธนาคารออมสิน", value: "GSB" },
      { label: "(KBANK) ธนาคารกรุงเทพ", value: "BBL" },
    ]);

    const reactiveUser = reactive({
      phone_number: computed(() => cardHide(user.value.phone_number)),
      email: emailHide(user.value.email),
      bank_account_no: computed(() =>
        cardHide(user.value.payment.bank_account_no)
      ),
      bank_name: bankAccountTH.value.find(
        (bank) => bank.value === user.value.payment.bank_name
      )?.label,
    });

    const editUserDialog = ref(false);

    return {
      text: ref(""),
      user,
      reactiveUser,
      editUserDialog,
      cardHide,
      emailHide,
    };
  },
});
</script>
