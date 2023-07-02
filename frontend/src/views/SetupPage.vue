<template>
  <main>
    <the-navigation>
      <v-app-bar-title @click="$router.push('/')"
        >Project Setup</v-app-bar-title
      >
      <v-btn class="text-right" to="/">Home</v-btn>
      <v-btn class="text-right">FAQ</v-btn>
      <v-btn class="text-right" to="/login">Login</v-btn>
    </the-navigation>
    <v-container>
      <v-form ref="form" lazy-validation v-model="isStepValid">
        <step-1
          v-if="step === 1 && !isBusy"
          @update-step-valid="updateStepValid"
          ref="step1"
          :formValid="isStepValid"
        >
        </step-1>
        <step-2
          v-if="step === 2 && !isBusy"
          @update-step-valid="updateStepValid"
          ref="step2"
          :formValid="isStepValid"
        ></step-2>
        <step-3
          v-if="step === 3 && !isBusy"
          ref="step3"
          @update-step-valid="updateStepValid"
          :formValid="isStepValid"
        ></step-3>
        <step-4
          v-if="step === 4 && !isBusy"
          @update-step-valid="updateStepValid"
          ref="step4"
          :formValid="isStepValid"
        >
        </step-4>
        <step-5
          v-if="step === 5 && !isBusy"
          @update-step-valid="updateStepValid"
        ></step-5>
        <step-6
          v-if="step === 6 && !isBusy"
          @update-step-valid="updateStepValid"
        ></step-6>
        <step-7
          v-if="step === 7 && !isBusy"
          @update-step-valid="updateStepValid"
        ></step-7>
      </v-form>
      <v-row>
        <v-col justify="center" class="buttons">
          <v-btn v-if="step > 1" class="btnOptions" @click="prevStep"
            >Back</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="btnOptions" @click="nextStep">Next</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { useCreateProjectStore } from '@/store/createProjectStore';
import Step1 from '@/views/wizard/Step1.vue';
import Step2 from '@/views/wizard/Step2.vue';
import Step3 from '@/views/wizard/Step3.vue';
import Step4 from '@/views/wizard/Step4.vue';
import Step5 from '@/views/wizard/Step5.vue';
import Step6 from '@/views/wizard/Step6.vue';
import Step7 from '@/views/wizard/Step7.vue';

import { mapActions, mapState } from 'pinia';

export default {
  components: { Step1, Step2, Step3, Step4, Step5, Step6, Step7 },
  computed: {
    ...mapState(useCreateProjectStore, ['step']),
  },
  data() {
    return {
      isStepValid: true,
      isBusy: false,
    };
  },
  methods: {
    updateStepValid(validate) {
      this.isStepValid = validate;
    },
    prevStep() {
      if (this.step > 1) this.setStep(this.step - 1);
    },
    gotoStep2() {
      // Add validator for if statement
      if (this.$refs.step1.validateForm()) {
        this.isStepValid = false;
      } else {
        this.setStep(this.step + 1);
      }
    },
    gotoStep3() {
      // Add validator for if statement
      if (this.$refs.step2.validateForm()) {
        this.isStepValid = false;
      } else {
        this.setStep(this.step + 1);
      }
    },
    gotoStep4() {
      // Add validator for if statement
      if (this.$refs.step3.validateForm()) {
        this.isStepValid = false;
      } else {
        this.setStep(this.step + 1);
      }
    },
    gotoStep5() {
      // Add validator for if statement
      if (this.$refs.step4.validateForm()) {
        this.isStepValid = false;
      } else {
        this.setStep(this.step + 1);
      }
    },
    gotoStep6() {
      const test = true;
      // Add validator for if statement
      if (test == false) {
        this.isBusy = true;
        console.log('something');
      } else {
        console.log('asdas');
        this.setStep(this.step + 1);
      }
    },
    gotoStep7() {
      const test = true;
      // Add validator for if statement
      if (test == false) {
        this.isBusy = true;
        console.log('something');
      } else {
        this.setStep(this.step + 1);
      }
    },
    async nextStep() {
      await this.$refs.form.validate();
      if (this.isStepValid) {
        switch (this.step) {
        case 1:
          this.gotoStep2();
          break;
        case 2:
          this.gotoStep3();
          break;
        case 3:
          this.gotoStep4();
          break;
        case 4:
          this.gotoStep5();
          break;
        case 5:
          this.gotoStep6();
          break;
        case 6:
          this.gotoStep7();
          break;
        }
      }
    },
    ...mapActions(useCreateProjectStore, ['setStep']),
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
}
</style>
