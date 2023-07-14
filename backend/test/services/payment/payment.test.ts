// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { assert, expect } from 'chai';
import { app } from '../../../src/app';
import { getUrl } from '../../setup-global';
import axios from 'axios';
import exp = require('constants');

describe('payment service', () => {

  beforeEach(async () => {
    const knex = app.get('postgresqlClient');
    await knex('companies').insert([
      { uuid: '11111111-1111-4444-cccc-ffffffffffff', name: 'Company 1', credit: 1000 }
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
        uuid: '11111111-2222-5555-cccc-ffffffffffff',
        firstName: 'John2',
        lastName: 'Doe2',
        email: 'JohnDoe2@test.com',
        password: 'password',
        role: 'USER',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      }

    ]);

    await knex('payment').insert([
      {
        uuid: '11111111-1111-6666-cccc-ffffffffffff',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
        type: 'INCOME',
        amount: 100,
        balance: 100
      },
      {
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
        type: 'EXPENSE',
        amount: 100,
        balance: 100
      },
      {
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        userUuid: '11111111-2222-5555-cccc-ffffffffffff',
        type: 'INCOME',
        amount: 100,
        balance: 100
      },
    ]);

  });

  afterEach(async () => {
    // Clean up after each test
    const knex = app.get('postgresqlClient');
    // await knex('companies').truncate();
    await knex.raw('TRUNCATE TABLE companies CASCADE');
    await knex.raw('TRUNCATE TABLE users CASCADE');
    await knex.raw('TRUNCATE TABLE payment CASCADE');
  });

  it('registered the service', () => {
    const service = app.service('payment');
    assert.ok(service, 'Registered the service');
  });

  it('should create a payment', async () => {
    const createPayment = await axios.post(getUrl('payment'), {
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      balance: 100,
      type: 'INCOME',
      amount: 100
    });
    expect(createPayment.status).to.equal(201);
    expect(createPayment.statusText).to.equal('Created');
    expect(createPayment.data).to.have.property('uuid');
    expect(createPayment.data).to.containSubset({
      amount: '100.00',
      balance: '100.00',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      type: 'INCOME',
      userUuid: '11111111-1111-5555-cccc-ffffffffffff',
    });
  });

  it('should not create a payment with no userUuid', async () => {
    try{
      const createPayment = await axios.post(getUrl('payment'), {
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        type: 'INCOME',
        amount: 100,
        balance: 100
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [{
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'userUuid' },
          message: 'must have required property \'userUuid\''
        }]
      });
    }
  });

  it('should not create a payment with no companyUuid', async () => {
    try{
      const createPayment = await axios.post(getUrl('payment'), {
        type: 'INCOME',
        amount: 100,
        balance: 100,
        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [{
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'companyUuid' },
          message: 'must have required property \'companyUuid\''
        }]
      });
    }
  });

  it('should not create a payment with no amount', async () => {
    try{
      const createPayment = await axios.post(getUrl('payment'), {
        type: 'INCOME',
        balance: 100,
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',

        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [{
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'amount' },
          message: 'must have required property \'amount\''
        }]
      });
    }
  });
  it('should not create a payment with no balance', async () => {
    try{
      const createPayment = await axios.post(getUrl('payment'), {
        amount: 100,
        type: 'INCOME',
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',

        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [{
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'balance' },
          message: 'must have required property \'balance\''
        }]
      });
    }
  });

  it('should not create a payment with no type', async () => {
    try{
      const createPayment = await axios.post(getUrl('payment'), {
        amount: 100,
        balance: 100,
        companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
        userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        message: 'insert into "payment" ("amount", "balance", "companyUuid", "userUuid") values ($1, $2, $3, $4) returning "uuid" - null value in column "type" of relation "payment" violates not-null constraint',
        name: 'BadRequest'
      });
    }
  });

  it('should find payments', async () => {
    const getPayments = await axios.get(getUrl('payment'));
    expect(getPayments.status).to.equal(200);
    expect(getPayments.statusText).to.equal('OK');
    expect(getPayments.data).to.containSubset({
      limit: 10,
      skip: 0,
      total: 3,
    });
  });

  it('should find payment for a specific user', async () => {
    const getPayments = await axios.get(getUrl('payment'), {
      params: {
        userUuid: '11111111-1111-5555-cccc-ffffffffffff'
      }
    });
    expect(getPayments.status).to.equal(200);
    expect(getPayments.statusText).to.equal('OK');
    expect(getPayments.data).to.containSubset({
      limit: 10,
      skip: 0,
      total: 2,
    });
  });

  it('should get a payment', async () => {
    const getPayment = await axios.get(getUrl('payment/11111111-1111-6666-cccc-ffffffffffff'));
    expect(getPayment.status).to.equal(200);
    expect(getPayment.statusText).to.equal('OK');
    expect(getPayment.data).to.containSubset({
      amount: '100.00',
      balance: '100.00',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      type: 'INCOME',
      userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      uuid: '11111111-1111-6666-cccc-ffffffffffff',
    });
  });

  it('should update a payment', async () => {
    const updatePayment = await axios.patch(getUrl('payment/11111111-1111-6666-cccc-ffffffffffff'), {
      amount: 110,
    });
    expect(updatePayment.status).to.equal(200);
    expect(updatePayment.statusText).to.equal('OK');
    expect(updatePayment.data).to.containSubset({
      amount: '110.00',
      balance: '100.00',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      type: 'INCOME',
      userUuid: '11111111-1111-5555-cccc-ffffffffffff',
      uuid: '11111111-1111-6666-cccc-ffffffffffff',
    });
  });

  it('should remove a specific payment', async () => {
    const deletePayment = await axios.delete(getUrl('payment/11111111-1111-6666-cccc-ffffffffffff'));
    expect(deletePayment.status).to.equal(200);
    expect(deletePayment.statusText).to.equal('OK');
    expect(deletePayment.data).to.containSubset({
      amount: '100.00',
      balance: '100.00',
      companyUuid: '11111111-1111-4444-cccc-ffffffffffff',
      type: 'INCOME',
      userUuid: '11111111-1111-5555-cccc-ffffffffffff',
    });
  });

});
