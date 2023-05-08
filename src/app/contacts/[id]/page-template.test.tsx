import { render, screen } from '@testing-library/react';
import testContact from '../../../../testUtils/fixtures/contact';
import PageTemplate from './page-template';

jest.mock('next/navigation');

describe('PageTemplate', () => {
  it('renders the Contacts Page component', () => {
    render(<PageTemplate contact={testContact} />);
    expect(screen.getByText(testContact.name)).toBeInTheDocument();
  });
});
