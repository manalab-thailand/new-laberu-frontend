<template>
  <div class="the-box">
    <div class="flex-row items-center text-black">
      <div class="title-font">ข้อมูลทั่วไป/General</div>
    </div>
    <div class="flex-row main-sec">
      <div class="flex-col sub-sec">
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            ชื่อ
            <div class="eng">/Name</div>
            :
          </div>
          <div class="font-style color-1">{{ user.firstname }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            นามสกุล
            <div class="eng">/Surname</div>
            :
          </div>
          <div class="font-style color-1">{{ user.lastname }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            อีเมลล์
            <div class="eng">/Email</div>
            :
          </div>
          <div class="font-style color-1">{{ emailHide(user.email) }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            เบอร์โทรศัพท์
            <div class="eng">/Phone No</div>
            :
          </div>
          <div class="font-style color-1">
            {{ cardHide(user.phone_number) }}
          </div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            อาชีพ
            <div class="eng">/Career</div>
            :
          </div>
          <div class="font-style color-1">{{ user.career }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            จังหวัด
            <div class="eng">/Province</div>
            :
          </div>
          <div class="font-style color-1">{{ user.province }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            ธนาคาร
            <div class="eng">/Bank</div>
            :
          </div>
          <div class="font-style color-1">{{ user.payment.bank_name }}</div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            เลขบัญชีธนาคาร
            <div class="eng">/Account No</div>
            :
          </div>
          <div class="font-style color-1">
            {{ cardHide(user.payment.bank_account_no) }}
          </div>
        </div>
        <div class="flex-row">
          <div class="font-style w-400 color-2 row">
            เจ้าของบัญชี
            <div class="eng">/Account Name</div>
            :
          </div>
          <div class="font-style color-1">
            {{ user.payment.bank_account_name }}
          </div>
        </div>
      </div>
      <!-- <div class="flex-col">
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
          <q-btn color="light-blue-6" no-caps text-color="white" label="Edit" />
        </div>
      </div> -->
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

<style scoped lang="scss"></style>
