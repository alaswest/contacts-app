import Contact from '@/types/Contact';

const testContact: Contact = {
  id: 1,
  name: 'Test Contact',
  email: 'john.doe@test.test',
  phone: '123456789',
  avatar: 'https://i.pravatar.cc/300',
  birthday: '2021-01-01',
  createdAt: new Date().toISOString(),
};

export default testContact;
