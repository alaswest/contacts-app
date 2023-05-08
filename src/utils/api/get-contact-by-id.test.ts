import testContact from '../../../testUtils/fixtures/contact';
import GetContact from './get-contact-by-id';

describe('GetContactByID', () => {
  it('should return success 201', async () => {
    global.fetch = jest.fn();
    jest
      .mocked(fetch)
      .mockResolvedValue(
        new Response(JSON.stringify(testContact), { status: 200 })
      );

    const response = await GetContact('1');
    expect(response).toEqual(testContact);
  });

  it('should throw error on invalid request', async () => {
    global.fetch = jest.fn();
    jest.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'Contact not found' }), {
        status: 404,
      })
    );

    expect(async () => await GetContact('1')).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});
