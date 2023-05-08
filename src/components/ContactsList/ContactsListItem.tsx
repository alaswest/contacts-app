import Contact from '@/types/Contact';
import { HStack, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

interface ContactsListItemProps {
  contact: Contact;
}

const ContactsList: React.FC<ContactsListItemProps> = ({ contact }) => {
  return (
    <LinkBox>
      <HStack as={'li'} spacing={8} paddingY={2}>
        <Image
          borderRadius="full"
          boxSize="80px"
          src={contact.avatar}
          alt={contact.name}
        />
        <Text pt="2" fontSize="md" fontWeight="bold">
          <LinkOverlay href={`contacts/${contact.id}`}>
            {contact.name}
          </LinkOverlay>
        </Text>
      </HStack>
    </LinkBox>
  );
};

export default ContactsList;
