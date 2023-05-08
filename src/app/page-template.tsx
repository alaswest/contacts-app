'use client';
import ConfirmationDialog from '@/components/ConfirmationDialog/ConfirmationDialog';
import ContactForm, {
  ContactFormValues,
} from '@/components/ContactForm/ContactForm';
import ContactsList from '@/components/ContactsList/ContactsList';
import Contact from '@/types/Contact';
import CreateContact from '@/utils/api/create-contact';
import { Container } from '@chakra-ui/react';
import { useState } from 'react';

interface HomeTemplateProps {
  contacts: Contact[];
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ contacts }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true);
      await CreateContact(data);
      setShowCreateDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContactsList
        contacts={contacts}
        onCreateContact={() => setShowCreateDialog(true)}
      />
      <ConfirmationDialog
        title="Create Contact"
        body={
          <ContactForm
            formId="create-contact-form"
            onSubmit={(d) => onSubmit(d)}
          />
        }
        isForm
        formId="create-contact-form"
        confirmationButtonText="Create"
        showDialog={showCreateDialog}
        loading={loading}
        colorScheme={'blue'}
        onCloseDialog={() => setShowCreateDialog(false)}
        onConfirm={() => null}
      />
    </Container>
  );
};

export default HomeTemplate;
