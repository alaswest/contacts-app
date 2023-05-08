export type UpdateContactPayload = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string;
};

export default async function UpdateContact(
  id: number,
  data: UpdateContactPayload
) {
  const res = await fetch(`${process.env.APP_URL}/api/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res;
}
