'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import styles from './ConsultationForm.module.css';

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedDate: string;
  selectedTime: string;
  attorney: string;
  agreeToTerms: boolean;
}

export default function ConsultationForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ConsultationFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  // Available attorneys
  const attorneys = [
    'Senior Legal Advisor',
    'Corporate Law Specialist',
    'Tax Attorney',
    'IP Lawyer',
    'Litigation Counsel'
  ];

  // Calculate minimum date (today) for the date picker
  const minDate = format(new Date(), 'yyyy-MM-dd');

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Format the date as ISO string
      const formattedData = {
        ...data,
        selectedDate: new Date(data.selectedDate).toISOString()
      };

      const response = await fetch('/api/public/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        reset(); // Clear form
        setSelectedDate('');
      } else {
        setSubmitError(result.message || 'Failed to submit consultation request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      setSubmitError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Schedule a Consultation</h2>
      
      {submitSuccess ? (
        <div className={styles.successMessage}>
          <h3>Thank you for your request!</h3>
          <p>We have received your consultation request. Our team will contact you shortly to confirm the appointment.</p>
          <button 
            className={styles.button} 
            onClick={() => setSubmitSuccess(false)}
          >
            Request Another Consultation
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {submitError && (
            <div className={styles.errorAlert}>
              {submitError}
            </div>
          )}
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                {...register('phone', { required: 'Phone number is required' })}
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="attorney">Preferred Attorney *</label>
              <select
                id="attorney"
                {...register('attorney', { required: 'Please select an attorney' })}
                className={errors.attorney ? styles.inputError : ''}
              >
                <option value="">Select an attorney</option>
                {attorneys.map(attorney => (
                  <option key={attorney} value={attorney}>{attorney}</option>
                ))}
              </select>
              {errors.attorney && <span className={styles.errorText}>{errors.attorney.message}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="selectedDate">Preferred Date *</label>
              <input
                id="selectedDate"
                type="date"
                min={minDate}
                value={selectedDate}
                {...register('selectedDate', { 
                  required: 'Please select a date',
                  onChange: (e) => {
                    handleDateChange(e);
                    // Call RHF's default onChange
                    register('selectedDate').onChange(e);
                  }
                })}
                className={errors.selectedDate ? styles.inputError : ''}
              />
              {errors.selectedDate && <span className={styles.errorText}>{errors.selectedDate.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="selectedTime">Preferred Time *</label>
              <select
                id="selectedTime"
                {...register('selectedTime', { required: 'Please select a time' })}
                className={errors.selectedTime ? styles.inputError : ''}
              >
                <option value="">Select a time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.selectedTime && <span className={styles.errorText}>{errors.selectedTime.message}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              placeholder="Please describe your legal matter and any specific questions you have"
              rows={5}
              {...register('message', { required: 'Please provide details about your case' })}
              className={errors.message ? styles.inputError : ''}
            ></textarea>
            {errors.message && <span className={styles.errorText}>{errors.message.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.checkboxGroup}>
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register('agreeToTerms', { required: 'You must agree to the terms and conditions' })}
              />
              <label htmlFor="agreeToTerms" className={styles.checkboxLabel}>
                I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeToTerms && <span className={styles.errorText}>{errors.agreeToTerms.message}</span>}
          </div>

          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Consultation'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
