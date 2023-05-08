import { render, screen } from '@testing-library/react';
import { Providers } from './providers';

describe('Providers', () => {
  it('renders a Providers component', () => {
    render(
      <Providers>
        <div>children</div>
      </Providers>
    );
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
