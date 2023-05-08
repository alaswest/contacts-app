import Contact from '@/types/Contact';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ContactsListItem from './ContactsListItem';

interface ContactsListProps {
  contacts: Contact[];
  onCreateContact: () => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  onCreateContact,
}) => {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([
    ...contacts,
  ]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, contacts]);

  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={'space-between'}>
          <Heading size="md">Contacts</Heading>
          <Button
            isLoading={false}
            leftIcon={<AddIcon />}
            iconSpacing={0}
            colorScheme="blue"
            onClick={() => onCreateContact()}
          />
        </HStack>
      </CardHeader>

      <CardBody>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search contacts..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <br />
        <Stack as={'ul'} divider={<StackDivider />} spacing="1">
          {filteredContacts.map((contact) => (
            <ContactsListItem key={contact.id} contact={contact} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ContactsList;
