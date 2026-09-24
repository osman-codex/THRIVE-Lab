import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Message is required.')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Email/), 'invalid-email');
    await user.type(screen.getByLabelText(/Message/), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('clears field error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Trigger validation
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Name is required.')).toBeInTheDocument();

    // Type in the name field
    await user.type(screen.getByLabelText(/Name/), 'J');
    expect(screen.queryByText('Name is required.')).not.toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), 'Jane Doe');
    await user.type(screen.getByLabelText(/Email/), 'jane@example.com');
    await user.type(screen.getByLabelText(/Message/), 'Test message');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByText('Message Sent!')).toBeInTheDocument();
    expect(
      screen.getByText(/Thank you for reaching out/),
    ).toBeInTheDocument();
  });

  it('submits to endpoint when NEXT_PUBLIC_FORM_ENDPOINT is set', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
    } as Response);

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/), 'Jane Doe');
    await user.type(screen.getByLabelText(/Email/), 'jane@example.com');
    await user.type(screen.getByLabelText(/Message/), 'Test message');

    // Set the env variable
    process.env.NEXT_PUBLIC_FORM_ENDPOINT = 'https://example.com/api/contact';

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://example.com/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    fetchSpy.mockRestore();
    delete process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  });

  it('has accessible form labels and aria attributes', () => {
    render(<ContactForm />);
    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('id', 'contact-name');
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('id', 'contact-email');
  });

  it('displays aria-invalid on fields with errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/Message/)).toHaveAttribute('aria-invalid', 'true');
  });
});
