import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('LoadingTemplate', () => {
  it('renders a LoadingTemplate component', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
