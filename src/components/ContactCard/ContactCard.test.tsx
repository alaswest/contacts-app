import { render, screen } from '@testing-library/react';
import testContact from '../../../testUtils/fixtures/contact';
import ContactCard from './ContactCard';

describe('ContactCard', () => {
  it('renders a ContactCard component', () => {
    const date = new Date('2000-01-01').toISOString();
    render(
      <ContactCard
        contact={{ ...testContact, birthday: date }}
        setShowDeleteDialog={jest.fn()}
        setShowEditDialog={jest.fn()}
      />
    );
    expect(screen.getByText('back')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    expect(screen.getByText(testContact.name)).toBeInTheDocument();
    expect(screen.getByText(testContact.email)).toBeInTheDocument();
    expect(screen.getByText(testContact.phone)).toBeInTheDocument();
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
    expect(screen.getByAltText(testContact.name)).toHaveAttribute(
      'src',
      testContact.avatar
    );
  });

  it('fires setShowDeleteDialog when delete button is clicked', () => {
    const setShowDeleteDialog = jest.fn();
    const setShowEditDialog = jest.fn();
    render(
      <ContactCard
        contact={testContact}
        setShowDeleteDialog={setShowDeleteDialog}
        setShowEditDialog={setShowEditDialog}
      />
    );
    screen.getAllByRole('button')[0].click();
    expect(setShowDeleteDialog).toHaveBeenCalled();
  });

  it('fires setShowEditDialog when delete button is clicked', () => {
    const setShowDeleteDialog = jest.fn();
    const setShowEditDialog = jest.fn();
    render(
      <ContactCard
        contact={testContact}
        setShowDeleteDialog={setShowDeleteDialog}
        setShowEditDialog={setShowEditDialog}
      />
    );
    screen.getAllByRole('button')[1].click();
    expect(setShowEditDialog).toHaveBeenCalled();
  });
});
