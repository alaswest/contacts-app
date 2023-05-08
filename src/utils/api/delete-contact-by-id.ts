export default async function DeleteContact(id: number) {
  const res = await fetch(`${process.env.APP_URL}/api/contacts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res;
}
