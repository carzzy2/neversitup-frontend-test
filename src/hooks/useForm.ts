
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormValidation<T> {
  [key: string]: (value: string) => string;
}

interface UseFormReturn<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: string) => void;
  setIsSubmitting: (value: boolean) => void;
}

// Hook to manage form state and validation
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: FormValidation<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!validate || !validate[name]) return '';
    return validate[name](value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const setFieldValue = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field as string, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    if (!validate) return true;
    
    const newErrors: { [K in keyof T]?: string } = {};
    let isValid = true;
    
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (onSubmit: (values: T) => Promise<void> | void) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setIsSubmitting,
  };
}
