import Contact from '@/types/Contact';
import {
  ArrowLeftIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
} from '@chakra-ui/icons';
import {
  Button,
  Card,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';

interface ContactCardProps {
  contact: Contact;
  setShowDeleteDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  setShowDeleteDialog,
  setShowEditDialog,
}) => (
  <Card padding={4}>
    <HStack justifyContent={'space-between'}>
      <Link href="/" display={'flex'} alignItems={'center'}>
        <ArrowLeftIcon boxSize={2} marginRight={1} /> back
      </Link>
      <HStack>
        <Button
          leftIcon={<DeleteIcon />}
          iconSpacing={0}
          colorScheme="red"
          onClick={() => setShowDeleteDialog(true)}
        />
        <Button
          leftIcon={<EditIcon />}
          iconSpacing={0}
          colorScheme="green"
          onClick={() => setShowEditDialog(true)}
        />
      </HStack>
    </HStack>
    <br />
    <HStack>
      <Image
        borderRadius="full"
        boxSize="80px"
        src={contact.avatar}
        alt={contact.name}
      />
      <Heading size="lg">{contact.name}</Heading>
    </HStack>
    <br />
    <VStack spacing={2} align={'left'}>
      <HStack>
        <EmailIcon />
        <Link isExternal size={'md'} href={`mailto:${contact.email}`}>
          {contact.email}
        </Link>
      </HStack>
      <HStack>
        <PhoneIcon />
        <Link isExternal size={'md'} href={`tel:${contact.phone}`}>
          {contact.phone}
        </Link>
      </HStack>
      <HStack>
        <CalendarIcon />
        <Text size={'md'}>{moment(contact.birthday).format('DD/MM/YYYY')}</Text>
      </HStack>
    </VStack>
  </Card>
);

export default ContactCard;
