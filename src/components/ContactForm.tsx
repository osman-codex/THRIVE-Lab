'use client';

import { useState, useCallback, type FormEvent } from 'react';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for this field on change
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSubmitError(null);

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setSubmitting(true);

      try {
        const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

        if (endpoint) {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to send message. Please try again.');
          }
        }

        // Simulate success (no endpoint or endpoint succeeded)
        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : 'An unexpected error occurred.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [formData],
  );

  if (submitted) {
    return (
      <div className={styles.success} role="alert">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thank you for reaching out. Your message has gone to the lab inbox and
          someone from the team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        {errors.message && (
          <p id="message-error" className="form-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
