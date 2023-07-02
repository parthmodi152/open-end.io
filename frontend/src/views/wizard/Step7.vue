<template>
  <section>
    <h1>Step 7 - Export Options</h1>
    <p>
      New columns will be added to your data file with the results of the
      coding. Which style oif variables would you like?
    </p>
    <v-radio-group v-model="columnType">
      <v-radio
        label="Columns that contain the codes (eg. 8, 16, 57) that apply for each respondent"
        value="1"
      ></v-radio>
      <v-radio
        label="A column for each code with either a 1 or a 0 to indicate if that code applies"
        value="2"
      ></v-radio>
    </v-radio-group>
    <p>
      You have multiple columns selected for coding. How do you want to handle
      the results
    </p>
    <v-radio-group v-model="handleType">
      <v-radio
        label="Treat them as multiple answers to the same question, and give all results in a single st of columns"
        value="1"
      ></v-radio>
      <v-radio
        label="Treat them independently, and create a separate set of results for each source column"
        value="2"
      ></v-radio>
    </v-radio-group>
    <p>
      Also, do you want an additional set of columns (in the same sttyle) for
      categorys?
    </p>
    <v-radio-group v-model="styleType">
      <v-radio label="Yes" value="1"></v-radio>
      <v-radio label="No" value="2"></v-radio>
    </v-radio-group>
  </section>
</template>

<script>
export default {
  data() {
    return {
      columnType: "1",
      handleType: "1",
      styleType: "1",
    };
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}
</style>
