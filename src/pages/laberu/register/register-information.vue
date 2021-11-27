divdivdiv<template>
  <div class="flex-row justify-center items-center">
    <div class="flex-col register-style">
      <div class="top-section q-mb-xs row justify-center q-mb-md">
        Register User
      </div>
      <q-form @submit="registerUser()">
        <div class="flex-row register-wrap">
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              First Name
            </div>
            <q-input
              v-model="firstname"
              outlined
              dense
              class="min200"
              :rules="[(val) => !!val || 'Field is require']"
            />
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              Last Name
            </div>
            <div>
              <q-input
                style="width: 100%"
                v-model="lastname"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              Phone number
            </div>
            <div>
              <q-input
                mask="###-###-####"
                v-model="phone_number"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">Career</div>
            <div>
              <q-select
                behavior="menu"
                :options="careerTH"
                v-model="career"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">Province</div>
            <div>
              <q-select
                :options="provinceTH"
                use-input
                @filter="filterFn"
                v-model="province"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              Bank Name
            </div>
            <div>
              <q-select
                :options="bankAccountTH"
                v-model="bank_name"
                map-options
                emit-value
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              Bank Account Name
            </div>
            <div>
              <q-input
                v-model="bank_account_name"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
          <div class="col">
            <div class="text-bold q-mb-xs" style="color: #888888">
              Bank Account Number
            </div>
            <div>
              <q-input
                v-model="bank_account_no"
                outlined
                dense
                class="min200"
                :rules="[(val) => !!val || 'Field is require']"
              />
            </div>
          </div>
        </div>
        <div class="row q-mb-md justify-center">
          <q-btn
            label="Register"
            class="text-weight-bold"
            no-caps
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>
<style lang="scss">
.q-stepper {
  box-shadow: none;
}
.register-style {
  display: flex;
  margin-top: 3em;
  padding: 0 4em;
  width: 100%;
  justify-content: center;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 0;
}
</style>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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
      firstname: ref(""),
      lastname: ref(""),
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
      "อื่นๆ",
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
      step: ref(1),
    };
  },
});
</script>
