import Contact from '@/types/Contact';
import { knex } from 'knex';

import { NextRequest } from 'next/server';
import { DELETE, GET, PUT } from './route';

jest.mock('knex');

const testContact: Contact = {
  id: 1,
  name: 'Test Contact',
  email: 'john.doe@test.test',
  phone: '123456789',
  avatar: 'https://i.pravatar.cc/300',
  birthday: '2021-01-01',
  createdAt: new Date().toISOString(),
};

describe('/contacts/:id route', () => {
  describe('GET', () => {
    it('should return success 200', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          first: jest.fn().mockResolvedValue(testContact),
        })),
      }));

      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await GET(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'GET',
        })
      );
      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual(testContact);
    });

    it('should return error 404 on invalid request', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          first: jest.fn().mockResolvedValue(undefined),
        })),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await GET(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'GET',
        })
      );
      expect(response.status).toEqual(404);
      expect(await response.json()).toEqual({ error: 'Contact not found' });
    });
  });

  describe('PUT', () => {
    it('should return success 200', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          update: jest.fn().mockResolvedValue(testContact),
        })),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await PUT(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'PUT',
          body: JSON.stringify({
            name: 'Test Contact',
            email: 'john.doe@test.test',
            phone: '123456789',
            avatar: 'https://i.pravatar.cc/300',
            birthday: new Date().toISOString(),
          }),
        })
      );
      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual(testContact);
    });
    it('should return error 400 on invalid request', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          update: jest.fn().mockResolvedValue(testContact),
        })),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await PUT(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'PUT',
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
    it('should return 404 on not found', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          update: jest.fn().mockResolvedValue(0),
        })),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await PUT(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'PUT',
          body: JSON.stringify({
            name: 'Test Contact',
            email: 'john.doe@test.test',
            phone: '123456789',
            avatar: 'https://i.pravatar.cc/300',
            birthday: new Date().toISOString(),
          }),
        })
      );
      expect(response.status).toEqual(404);
      expect(await response.json()).toEqual({ error: 'Contact not found' });
    });
  });

  describe('DELETE', () => {
    it('should return success 200', async () => {
      const mockDb = jest.fn(() => ({
        where: jest.fn(() => ({
          del: jest.fn().mockResolvedValue(1),
        })),
      }));
      jest.mocked(knex).mockReturnValue(mockDb as never);
      const response = await DELETE(
        new NextRequest('http://sampleurl.url/contacts/1', {
          method: 'DELETE',
        })
      );
      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual({ success: true });
    });
  });
  it('should return error 404 on invalid request', async () => {
    const mockDb = jest.fn(() => ({
      where: jest.fn(() => ({
        del: jest.fn().mockResolvedValue(0),
      })),
    }));
    jest.mocked(knex).mockReturnValue(mockDb as never);
    const response = await DELETE(
      new NextRequest('http://sampleurl.url/contacts/1', {
        method: 'DELETE',
      })
    );
    expect(response.status).toEqual(404);
    expect(await response.json()).toEqual({ error: 'Contact not found' });
  });
});
