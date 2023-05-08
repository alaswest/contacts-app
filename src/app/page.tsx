import GetContacts from '@/utils/api/get-contacts';
import HomeTemplate from './page-template';
import styles from './page.module.scss';

export default async function Home() {
  const contacts = await GetContacts();
  return (
    <main className={styles.main}>
      <HomeTemplate contacts={contacts} />
    </main>
  );
}
