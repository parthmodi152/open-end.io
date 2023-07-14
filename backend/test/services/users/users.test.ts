// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { assert, expect } from 'chai';
import { app } from '../../../src/app';
import { getUrl } from '../../setup-global';
import axios from 'axios';
import exp = require('constants');

describe('users service', () => {

  beforeEach(async () => {
    const knex = app.get('postgresqlClient');
    await knex('companies').insert([
      { uuid: '11111111-1111-4444-cccc-ffffffffffff', name: 'Company 1' },
      { uuid: '11111111-2222-4444-cccd-ffffffffffff', name: 'Company 2' },
      { uuid: '11111111-3333-4444-ccce-ffffffffffff', name: 'Company 3' },
    ]);

    await knex('users').insert([
      {
        uuid: '11111111-1111-5555-cccc-ffffffffffff',
        firstName: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@test.com',
        password: 'password',
        role: 'ADMIN',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      },
      {
        uuid: '11111111-1111-6666-cccc-ffffffffffff',
        firstName: 'Sally',
        lastName: 'Ann',
        email: 'Sa@test.com',
        password: 'password',
        role: 'COMPANY',
        companyUuid: '11111111-2222-4444-cccd-ffffffffffff',

      },
      {
        uuid: '11111111-1111-7777-cccc-ffffffffffff',
        firstName: 'Timmy',
        lastName: 'Zane',
        email: 'TZ@test.com',
        password: 'password',
        role: 'USER',
        companyUuid: '11111111-3333-4444-ccce-ffffffffffff',
      },
    ]);
  });

  afterEach(async () => {
    const knex = app.get('postgresqlClient');
    await knex.raw('TRUNCATE TABLE users CASCADE');
    await knex.raw('TRUNCATE TABLE companies CASCADE');
  });

  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('should find users', async () => {
    const users = await axios.get(getUrl('/users'));
    expect(users.status).to.equal(200);
    expect(users.statusText).to.equal('OK');
    expect(users.data).to.containSubset({
      limit: 10,
      skip: 0,
      total: 3,
    });
  });

  it('should create a user', async () => {
    const createdUser = await axios.post(getUrl('/users'), {
      firstName: 'fasdf',
      lastName: 'asdfasf',
      email: 'asdfas@gma.com',
      password: 'password',
      role: 'USER',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
    });
    expect(createdUser.status).to.equal(201);
    expect(createdUser.statusText).to.equal('Created');
    expect(createdUser.data).to.containSubset({
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      email: 'asdfas@gma.com',
      firstName: 'fasdf',
      lastName: 'asdfasf',
      role: 'USER',
    });
  });

  it('should not create a user with an invalid companyUuid', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfas@gma.com',
        password: 'password',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '',
            keyword: 'required',
            message: 'must have required property \'companyUuid\'',
            params: {
              missingProperty: 'companyUuid',
            },
            schemaPath: '#/required',
          },
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('should not create a user with an invalid email', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfasgma.com',
        password: 'password',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        firstName: 'fasdf',
        lastName: 'asdfasf',
        role: 'USER',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '/email',
            keyword: 'format',
            message: 'must match format "email"',
            params: {
              format: 'email',
            },
            schemaPath: '#/properties/email/format',
          },
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('should not create a user with an no password', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfasgma@doug.com',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        firstName: 'fasdf',
        lastName: 'asdfasf',
        role: 'USER',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        message: 'insert into "users" ("companyUuid", "email", "firstName", "lastName", "role") values ($1, $2, $3, $4, $5) returning "uuid" - null value in column "password" of relation "users" violates not-null constraint',
        name: 'BadRequest'
      });
    }
  });

  it('should not create a user with an no first name', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfasgma@doug.com',
        password: 'password',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        lastName: 'asdfasf',
        role: 'USER',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'firstName' },
            message: 'must have required property \'firstName\''
          }
        ]
      });
    }
  });

  it('should not create a user with an no last name', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfasgma@doug.com',
        password: 'password',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        firstName: 'fasdf',
        role: 'USER',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'lastName' },
            message: 'must have required property \'lastName\''
          }
        ]
      });
    }
  });

  it('should not create a user with an no role', async () => {
    try{
      const createdUser = await axios.post(getUrl('/users'), {
        email: 'asdfasgma@doug.com',
        password: 'password',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        firstName: 'fasdf',
        lastName: 'asdfasf',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'role' },
            message: 'must have required property \'role\''
          }
        ]
      });
    }
  });

  it('should create a user using axios create', async () => {
    const instance = await axios.create({
      baseURL: getUrl('/users'),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const createdUser = await instance.post('', {
      firstName: 'fasdf',
      lastName: 'asdfasf',
      email: 'asfsa@mail.com',
      password: 'password',
      role: 'USER',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
    });
    expect(createdUser.status).to.equal(201);
    expect(createdUser.statusText).to.equal('Created');
    expect(createdUser.data).to.containSubset({
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      email: 'asfsa@mail.com',
      firstName: 'fasdf',
      lastName: 'asdfasf',
      role: 'USER',
    });
  });

  it('should update user information', async () => {
    const updatedUser = await axios.patch(getUrl('/users/11111111-1111-5555-cccc-ffffffffffff'), {
      firstName: 'Tony',
    });
    expect(updatedUser.status).to.equal(200);
    expect(updatedUser.statusText).to.equal('OK');
    expect(updatedUser.data).to.containSubset({
      firstName: 'Tony',
      lastName: 'Doe',
      email: 'JohnDoe@test.com',
      password: 'password',
      role: 'ADMIN',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
    });
  });

  it('should get a user by uuid', async () => {
    const getUser = await axios.get(getUrl('/users/11111111-1111-5555-cccc-ffffffffffff'));
    expect(getUser.status).to.equal(200);
    expect(getUser.statusText).to.equal('OK');
    expect(getUser.data).to.containSubset({
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@test.com',
      password: 'password',
      role: 'ADMIN',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
    });
  });

  it('should delete a user by uuid', async () => {
    const deleteUser = await axios.delete(getUrl('/users/11111111-1111-7777-cccc-ffffffffffff'));
    expect(deleteUser.status).to.equal(200);
    expect(deleteUser.statusText).to.equal('OK');
    expect(deleteUser.data).to.containSubset({
      companyUuid: '11111111-3333-4444-ccce-ffffffffffff',
      email: 'TZ@test.com',
      firstName: 'Timmy',
      lastName: 'Zane',
      password: 'password',
      role: 'USER',
      uuid: '11111111-1111-7777-cccc-ffffffffffff',
    });
  });
});
