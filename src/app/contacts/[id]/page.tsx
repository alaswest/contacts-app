import GetContact from '@/utils/api/get-contact-by-id';
import styles from '../../page.module.scss';
import ContactTemplate from './page-template';

interface ContactProps {
  params: {
    id: string;
  };
}

export default async function Contact({ params }: ContactProps) {
  const contact = await GetContact(params.id);
  return (
    <main className={styles.main}>
      <ContactTemplate contact={contact} />
    </main>
  );
}
