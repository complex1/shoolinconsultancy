'use client';

import { useState } from 'react';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  className?: string;
  buttonText?: string;
  placeholder?: string;
  darkMode?: boolean;
}

export default function NewsletterForm({
  className = '',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  darkMode = false
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          text: data.message || 'Successfully subscribed to the newsletter!',
          type: 'success'
        });
        setEmail('');
      } else {
        setMessage({
          text: data.message || 'Failed to subscribe. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage({
        text: 'An error occurred. Please try again later.',
        type: 'error'
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000); // Clear message after 5 seconds
    }
  };

  return (
    <div className={`${styles.container} ${className} ${darkMode ? styles.dark : ''}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
          disabled={loading}
          required
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : buttonText}
        </button>
      </form>
      
      {message && (
        <div className={`${styles.message} ${
          message.type === 'success' ? styles.success : styles.error
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
