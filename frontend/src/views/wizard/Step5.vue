<template>
  <section>
    <h1>Step 5 - Coding Settings</h1>
    <br />
    <h3>What type of data do you want to code?<br /><br /></h3>
    <v-radio-group v-model="dataType">
      <v-radio
        label="Text answers to a standard open end question"
        value="standard"
      ></v-radio>
      <v-radio
        label="Brand names (coming in June 2023)"
        value="2"
        disabled
      ></v-radio>
    </v-radio-group>
    <p>
      We can also help with transcripts from chatbot interviews. Contact us for
      custom asssistance.
    </p>
    <br />
    <hr />
    <p>
      <br />Do you want to use a code frame from a previous project?
      <br /><br />
      If yes, you can upload it here. It needs to be a CSV file in the same
      format that we provided to you on that occasion. <br /><br />
      If no, just skip this, and we'll make the code frame for you in the next
      step.<br /><br />
    </p>
    <v-row>
      <v-file-input
        show-size
        accept="text/csv"
        ref="fileInput"
        label="Drag CSV File Here (optional)"
        @change="handleFileInput"
      >
      </v-file-input>
    </v-row>
    <br />
    <hr />
    <p>
      <br />
      Coding may work better if you provide the question that the respondents
      saw. This is optional. <br /><br />

      Paste the question below if you want. Otherwise, leave this blank.
    </p>
    <v-row justify="center">
      <v-col cols="4">
        <v-list-subheader>Original Question (optional)</v-list-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Enter question text here or leave blank"
          placeholder="How do you feel about this ad?"
          @input="checkProjectName"
          v-model="name"
          ref="nameField"
        ></v-text-field>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dataType: "standard",
    };
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}
</style>
