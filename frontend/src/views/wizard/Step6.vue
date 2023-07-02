<template>
  <section>
    <h1>Step 6 - Code Frame</h1>
    <p>
      Here are the first several rows of the code frame we will use, as well as
      category groupings.
    </p>
    <v-card class="codeDataPreview">
      <v-list>
        <v-list-item v-for="(value, key) in dummyItem" :key="key">
          <v-list-subheader> {{ key }} </v-list-subheader>
          <div v-for="(item, index) in value" :key="index">
            <v-list-item-title class="listItem">{{ item }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
    <p>
      There are a total of "dummy number" codes in "dummy number" category
      groupings
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dummyItem: {
        CategoryA: ["Code 1", "Code 2", "Code 3", "Code 3", "Code 3"],
        CategoryB: ["Code 4", "Code 5", "Code 6"],
        CategoryC: ["Code 4", "Code 5", "Code 6"],
      },
    };
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}
.codeDataPreview {
  height: 400px;
  margin: 3rem auto;
}

.listItem {
  padding-left: 20px;
}
</style>
