import testContact from '../../../testUtils/fixtures/contact';
import CreateContact from './create-contact';

describe('CreateContact', () => {
  it('should return success 201', async () => {
    global.fetch = jest.fn();
    jest
      .mocked(fetch)
      .mockResolvedValue(
        new Response(JSON.stringify(testContact), { status: 201 })
      );

    const response = await CreateContact({
      name: 'Test Contact',
      email: 'test@test.test',
      phone: '123456789',
      avatar: 'https://i.pravatar.cc/300',
      birthday: new Date().toISOString(),
    });
    expect(response).toEqual(testContact);
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
        await CreateContact({
          name: 'Test Contact',
          email: 'test@test.test',
          phone: '123456789',
          avatar: 'https://i.pravatar.cc/300',
          birthday: new Date().toISOString(),
        })
    ).rejects.toThrow('Failed to fetch data');
  });
});
