// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import {assert, expect} from 'chai';
import {app} from '../../../src/app';
import {getUrl} from '../../setup-global';
import axios from 'axios';

describe('project service', () => {

  beforeEach(async () => {
    const knex = app.get('postgresqlClient');
    await knex('companies').insert([
      { uuid: '11111111-1111-4444-cccc-ffffffffffff', name: 'Company 1' },
      { uuid: '11111111-2222-5555-cccc-ffffffffffff', name: 'Company ABC' }
    ]);
    await knex('users').insert([
      {
        uuid: '11111111-1111-5555-cccc-ffffffffffff',
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@Test.com',
        password: 'password',
        role: 'USER',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      },
      {
        uuid: '11111111-1111-e555-cccc-ffffffffffff',
        firstName: 'Steve',
        lastName: 'Smith',
        email: 'SteveSmith@Test.com',
        password: 'password',
        role: 'USER',
        companyUuid: '11111111-2222-5555-cccc-ffffffffffff',
      }
    ]);

    await knex('project').insert([
      {
        uuid: '11111111-1111-6666-cccc-ffffffffffff',
        name: 'Project 1',
        description: 'Project 1 description',
        config: '{}',
        isArchive: false,
        createdBy: '11111111-1111-5555-cccc-ffffffffffff',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      },
      {
        uuid: '11111111-1111-6666-cccc-fffeeeffffff',
        name: 'Project ABC',
        description: 'Project ABC description',
        config: '{}',
        isArchive: false,
        createdBy: '11111111-1111-e555-cccc-ffffffffffff',
        companyUuid: '11111111-2222-5555-cccc-ffffffffffff',
      }
    ]);
  });

  afterEach(async () => {
    const knex = app.get('postgresqlClient');
    await knex.raw('truncate table companies cascade');
    await knex.raw('truncate table users cascade');
    await knex.raw('truncate table project cascade');
  });

  it('registered the service', () => {
    const service = app.service('project');

    assert.ok(service, 'Registered the service');
  });

  it('should create a project', async () => {
    const createProject = await axios.post(getUrl('/project'), {
      name: 'Project Reborn',
      description: 'Project born description',
      config: '{}',
      isArchive: false,
      createdBy: '11111111-1111-5555-cccc-ffffffffffff',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      dataFileUrl: 'https://test.com/data.csv',
      resultFileUrl: 'https://test.com/result.csv',
      uploadCsv: { data: 'data', result: 'result' },
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    expect(createProject.status).to.equal(201);
    expect(createProject.statusText).to.equal('Created');
    expect(createProject.data).to.containSubset({
      name: 'Project Reborn',
      description: 'Project born description',
      isArchive: false,
      config: {},
    });
  });

  it('should return all projects', async () => {
    const getProjects = await axios.get(getUrl('project', {}));
    expect(getProjects.status).to.equal(200);
    expect(getProjects.statusText).to.equal('OK');
    expect(getProjects.data).to.containSubset({
      limit: 10,
      skip: 0,
      total: 2,
    });
  });

  it('should find a project', async () => {
    const getProject = await axios.get(getUrl('project'),{
      params: {
        uuid: '11111111-1111-6666-cccc-ffffffffffff'
      }
    });
    expect(getProject.status).to.equal(200);
    expect(getProject.statusText).to.equal('OK');
    expect(getProject.data).to.containSubset({
      data: [
        {
          config: {},
          description: 'Project 1 description',
          isArchive: false,
          name: 'Project 1',
          createdBy: '11111111-1111-5555-cccc-ffffffffffff',
          uuid: '11111111-1111-6666-cccc-ffffffffffff',
        }
      ],
      limit: 10,
      skip: 0,
      total: 1,
    });
  });

  it('should find a project by name', async () => {
    const findProject = await axios.get(getUrl('project'),{
      params: {
        name: 'Project ABC'
      }
    });
    expect(findProject.status).to.equal(200);
    expect(findProject.statusText).to.equal('OK');
    expect(findProject.data).to.containSubset({
      data: [
        {
          config: {},
          description: 'Project ABC description',
          isArchive: false,
          name: 'Project ABC',
          createdBy: '11111111-1111-e555-cccc-ffffffffffff',
        }]
      
    });
  });

  it('should find a project by owner', async () => {
    const createProject = await axios.post(getUrl('project'), {
      name: 'Project Reborn',
      description: 'Project born description',
      createdBy: '11111111-1111-e555-cccc-ffffffffffff',

    });
    const findProject = await axios.get(getUrl('project'), {
      params: {
        createdBy: '11111111-1111-e555-cccc-ffffffffffff'
      }
    });
    expect(findProject.status).to.equal(200);
    expect(findProject.statusText).to.equal('OK');
    expect(findProject.data).to.containSubset({
      data: [
        {
          config: {},
          description: 'Project ABC description',
          isArchive: false,
          name: 'Project ABC',
          createdBy: '11111111-1111-e555-cccc-ffffffffffff',
          uuid: '11111111-1111-6666-cccc-fffeeeffffff',
        },
        {
          config: {},
          description: 'Project born description',
          isArchive: false,
          name: 'Project Reborn',
          createdBy: '11111111-1111-e555-cccc-ffffffffffff',
        }
      ]
    });
  });

  it('should create a project with axios create', async () => {
    const instance = axios.create({
      baseURL: getUrl('project'),
    });
    const createProject = await instance.post('', {
      name: 'Project Reborn',
      description: 'Project born description',
      createdBy: '11111111-1111-5555-cccc-ffffffffffff',
    });
    expect(createProject.status).to.equal(201);
    expect(createProject.statusText).to.equal('Created');
    expect(createProject.data).to.containSubset({
      name: 'Project Reborn',
      description: 'Project born description',
      isArchive: false,
      config: {},
      createdBy: '11111111-1111-5555-cccc-ffffffffffff',
    });
  });

  it('should archive the project', async () => {
    const updateProject = await axios.patch(getUrl('/project/11111111-1111-6666-cccc-ffffffffffff'), {
      name: 'Project Phoenix',
    });
    expect(updateProject.status).to.equal(200);
    expect(updateProject.statusText).to.equal('OK');
    expect(updateProject.data).to.containSubset({
      config: {},
      description: 'Project 1 description',
      isArchive: false,
      name: 'Project Phoenix',
      createdBy: '11111111-1111-5555-cccc-ffffffffffff',
      uuid: '11111111-1111-6666-cccc-ffffffffffff',
    });
  });

  it('should delete the project', async () => {
    const deleteProject = await axios.delete(getUrl('/project/11111111-1111-6666-cccc-ffffffffffff'));
    expect(deleteProject.status).to.equal(200);
    expect(deleteProject.statusText).to.equal('OK');
    expect(deleteProject.data).to.containSubset({
      config: {},
      description: 'Project 1 description',
      isArchive: false,
      name: 'Project 1',
      createdBy: '11111111-1111-5555-cccc-ffffffffffff',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      uuid: '11111111-1111-6666-cccc-ffffffffffff',
    });
  });

  it('should not create a project with no createdBy', async () => {
    try{
      const createProject = await axios.post(getUrl('project'), {
        name: 'Project Reborn',
        description: 'Project Reborn description',
        config: {},
        isArchive: 'false',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        data: [
          {
            instancePath: '',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'createdBy' },
            message: 'must have required property \'createdBy\''
          }
        ]
      });
    }
  });

  it('should not create a project with no name', async () => {
    try{
      const createProject = await axios.post(getUrl('project'), {
        description: 'Project Reborn description',
        config: {},
        isArchive: 'false',
        createdBy: '11111111-1111-5555-cccc-ffffffffffff',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        data: [
          {
            instancePath: '',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: 'must have required property \'name\''
          }]
      });
    }
  });

});
