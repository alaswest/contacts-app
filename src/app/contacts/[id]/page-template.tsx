'use client';
import ConfirmationDialog from '@/components/ConfirmationDialog/ConfirmationDialog';
import ContactCard from '@/components/ContactCard/ContactCard';
import ContactForm, {
  ContactFormValues,
} from '@/components/ContactForm/ContactForm';
import Contact from '@/types/Contact';
import DeleteContact from '@/utils/api/delete-contact-by-id';
import UpdateContact from '@/utils/api/update-contact-by-id';
import { Container } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface HomeTemplateProps {
  contact: Contact;
}

const ContactTemplate: React.FC<HomeTemplateProps> = ({ contact }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onUpdateSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true);
      await UpdateContact(contact.id, data);
      setShowEditDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteSubmit = async () => {
    try {
      setLoading(true);
      await DeleteContact(contact.id);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContactCard
        contact={contact}
        setShowDeleteDialog={setShowDeleteDialog}
        setShowEditDialog={setShowEditDialog}
      />
      <ConfirmationDialog
        title="Delete Contact"
        body="Are you sure you want to delete this contact?"
        confirmationButtonText="Delete"
        showDialog={showDeleteDialog}
        loading={loading}
        colorScheme={'red'}
        onCloseDialog={() => setShowDeleteDialog(false)}
        onConfirm={onDeleteSubmit}
      />
      <ConfirmationDialog
        title="Edit Contact"
        body={
          <ContactForm
            formId="edit-contact-form"
            onSubmit={(d) => onUpdateSubmit(d)}
            defaultValues={{
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              avatar: contact.avatar,
              birthday: moment(contact.birthday).format('YYYY-MM-DD'),
            }}
          />
        }
        isForm
        formId="edit-contact-form"
        confirmationButtonText="Update"
        showDialog={showEditDialog}
        loading={loading}
        colorScheme={'green'}
        onCloseDialog={() => setShowEditDialog(false)}
        onConfirm={() => null}
      />
    </Container>
  );
};

export default ContactTemplate;
