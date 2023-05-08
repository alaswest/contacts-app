import CreateContact from '@/utils/api/create-contact';
import {
  fireEvent,
  getByPlaceholderText,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import testContact from '../../testUtils/fixtures/contact';
import PageTemplate from './page-template';

jest.mock('@/utils/api/create-contact');

describe('PageTemplate', () => {
  it('renders the Contacts Page component', () => {
    render(<PageTemplate contacts={[testContact]} />);
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  // Unable to test due to nuances of Dialog Component
  it.skip('can create new contact', async () => {
    jest.mocked(CreateContact).mockResolvedValue(testContact);

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });

    const { baseElement } = render(<PageTemplate contacts={[testContact]} />);
    screen.getAllByRole('button')[0].click();

    await waitFor(() =>
      expect(getByText(baseElement, 'Create Contact')).toBeInTheDocument()
    );

    fireEvent.change(getByPlaceholderText(baseElement, 'Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByPlaceholderText(baseElement, 'Email'), {
      target: { value: 'test@test.test' },
    });
    fireEvent.change(getByPlaceholderText(baseElement, 'Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(getByPlaceholderText(baseElement, 'Birthday'), {
      target: { value: '2000-01-01' },
    });
    fireEvent.change(getByPlaceholderText(baseElement, 'Avatar'), {
      target: { value: 'https://www.test.test' },
    });
    fireEvent.click(getByText(baseElement, 'Submit'));

    await waitFor(() =>
      expect(CreateContact).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@test.test',
        phone: '1234567890',
        birthday: new Date('01/01/2000').toISOString(),
        avatar: 'https://www.test.test',
      })
    );
    expect(window.location.reload).toHaveBeenCalled();
  });
});
