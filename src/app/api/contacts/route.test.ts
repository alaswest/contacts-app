import { knex } from 'knex';

import testContact from '../../../../testUtils/fixtures/contact';
import { GET, POST } from './route';

jest.mock('knex');

describe('/contacts route', () => {
  describe('GET', () => {
    it('should return success 200', async () => {
      const mockDb = jest.fn(() => ({
        orderBy: jest.fn().mockResolvedValue([testContact]),
      }));

      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await GET();
      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual([testContact]);
    });
  });

  describe('POST', () => {
    it('should return success 200', async () => {
      const mockDb = jest.fn(() => ({
        insert: jest.fn().mockResolvedValue(testContact),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await POST(
        new Request('http://sampleurl.url', {
          method: 'POST',
          body: JSON.stringify({
            name: 'Test Contact',
            email: 'john.doe@test.test',
            phone: '123456789',
            avatar: 'https://i.pravatar.cc/300',
            birthday: new Date().toISOString(),
          }),
        })
      );
      expect(response.status).toEqual(201);
      expect(await response.json()).toEqual(testContact);
    });

    it('should return error 400 on invalid request', async () => {
      const mockDb = jest.fn(() => ({
        insert: jest.fn().mockResolvedValue(testContact),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await POST(
        new Request('http://sampleurl.url', {
          method: 'POST',
          body: JSON.stringify({}),
        })
      );
      expect(response.status).toEqual(400);
      expect(await response.json()).toEqual([
        {
          instancePath: '',
          keyword: 'required',
          message: "must have required property 'name'",
          params: { missingProperty: 'name' },
          schemaPath: '#/required',
        },
      ]);
    });
  });
});
