<template>
  <section>
    <h2>Step 1 - Start</h2>
    <br />
    <p>Let us guide you through the process in a few easy steps.</p>
    <br />
    <p>First, give your project a name and/or number for future reference</p>
    <div>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>Project Name and/or Number</v-list-subheader>
        </v-col>
        <v-col>
          <v-text-field
            label="Your project name and/or number"
            placeholder="12345-Project_Name"
            @input="checkProjectName"
            v-model="name"
            ref="nameField"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-alert
          v-if="!formValid"
          color="error"
          icon="$error"
          title="PROJECT NAME NOT FOUND"
          text="Please enter your project name."
        ></v-alert>
      </v-row>
    </div>
  </section>
</template>

<script>
import { useCreateDatasetStore } from '@/store/createDatasetStore';
import { mapActions, mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useCreateDatasetStore, ['projectName']),
  },
  props: ['formValid'],
  data() {
    return {
      name: '',
    };
  },
  methods: {
    checkProjectName() {
      const isValid = this.name.trim() !== '';
      this.$emit('update-step-valid', isValid);
      if (isValid) {
        this.setProjectName(this.name);
      }
    },
    validateForm() {
      return this.name.trim() === '';
    },
    ...mapActions(useCreateDatasetStore, ['setProjectName']),
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}
</style>
