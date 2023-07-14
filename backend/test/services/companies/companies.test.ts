// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { assert, expect } from 'chai';
import { app } from '../../../src/app';
//import { companies } from '../../../lib/services/companies/companies';
import { getUrl } from '../../setup-global';
import axios from 'axios';

describe('companies service', () => {
  beforeEach(async () => {
    // Add fixtures
    const knex = app.get('postgresqlClient');
    await knex('companies').insert([
      { uuid: '11111111-1111-4444-cccc-ffffffffffff', name: 'Company 1' },
      { uuid: '11111111-2222-4444-cccc-ffffffffffff', name: 'Company 2' },
      { uuid: '11111111-3333-4444-cccc-ffffffffffff', name: 'Company 3' },
    ]);
  });

  afterEach(async () => {
    // Clean up after each test
    const knex = app.get('postgresqlClient');
    // await knex('companies').truncate();
    await knex.raw('TRUNCATE TABLE companies CASCADE');
  });

  it('registered the service', () => {
    const service = app.service('companies');

    assert.ok(service, 'Registered the service');
  });

  it('should find companies', async () => {
    const companies = await axios.get(getUrl('/companies'), {});
    expect(companies.status).to.equal(200);
    expect(companies.statusText).to.equal('OK');
    expect(companies.data).to.containSubset({
      limit: 10,
      skip: 0,
      total: 3,
    });
    expect(companies.data.data).to.be.an('array');
    expect(companies.data.data).to.have.lengthOf(3);
    companies.data.data.every((company: any) => {
      expect(company).to.contain.all.keys('uuid', 'name', 'credit');
    });
  });

  it('should create a company', async () => {
    const createdCompany = await axios.post(getUrl('/companies'), {
      name: 'Company 4',
      credit: 10,
    });
    expect(createdCompany.status).to.equal(201);
    expect(createdCompany.statusText).to.equal('Created');
    expect(createdCompany.data).to.containSubset({
      name: 'Company 4',
      credit: '10.00',
    });
  });

  it('should not create company if no credits provided', async () => {
    try {
      await axios.post(getUrl('/companies'), {
        name: 'Company 4',
      });
      assert.fail('should never get here');
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
            message: 'must have required property \'credit\'',
            params: {
              missingProperty: 'credit',
            },
            schemaPath: '#/required',
          },
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('should not create company if no name provided', async () => {
    try {
      await axios.post(getUrl('/companies'), {
        credit: 10,
      });
      assert.fail('should never get here');
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
            message: 'must have required property \'name\'',
            params: {
              missingProperty: 'name',
            },
            schemaPath: '#/required',
          },
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('should not create company if invalid credit is provided', async () => {
    try {
      await axios.post(getUrl('/companies'), {
        name: 'Company 4',
        credit: 'abc',
      });
      assert.fail('should never get here');
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '/credit',
            keyword: 'type',
            message: 'must be number',
            params: {
              type: 'number',
            },
            schemaPath: '#/properties/credit/type',
          },
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('create company using axios create', async () => {
    const instance = axios.create({
      baseURL: getUrl('/companies'),
    });
    const createdCompany = await instance.post('', {
      name: 'Test Company',
      credit: 10,
    });
    expect(createdCompany.status).to.equal(201);
    expect(createdCompany.statusText).to.equal('Created');
    expect(createdCompany.data).to.containSubset({
      name: 'Test Company',
      credit: '10.00',
    });
  });

  it('should get a specific company', async () => {
    const getCompany = await axios.get(getUrl('companies'), {
      params: {
        uuid: '11111111-1111-4444-cccc-ffffffffffff',
      }
    });
    expect(getCompany.status).to.equal(200);
    expect(getCompany.statusText).to.equal('OK');
    expect(getCompany.data).to.containSubset({
      data: [
        {
          credit: '0.00',
          name: 'Company 1',
          uuid: '11111111-1111-4444-cccc-ffffffffffff',
        }
      ],
      limit: 10,
      skip: 0,
      total: 1,
    });
  });

  it('should patch and give the company credit', async () => {
    const updateCompany = await axios.patch(getUrl('/companies/11111111-1111-4444-cccc-ffffffffffff'), {
      credit: 100,
    });
    expect(updateCompany.status).to.equal(200);
    expect(updateCompany.statusText).to.equal('OK');
    expect(updateCompany.data).to.containSubset({
      uuid: '11111111-1111-4444-cccc-ffffffffffff',
      name: 'Company 1',
      credit: '100.00'
    });
  });

  it('should not patch and give the company credit if credit is not a number', async () => {
    try{
      const updateCompany = await axios.patch(getUrl('/companies/11111111-1111-4444-cccc-ffffffffffff'), {
        credit: 'abc',
      });
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
      expect(error.response.statusText).to.equal('Bad Request');
      expect(error.response.data).to.containSubset({
        className: 'bad-request',
        code: 400,
        data: [
          {
            instancePath: '/credit',
            schemaPath: '#/properties/credit/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          }
        ],
        message: 'validation failed',
        name: 'BadRequest',
      });
    }
  });

  it('should remove a specific company', async () => {
    const deleteCompany = await axios.delete(getUrl('/companies/11111111-1111-4444-cccc-ffffffffffff'), {});
    expect(deleteCompany.status).to.equal(200);
    expect(deleteCompany.statusText).to.equal('OK');
    expect(deleteCompany.data).to.containSubset({
      uuid: '11111111-1111-4444-cccc-ffffffffffff',
      name: 'Company 1',
      credit: '0.00'
    });
  });

});
