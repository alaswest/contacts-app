import testContact from '../../../testUtils/fixtures/contact';
import UpdateContact from './update-contact-by-id';

describe('UpdateContact', () => {
  it('should return success 200', async () => {
    global.fetch = jest.fn();
    jest
      .mocked(fetch)
      .mockResolvedValue(
        new Response(JSON.stringify(testContact), { status: 200 })
      );

    const response = await UpdateContact(1, {
      name: 'Test Contact',
      email: 'test@test.test',
      phone: '123456789',
      avatar: 'https://i.pravatar.cc/300',
      birthday: new Date().toISOString(),
    });
    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual(testContact);
  });

  it('should throw error on invalid request', async () => {
    global.fetch = jest.fn();
    jest.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'Contact not found' }), {
        status: 404,
      })
    );

    expect(
      async () =>
        await UpdateContact(1, {
          name: 'Test Contact',
          email: 'test@test.test',
          phone: '123456789',
          avatar: 'https://i.pravatar.cc/300',
          birthday: new Date().toISOString(),
        })
    ).rejects.toThrow('Failed to fetch data');
  });
});
