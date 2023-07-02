<template>
  <section>
    <h1>Step 3 - Choose Columns to Code</h1>
    <br />
    <p>
      Identify which column(s) you want to code by choosing them from the list
      below.
    </p>
    <br />
    <p>
      All columns will be coded with the same code frame. If you have separate
      questions to code, use the tool more than once.
    </p>
    <v-row justify="center">
      <v-col cols="4">
        <v-card class="itemList">
          <v-list v-model="selectedItems" multiple>
            <v-list-item
              v-for="(item, index) in columnsList"
              :key="index"
              @click="toggleItem(item)"
              :class="{ 'selected-item': isSelected(item) }"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="2" class="d-flex align-center justify-center flex-column">
        <v-btn small @click="transferItems">&gt;</v-btn>
        <br /><br />
        <v-btn small @click="transferItemsBack">&lt;</v-btn>
      </v-col>

      <v-col cols="4">
        <v-card class="itemList">
          <v-list v-model="selectedRightItems" multiple>
            <v-list-item
              v-for="(item, index) in selectedColumnsList"
              :key="index"
              @click="toggleRightItem(item)"
              :class="{ 'selected-item': isRightSelected(item) }"
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
  </section>
</template>

<script>
import { useCreateDatasetStore } from "@/store/createDatasetStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      selectedItems: [],
      selectedRightItems: [],
    };
  },
  computed: {
    ...mapState(useCreateDatasetStore, ["columnsList", "selectedColumnsList"]),
  },
  props: ["formValid"],
  methods: {
    validateForm() {
      return this.selectedColumnsList.length === 0;
    },
    toggleItem(item) {
      if (this.isSelected(item)) {
        this.selectedItems = this.selectedItems.filter(
          (selectedItem) => selectedItem !== item
        );
      } else {
        this.selectedItems.push(item);
      }
    },
    toggleRightItem(item) {
      if (this.isRightSelected(item)) {
        this.selectedRightItems = this.selectedRightItems.filter(
          (selectedItem) => selectedItem !== item
        );
      } else {
        this.selectedRightItems.push(item);
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item);
    },
    isRightSelected(item) {
      return this.selectedRightItems.includes(item);
    },
    transferItems() {
      this.setConfirmedName(
        this.selectedColumnsList.concat(this.selectedItems)
      );
      this.setColumnsName(
        this.columnsList.filter((item) => !this.selectedItems.includes(item))
      );
      this.selectedItems = [];
      this.$emit("update-step-valid", this.selectedColumnsList.length > 0);
    },
    transferItemsBack() {
      this.setColumnsName(this.columnsList.concat(this.selectedRightItems));
      this.setConfirmedName(
        this.selectedColumnsList.filter(
          (item) => !this.selectedRightItems.includes(item)
        )
      );
      this.selectedRightItems = [];
      this.$emit("update-step-valid", this.selectedColumnsList.length > 0);
    },
    ...mapActions(useCreateDatasetStore, [
      "setColumnsName",
      "setConfirmedName",
    ]),
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
