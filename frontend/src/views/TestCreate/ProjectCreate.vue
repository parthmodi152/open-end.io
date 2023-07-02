<template>
  <v-card width="500" class="mx-auto">
    <v-form>
      <v-text-field
        v-model="name"
        label="Project Name"
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Description"
      ></v-text-field>
      <v-text-field
        v-model="owner"
        label="owner"
      ></v-text-field>
      <v-btn @click="createProject">Submit</v-btn>
      <v-btn @click="findProject">Find</v-btn>
      <v-btn @click="findAllProjects">Find All</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useProjectsStore } from '@/store/modules/projectsStore';

export default {
  data: () => ({
    name: '',
    description: '',
    owner: '',
  }),
  methods: {
    createProject() {
      if (this.name.trim() !== '' || this.description.trim() !== '' || this.owner.trim() !== '') {
        console.log('createProject');
        const response = this.onCreateProject( {
          name: this.name,
          description: this.description,
          ownerUuid: this.owner
        });
        console.log(response);
      }
    },
    findProject(){
      const id = 'af660485-73df-40c8-80ea-a592c8af88de';
      this.onGetProject(id).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    findAllProjects(){
      const ownerId = 'cf9b740e-9dd7-4f10-9db1-ee857645a201';
      this.onGetProjects(ownerId).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    ...mapActions(useProjectsStore, ['onCreateProject', 'onGetProject', 'onGetProjects']),
  },
  computed: {
    ...mapState(useProjectsStore, ['projects']),
  },

};

</script>

<style>

</style>
