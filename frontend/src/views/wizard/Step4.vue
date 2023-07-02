<template>
  <section>
    <h1>Step 4 - Confirm Columns</h1>
    <br />
    <p>Please verify that you are satisfied with your selected columns.</p>
    <br />
    <p>
      Click the name of each column on the left to see a sample of some of the
      responses in that column.
    </p>
    <v-row justify="center">
      <v-col cols="4">
        <v-card class="itemList">
          <v-list v-model="selectedItem">
            <v-list-item
              v-for="(item, index) in selectedColumnsList"
              :key="index"
              @click="toggleItem(item)"
              :class="{ 'selected-item': isSelected(item) }"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="itemList">
          <v-list v-model="selectedRightItem" v-if="this.selectedItem !== null">
            <v-list-item
              v-for="(item, index) in selectedDatas[selectedItem]"
              :key="index"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!formValid">
      <v-alert
        color="error"
        icon="$error"
        title="Selection Not Found"
        text="Please select atleast one column on the left."
      ></v-alert
    ></v-row>
    <p style="text-align: center">
      If you are satisfied, press Next. To correct your column choices, press
      Back.
    </p>
  </section>
</template>

<script>
import { useCreateDatasetStore } from "@/store/createDatasetStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    ...mapState(useCreateDatasetStore, [
      "selectedDatas",
      "selectedColumnsList",
    ]),
  },
  props: ["formValid"],
  methods: {
    toggleItem(item) {
      this.selectedItem = this.selectedItem === item ? null : item;
      this.$emit("update-step-valid", this.selectedItem !== null);
    },
    isSelected(item) {
      return this.selectedItem === item;
    },
    isRightSelected(item) {
      return this.selectedRightItem === item;
    },
    validateForm() {
      return this.selectedItem === null;
    },
    ...mapActions(useCreateDatasetStore, []),
  },
};
</script>

<style scoped>
section {
  margin: 5rem 1rem;
}

.itemList {
  margin: 2rem auto;
  height: 400px;
  overflow-y: scroll;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.flex-column {
  flex-direction: column;
}
.selected-item {
  background-color: #979797;
}
</style>
