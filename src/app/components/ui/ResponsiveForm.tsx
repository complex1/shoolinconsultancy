interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormField = ({
  label,
  children,
  error,
  required = false,
  className = ''
}: FormFieldProps) => (
  <div className={`space-y-1 ${className}`}>
    <label className="block text-sm font-medium text-neutral-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

interface ResponsiveFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  columns?: 1 | 2 | 3;
}

const ResponsiveForm = ({
  children,
  onSubmit,
  className = '',
  columns = 1
}: ResponsiveFormProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`grid ${gridCols[columns]} gap-4 md:gap-6 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({
  title,
  description,
  children,
  className = ''
}: FormSectionProps) => (
  <div className={`space-y-4 ${className}`}>
    {(title || description) && (
      <div className="space-y-1">
        {title && (
          <h3 className="text-lg font-medium leading-6 text-neutral-900">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>
    )}
    <div className="space-y-4">{children}</div>
  </div>
);

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const FormActions = ({
  children,
  className = '',
  align = 'left'
}: FormActionsProps) => {
  const alignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${alignment[align]} ${className}`}
    >
      {children}
    </div>
  );
};

export { ResponsiveForm, FormField, FormSection, FormActions }; 