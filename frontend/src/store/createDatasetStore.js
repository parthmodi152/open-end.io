import { defineStore } from 'pinia';

export const useCreateDatasetStore = defineStore('createDataset', {
  state: () => ({
    projectName: '',
    columnsList: [], // this contain items on the left column
    selectedColumnsList: [], // this contain items on the right column
    savedData: [],
    selectedDatas: {
      respid: [
        '6414e63e-05e0-fbb1-5279-97bcf19c5598',
        '6414e71e-160e-82e7-5a70-9a293e7fb104',
      ],
      first_concept: [1, 2],
      likes_open_end_r0: [
        'Good info Colorful ad Easy to read',
        'I liked the actors, because they look happy.',
      ],
    },
  }),
  actions: {
    setProjectName(name) {
      this.projectName = name;
    },
    setColumnsName(columns) {
      this.columnsList = columns;
    },
    setConfirmedName(columns) {
      this.selectedColumnsList = columns;
    },
    setData(data) {
      this.savedData = data;
    },
    setSelectedColumnName(name) {
      this.selectedDatas[name] = [];
    },
    setDataToArray(name, data) {
      this.selectedDatas[name].push(data);
    },
  },
});
