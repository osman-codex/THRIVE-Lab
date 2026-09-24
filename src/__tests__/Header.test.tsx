import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the lab name and VCU subtitle', () => {
    render(<Header />);
    expect(screen.getByText('The THRIVE Lab')).toBeInTheDocument();
    expect(screen.getByText('at VCU School of Public Health')).toBeInTheDocument();
  });

  it('renders the lab logo image', () => {
    render(<Header />);
    expect(screen.getByAltText('The THRIVE Lab logo')).toBeInTheDocument();
  });

  it('renders all six navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'What We Do' })).toHaveAttribute('href', '/research');
    expect(screen.getByRole('link', { name: 'Publications' })).toHaveAttribute('href', '/publications');
    expect(screen.getByRole('link', { name: 'News & Events' })).toHaveAttribute('href', '/news');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('marks the current page as active', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Team' })).not.toHaveAttribute('aria-current');
  });

  it('has a mobile menu toggle button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    ).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(toggle);

    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toBeInTheDocument();
  });

  it('has proper landmark roles', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
