// For more information about this file see https://dove.feathersjs.com/guides/cli/app.test.html
import { assert } from 'chai';
import axios from 'axios';
import {getUrl} from './setup-global';

describe('Feathers application tests', () => {

  it('starts and shows the index page', async () => {
    const { data } = await axios.get<string>(getUrl('/'));
    assert.ok(data.indexOf('<html lang="en">') !== -1);
  });

  it('shows a 404 JSON error', async () => {
    try {
      await axios.get(getUrl('/path/to/nowhere'), {
        responseType: 'json',
      });
      assert.fail('should never get here');
    } catch (error: any) {
      const { response } = error;
      assert.strictEqual(response?.status, 404);
      assert.strictEqual(response?.data?.code, 404);
      assert.strictEqual(response?.data?.name, 'NotFound');
    }
  });
});
