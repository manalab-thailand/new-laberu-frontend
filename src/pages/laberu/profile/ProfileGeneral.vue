<template>
  <div class="the-box q-pa-md">
    <div class="flex-row items-center">
      <div style="font-size: 24px">ข้อมูลทั่วไป/General</div>
    </div>
    <div class="flex-row" style="gap: 20px">
      <div class="col-4">
        <div class="font-style color-2 row justify-end">ชื่อ/Name:</div>
        <div class="font-style color-2 row justify-end">นามสกุล/Surname:</div>
        <div class="font-style color-2 row justify-end">อีเมลล์/Email:</div>
        <div class="font-style color-2 row justify-end">
          เบอร์โทรศัพท์/Phone No.:
        </div>
        <div class="font-style color-2 row justify-end">อาชีพ/Career:</div>
        <div class="font-style color-2 row justify-end">จังหวัด/Province:</div>
        <div class="font-style color-2 row justify-end">ธนาคาร/Bank:</div>
        <div class="font-style color-2 row justify-end">
          เลขบัญชีธนาคาร/Account No.:
        </div>
        <div class="font-style color-2 row justify-end">
          เจ้าของบัญชี/Account Name:
        </div>
      </div>
      <div class="col">
        <div class="font-style color-1">{{ user.firstname }}</div>
        <div class="font-style color-1">{{ user.lastname }}</div>
        <div class="font-style color-1">{{ emailHide(user.email) }}</div>
        <div class="font-style color-1">
          {{ cardHide(user.phone_number) }}
        </div>
        <div class="font-style color-1">{{ user.career }}</div>
        <div class="font-style color-1">{{ user.province }}</div>
        <div class="font-style color-1">{{ user.payment.bank_name }}</div>
        <div class="font-style color-1">
          {{ cardHide(user.payment.bank_account_no) }}
        </div>
        <div class="font-style color-1">
          {{ user.payment.bank_account_name }}
        </div>
        <div class="edit-btn">
          <q-btn color="white" text-color="black" label="Standard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "src/store";

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
  setup() {
    const store = useStore();
    const user = computed(() => store.state.moduleAuth.user);

    return {
      text: ref(""),
      user,
      cardHide,
      emailHide,
    };
  },
});
</script>

<style scoped lang='scss'>
</style>