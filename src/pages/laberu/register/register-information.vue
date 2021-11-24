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
            <div class="top-section q-mb-xs">Register User</div>
            <q-form @submit="registerUser()">
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
                <div class="text-bold q-mb-xs" style="color: #888888">
                  Career
                </div>
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

              <div class="flex-row justify-center">
                <q-btn
                  unelevated
                  flat
                  label="Register"
                  type="submit"
                  class="signup-btn"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script lang="ts">
import { IPayment } from "src/store/module-users/state";
import { defineComponent, ref, reactive, computed } from "vue";
import provinceJSON from "src/service/province_th.json";
import { useQuasar } from "quasar";
import { useStore } from "src/store";
import { useRouter } from "vue-router";
import { IRegisterUser } from "src/store/module-auth/actions";

export default defineComponent({
  name: "registerInformation",
  setup() {
    const q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const userState = computed(() => store.state.moduleAuth.user);

    const user = {
      firstname: ref("user"),
      lastname: ref("test"),
      phone_number: ref("0123456789"),
      career: ref(""),
      province: ref(""),
      bank_name: ref(null),
      bank_account_no: ref("123456789"),
      bank_account_name: ref("user test"),
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

    const registerUser = async () => {
      try {
        q.loading.show();

        const register = ref<IRegisterUser>({
          firstname: user.firstname.value,
          lastname: user.lastname.value,
          phone_number: user.phone_number.value,
          career: user.career.value,
          province: user.province.value,
          email: userState.value.email!,
          uid: userState.value.uid!,
          payment: {
            bank_name: user.bank_name.value!,
            bank_account_no: user.bank_account_no.value!,
            bank_account_name: user.bank_account_name.value!,
          },
        });

        const response = await store.dispatch(
          "moduleAuth/registerUser",
          register.value
        );

        if (response) {
          router.push({ name: "home" });
        }
      } catch (error) {
        q.notify({
          message: `${error}`,
          icon: "warning",
          color: "negative",
        });
      } finally {
        q.loading.hide();
      }
    };

    return {
      ...user,
      userState,
      bankAccountTH,
      provinceTH,
      careerTH,
      registerUser,
      filterFn,
    };
  },
});
</script>
