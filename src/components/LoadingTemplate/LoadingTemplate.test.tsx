import { render, screen } from '@testing-library/react';
import LoadingTemplate from './LoadingTemplate';

describe('LoadingTemplate', () => {
  it('renders a LoadingTemplate component', () => {
    render(<LoadingTemplate />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
