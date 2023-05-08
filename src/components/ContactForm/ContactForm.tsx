import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface ContactFormProps {
  formId: string;
  defaultValues?: ContactFormValues;
  onSubmit: (data: ContactFormValues) => void;
}

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string;
};

const ContactForm: React.FC<ContactFormProps> = ({
  formId,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ defaultValues });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, birthday: new Date(data.birthday).toISOString() })
      )}
    >
      <Stack spacing={4}>
        <FormControl id="name" isInvalid={errors.name !== undefined}>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Name" {...register('name', { required: true })} />
          {errors.name && (
            <FormErrorMessage>Enter the name of the contact</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="email" isInvalid={errors.email !== undefined}>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <FormErrorMessage>Enter the email of the contact</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="phone" isInvalid={errors.phone !== undefined}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            type="tel"
            {...register('phone', { required: true })}
          />
          {errors.phone && (
            <FormErrorMessage>
              Enter the phone number of the contact
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="birthday" isInvalid={errors.birthday !== undefined}>
          <FormLabel>Birthday</FormLabel>
          <Input
            placeholder="Birthday"
            type="date"
            {...register('birthday', { required: true })}
          />
          {errors.birthday && (
            <FormErrorMessage>
              Enter the birthday of the contact
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="avatar" isInvalid={errors.avatar !== undefined}>
          <FormLabel>Avatar Image URL</FormLabel>
          <Input
            placeholder="Avatar"
            {...register('avatar', { required: true })}
          />
          {errors.name && (
            <FormErrorMessage>Enter the avatar of the contact</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </form>
  );
};

export default ContactForm;
