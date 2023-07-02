import {apiClient} from '@/api';
import {defineStore} from 'pinia';

export const useProjectsStore = defineStore(('projects'), {
  state: () => ({
    projectModel : {
      uuid: '',
      name: '',
      description: '',
      ownerUuid: '',
      isArchived: false,
      config: {}
    },
    projectsList: [],
    totalProjects: 0,
    invalidated: true,
    limit: 12,
    skip: 0,
  }),
  getters: {
    getProjectsList: ({ projectsList }) => projectsList,
    getProject: ({ projectModel }) => projectModel,
    getTotalProjects: ({ totalProjects }) => totalProjects,
  },
  actions: {
    invalidateProjects() {
      this.projectModel = {
        uuid: '',
        name: '',
        description: '',
        ownerUuid: '',
        isArchived: false,
        config: {}
      };
      this.projectsList.splice(0, this.projectsList.length);
      this.totalProjects = 0;
      this.invalidated = true;
    },
    setProjects(data) {
      this.projectsList.splice(0, this.projectsList.length);
      this.projectsList = [...this.projectsList, ...data.data];
      this.totalProjects = data.total;
      this.invalidated = false;
    },
    setProject(data) {
      this.projectModel = {...data};
      this.invalidated = false;
    },
    onCreateProject(newProject) {
      this.invalidateProjects();
      return new Promise((resolve, reject) => {
        apiClient.service('project').create(newProject).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    onUpdateProject(projectUuid, updatedProjectData) {
      this.invalidateProjects();
      return new Promise((resolve, reject) => {
        apiClient.service('project')
          .patch(projectUuid, updatedProjectData)
          .then(resolve)
          .catch(reject);
      });
    },
    onDeleteProject(projectUuid) {
      this.invalidateProjects();
      return new Promise((resolve, reject) => {
        apiClient.service('project')
          .remove(projectUuid)
          .then(resolve)
          .catch(reject);
      });
    },
    onGetProjects(ownerUuid) {
      if (!this.invalidated) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        apiClient.service('project')
          .find({
            query: {
              $limit: this.limit,
              $skip: this.skip,
              ownerUuid: ownerUuid,
            },
          })
          .then((response) => {
            this.setProjects(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onGetProject(projectUuid) {
      if (!this.invalidated) {
        return Promise.resolve(this.projectModel);
      }
      return new Promise((resolve, reject) => {
        apiClient.service('project')
          .find({
            query: {
              uuid: projectUuid,
            }
          })
          .then((response) => {
            this.setProject(response.data[0]);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }

});
