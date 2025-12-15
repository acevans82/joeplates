'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FieldErrors = {
  email: string;
  phone: string;
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqarodpj';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email: string): string {
  if (!email) return '';
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validatePhone(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length > 0 && digits.length < 10) {
    return 'Please enter a 10-digit phone number';
  }
  return '';
}

export function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({ email: '', phone: '' });
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(event.target.value) }));
    }
  }

  function handleEmailBlur(): void {
    setFieldErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>): void {
    const formatted = formatPhoneNumber(event.target.value);
    setPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: validatePhone(formatted) }));
    }
  }

  function handlePhoneBlur(): void {
    setFieldErrors((prev) => ({ ...prev, phone: validatePhone(phone) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    setFieldErrors({ email: emailError, phone: phoneError });

    if (emailError || phoneError) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setPhone('');
        setFieldErrors({ email: '', phone: '' });
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-accent-gold)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3
            className="text-xl font-semibold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Message Sent
          </h3>
          <p className="text-white/70 mb-6">
            Thanks for reaching out. Joe will get back to you within 24-48 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setEmail('');
              setPhone('');
              setFieldErrors({ email: '', phone: '' });
            }}
            className="text-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)]/80 transition-colors underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-8">
      <h3
        className="text-xl font-semibold text-white mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Send a Note
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white/70 text-sm mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white/70 text-sm mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            disabled={status === 'submitting'}
            className={`w-full px-4 py-3 bg-[var(--color-primary-navy)] border rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:outline-none transition-colors disabled:opacity-50 ${
              fieldErrors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/20 focus:border-[var(--color-accent-gold)]'
            }`}
            placeholder="your@email.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-red-400 text-xs">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-white/70 text-sm mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            disabled={status === 'submitting'}
            className={`w-full px-4 py-3 bg-[var(--color-primary-navy)] border rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:outline-none transition-colors disabled:opacity-50 ${
              fieldErrors.phone
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/20 focus:border-[var(--color-accent-gold)]'
            }`}
            placeholder="(555) 123-4567"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-red-400 text-xs">{fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="topic" className="block text-white/70 text-sm mb-2">
            What are you reaching out about? *
          </label>
          <select
            id="topic"
            name="topic"
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors disabled:opacity-50"
          >
            <option value="">Select a topic</option>
            <option value="Private Dining">Private Dining</option>
            <option value="Collection & Curation">Collection & Curation</option>
            <option value="Travel">Travel</option>
            <option value="Membership">Membership</option>
            <option value="Something else">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-white/70 text-sm mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={status === 'submitting'}
            rows={5}
            className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors resize-none disabled:opacity-50"
            placeholder="Tell Joe what you're dreaming up..."
          />
        </div>

        {status === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-[var(--theme-corner-radius)] text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-6 py-3 bg-[var(--color-accent-gold)] text-white font-semibold rounded-[var(--theme-corner-radius)] hover:bg-[var(--color-accent-gold)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]/50 focus:ring-offset-2 focus:ring-offset-[var(--color-secondary-navy)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
        <p className="text-white/40 text-xs text-center">
          We&apos;ll get back to you within 24-48 hours.
        </p>
      </form>
    </div>
  );
}

