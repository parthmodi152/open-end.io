<template>
  <section>
    <h1>Step 2 - Upload Data</h1>
    <br />
    <p>
      Your data should be in a CSV file with header now. The open ends you want
      to code should be in one or more columns.
    </p>
    <br />
    <p>
      Note that if you are coding multiple columns, they need to be using a
      single code frame. If you have unrelated open ends to code, you should use
      this system separately for each one.
    </p>
    <p>
      You can include other data if you like and it will be included in the file
      returned to you.<br />File size limit of 10Mb.
    </p>
    <div>
      <v-row>
        <v-file-input
          class="fileInputter"
          show-size
          :rules="rules"
          accept="text/csv"
          label="Drag CSV File Here"
          v-model="fileInput"
          @change="handleFileInput"
        >
        </v-file-input>
      </v-row>
      <v-row v-if="!formValid">
        <v-alert
          color="error"
          icon="$error"
          title="CSV NOT FOUND"
          text="Please upload a CSV file before proceeding."
        ></v-alert
      ></v-row>
    </div>
  </section>
</template>

<script>
import { useCreateDatasetStore } from "@/store/createDatasetStore";
import { mapActions, mapState } from "pinia";
import Papa from "papaparse";

export default {
  data() {
    return {
      fileInput: [],
    };
  },
  props: ["formValid"],
  computed: {
    ...mapState(useCreateDatasetStore, [
      "columnsList",
      "savedData",
      "selectedDatas",
    ]),
  },
  methods: {
    ...mapActions(useCreateDatasetStore, [
      "setColumnsName",
      "setData",
      "setSelectedColumnName",
      "setDataToArray",
    ]),
    validateForm() {
      const fileHandler = this.fileInput;
      const logic =
        fileHandler.length > 0 && fileHandler[0].name.includes(".csv");
      return !logic;
    },
    handleFileInput(event) {
      const file = event.target.files[0];
      const fileValidation = file.name.includes(".csv");
      this.$emit("update-step-valid", fileValidation);
      if (fileValidation) {
        Papa.parse(file, {
          complete: this.parseComplete,
          header: true,
        });
      }
    },
    parseComplete(results) {
      // Access the parsed data from the 'data' property
      const parsedData = results.data;
      // Retrieve column names
      const columnNames = results.meta.fields;
      this.setColumnsName(columnNames);
      this.setData(parsedData);
    },
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}

.fileInputter {
  margin: 3rem auto;
}
</style>
