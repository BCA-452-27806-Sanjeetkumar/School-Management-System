/**
 * useFormValidation Hook
 * Manages form field validation states
 */

import { useState, useCallback } from 'react';
import { ValidationError } from '@/lib/validation';

interface FormErrors {
  [key: string]: string | null;
}

interface UseFormValidationResult {
  errors: FormErrors;
  setError: (field: string, message: string | null) => void;
  setErrors: (errors: ValidationError[]) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
  getFieldError: (field: string) => string | null;
  hasErrors: boolean;
}

/**
 * Hook for managing form validation state
 */
export const useFormValidation = (): UseFormValidationResult => {
  const [errors, setFormErrors] = useState<FormErrors>({});

  const setError = useCallback((field: string, message: string | null) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const setErrors = useCallback((validationErrors: ValidationError[]) => {
    const newErrors: FormErrors = {};
    validationErrors.forEach(error => {
      newErrors[error.field] = error.message;
    });
    setFormErrors(newErrors);
  }, []);

  const clearError = useCallback((field: string) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: null,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setFormErrors({});
  }, []);

  const getFieldError = useCallback((field: string): string | null => {
    return errors[field] || null;
  }, [errors]);

  const hasErrors = Object.values(errors).some(error => error !== null);

  return {
    errors,
    setError,
    setErrors,
    clearError,
    clearErrors,
    getFieldError,
    hasErrors,
  };
};
