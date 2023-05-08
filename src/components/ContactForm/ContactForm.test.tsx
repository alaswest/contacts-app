import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders a ContactForm component', () => {
    render(<ContactForm onSubmit={jest.fn()} formId="form" />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Birthday')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Avatar')).toBeInTheDocument();
  });

  it('fires onSubmit when form is submitted', async () => {
    const onSubmit = jest.fn();
    render(
      <div>
        <ContactForm onSubmit={onSubmit} formId="form" />
        <button type="submit" form="form">
          Submit
        </button>
      </div>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Birthday'), {
      target: { value: '2000-01-01' },
    });
    fireEvent.change(screen.getByPlaceholderText('Avatar'), {
      target: { value: 'https://www.test.test' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@test.test',
      phone: '1234567890',
      birthday: new Date('01/01/2000').toISOString(),
      avatar: 'https://www.test.test',
    });
  });

  it('sets default values when editing a contact', () => {
    render(
      <ContactForm
        onSubmit={jest.fn()}
        formId="form"
        defaultValues={{
          name: 'John Doe',
          email: 'test@test.test',
          phone: '1234567890',
          birthday: new Date('01/01/2000').toISOString(),
          avatar: 'https://www.test.test',
        }}
      />
    );

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@test.test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('https://www.test.test')
    ).toBeInTheDocument();
  });
});
