import { fireEvent, render, screen } from '@testing-library/react';
import testContact from '../../../testUtils/fixtures/contact';
import ContactsList from './ContactsList';

describe('ContactsList', () => {
  it('renders a ContactsList component', () => {
    render(
      <ContactsList contacts={[testContact]} onCreateContact={jest.fn()} />
    );
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getByText(testContact.name)).toBeInTheDocument();
    expect(screen.getByAltText(testContact.name)).toHaveAttribute(
      'src',
      testContact.avatar
    );
  });

  it('fires onCreateContact when create button is clicked', () => {
    const onCreateContact = jest.fn();
    render(
      <ContactsList
        contacts={[testContact]}
        onCreateContact={onCreateContact}
      />
    );
    screen.getAllByRole('button')[0].click();
    expect(onCreateContact).toHaveBeenCalled();
  });

  it('filters results when search input is changed', () => {
    render(
      <ContactsList
        contacts={[testContact, { ...testContact, id: 2, name: 'Sarah Vardy' }]}
        onCreateContact={jest.fn()}
      />
    );
    expect(screen.getByText('Sarah Vardy')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search contacts...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(screen.queryByText('Sarah Vardy')).not.toBeInTheDocument();
  });
});
