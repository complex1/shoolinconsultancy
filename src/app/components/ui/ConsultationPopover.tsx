'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faUser,
  faCheck,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar-overrides.css';

interface Attorney {
  id?: number;
  name: string;
  title: string;
  role: string;
  specialization: string;
  image?: string;
}

interface ConsultationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  attorney?: Attorney;
}

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const ConsultationPopover: React.FC<ConsultationPopoverProps> = ({ isOpen, onClose, attorney }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      return;
    }
    const formattedData = {
      ...formData,
      selectedDate: selectedDate.toISOString(),
      selectedTime,
      attorney: attorney?.name || ''
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
      setCurrentStep(3);
    }
    else {
      console.error('Error scheduling consultation:', result.message);
    }
    // setCurrentStep(3);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      agreeToTerms: false
    });
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetForm();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when popover is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      agreeToTerms: false
    });
    setCurrentStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
          />

          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-6 relative min-h-full">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                aria-label="Close popover"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>

              <div className="space-y-6 pb-20">
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentStep === 3 ? 'Consultation Scheduled!' : 'Schedule a Consultation'}
                    {attorney && currentStep !== 3 && (
                      <span className="block text-lg font-medium text-gray-600 mt-1">
                        with {attorney.name}
                      </span>
                    )}
                  </h2>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Select a Date
                        </h3>
                        <div className="text-sm text-gray-500">
                          * Weekend dates are unavailable
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <Calendar
                          onChange={(value) => {
                            if (value instanceof Date) {
                              setSelectedDate(value);
                              setSelectedTime(null);
                            }
                          }}
                          value={selectedDate}
                          minDate={new Date()}
                          tileClassName={({ date }) => {
                            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                            return isWeekend ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900';
                          }}
                          tileDisabled={({ date }) => {
                            return date.getDay() === 0 || date.getDay() === 6;
                          }}
                          navigationLabel={({ date }) =>
                            date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                          }
                          prevLabel={<FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />}
                          nextLabel={<FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />}
                          view="month"
                        />
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Select a Time
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {TIME_SLOTS.map(time => (
                            <button
                              key={time}
                              onClick={() => {
                                setSelectedTime(time);
                                setCurrentStep(2);
                              }}
                              className="p-3 text-center rounded-lg border border-gray-200 text-gray-900 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Selected Date & Time</div>
                        <div className="text-gray-900 font-medium">
                          {selectedDate && formatDate(selectedDate)} at {selectedTime}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Change
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                          Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                          I agree to the terms and conditions
                        </label>
                      </div>
                    </div>

                    <div className="fixed bottom-0 right-0 w-full md:w-[500px] p-4 bg-white border-t">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Schedule Consultation
                      </button>
                    </div>
                  </form>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <FontAwesomeIcon icon={faCheck} className="w-8 h-8 text-green-600" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-gray-900">
                          Thank you for scheduling a consultation{attorney ? ` with ${attorney.name}` : ''}.
                        </p>
                        <p className="text-gray-600">
                          We've sent a confirmation email to {formData.email}.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Appointment Details
                      </h3>
                      <div className="grid gap-2">
                        <p className="text-gray-600">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                          {selectedDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-600">
                          <FontAwesomeIcon icon={faClock} className="mr-2" />
                          {selectedTime}
                        </p>
                        {attorney && (
                          <p className="text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            {attorney.name} - {attorney.specialization}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="fixed bottom-0 right-0 w-full md:w-[500px] p-4 bg-white border-t">
                      <button
                        onClick={resetForm}
                        className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationPopover;
