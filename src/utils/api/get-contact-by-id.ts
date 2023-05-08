import Contact from '@/types/Contact';

export default async function GetContact(id: string) {
  const res = await fetch(`${process.env.APP_URL}/api/contacts/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // Prefer not to force type, but limitation of fetch prevent typing
  return res.json() as Promise<Contact>;
}
