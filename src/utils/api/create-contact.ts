import Contact from '@/types/Contact';

export type CreateContactPayload = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string;
};

export default async function CreateContact(data: CreateContactPayload) {
  const res = await fetch(`${process.env.APP_URL}/api/contacts`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Contact>;
}
