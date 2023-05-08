import DeleteContact from './delete-contact-by-id';

describe('DeleteContact', () => {
  it('should return success 200', async () => {
    global.fetch = jest.fn();
    jest
      .mocked(fetch)
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

    const response = await DeleteContact(1);
    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual({ success: true });
  });

  it('should throw error on invalid request', async () => {
    global.fetch = jest.fn();
    jest.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'Contact not found' }), {
        status: 404,
      })
    );

    expect(async () => await DeleteContact(1)).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});
