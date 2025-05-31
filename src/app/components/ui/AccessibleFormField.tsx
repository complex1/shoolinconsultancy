import { colors } from '@/app/styles/colors';
import { ReactNode } from 'react';

interface AccessibleFormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  helpText?: string;
}

const AccessibleFormField = ({
  id,
  label,
  error,
  required = false,
  className = '',
  children,
  helpText,
}: AccessibleFormFieldProps) => {
  const errorId = `${id}-error`;
  const helpTextId = `${id}-help`;
  
  return (
    <div className={`space-y-2 ${className}`} role="group">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
        style={{ color: colors.neutral[900] }}
      >
        <span>{label}</span>
        {required && (
          <span 
            className="ml-1"
            style={{ color: colors.error.main }}
            aria-label="required"
          >
            *
          </span>
        )}
      </label>
      
      <div>
        {children}
        
        {helpText && (
          <p
            id={helpTextId}
            className="mt-1 text-sm"
            style={{ color: colors.neutral[600] }}
          >
            {helpText}
          </p>
        )}
        
        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm"
            style={{ color: colors.error.main }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccessibleFormField; 