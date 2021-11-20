<template>
  <div class="main-profile-box">
    <div class="flex-row main-box-title items-center">
      Edit Profile <q-icon name="account_circle" class="q-ml-sm" color="blue" />
    </div>
    <div class="flex-row profile-wrap">
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Name:</div>
          <q-input dense outlined :placeholder="user.firstname" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Surname:</div>
          <q-input dense outlined :placeholder="user.lastname" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Email:</div>
          <q-input dense outlined :placeholder="emailHide(user.email)" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Tel:</div>
          <q-input dense outlined :placeholder="cardHide(user.phone_number)" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Career:</div>
          <q-input dense outlined :placeholder="user.career" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Province:</div>
          <q-input dense outlined :placeholder="user.province" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Bank:</div>
          <q-input dense outlined :placeholder="user.payment.bank_name" />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Acc. No:</div>
          <q-input
            dense
            outlined
            :placeholder="cardHide(user.payment.bank_account_no)"
          />
        </div>
      </div>
      <div class="col">
        <div class="flex-row items-center">
          <div class="rows-header">Acc. Name:</div>
          <q-input
            dense
            outlined
            :placeholder="user.payment.bank_account_name"
          />
        </div>
      </div>
    </div>
    <div class="flex-row justify-end">
      <q-btn
        label="Edit User"
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
</style>
<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "src/store";
import EditUser from "./edit-user/edit-user.vue";

function cardHide(card) {
  let hideNum = [];
  for (let i = 0; i < card.length; i++) {
    if (i < card.length - 4) {
      hideNum.push("*");
    } else {
      hideNum.push(card[i]);
    }
  }
  return hideNum.join("");
}
function emailHide(card) {
  let hideNum = [];
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

    const editUserDialog = ref(false);

    return {
      text: ref(""),
      user,
      editUserDialog,
      cardHide,
      emailHide,
    };
  },
});
</script>
