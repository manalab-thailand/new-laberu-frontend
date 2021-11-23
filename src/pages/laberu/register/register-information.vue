<template>
  <div class="content-sidebar-60">
    <div class="col">
      <div class="flex-row justify-center items-center">
        <div
          style="
            display: flex;
            margin-top: 3em;
            padding: 0 2em;
            width: 100%;
            justify-content: center;
          "
        >
          <div class="flex-col">
            <div class="top-section q-mb-xs">Sign Up</div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                First Name
              </div>
              <q-input
                v-model="firstname"
                filled
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Last Name
              </div>
              <div>
                <q-input
                  style="width: 100%"
                  v-model="lastname"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Phone number
              </div>
              <div>
                <q-input
                  mask="###-###-####"
                  v-model="phone_number"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">Career</div>
              <div>
                <q-select
                  :options="careerTH"
                  v-model="career"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Province
              </div>
              <div>
                <q-select
                  :options="provinceTH"
                  use-input
                  @filter="filterFn"
                  v-model="province"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Bank Name
              </div>
              <div>
                <q-select
                  :options="bankAccountTH"
                  v-model="bank_name"
                  map-options
                  emit-value
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Bank Account Name
              </div>
              <div>
                <q-input
                  v-model="bank_account_name"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-bold q-mb-xs" style="color: #888888">
                Bank Account Number
              </div>
              <div>
                <q-input
                  v-model="bank_account_no"
                  filled
                  :rules="[(val) => !!val || 'Field is require']"
                />
              </div>
            </div>

            <div class="flex-row justify-end">
              <q-btn unelevated flat label="Next" class="signup-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { IPayment } from "src/store/module-users/state";
import { defineComponent, ref, reactive } from "vue";
import provinceJSON from "src/service/province_th.json";

export default defineComponent({
  name: "registerInformation",
  setup() {
    const user = {
      firstname: ref(""),
      lastname: ref(""),
      email: ref(""),
      phone_number: ref(""),
      career: ref(""),
      province: ref(""),
      bank_name: ref(null),
      bank_account_no: ref(""),
      bank_account_name: ref(""),
    };

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
      ...user,
      bankAccountTH,
      provinceTH,
      careerTH,
      filterFn,
    };
  },
});
</script>
