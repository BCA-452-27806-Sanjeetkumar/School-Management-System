/**
 * Form Validation Utilities
 * Provides validation rules and helper functions for form inputs
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const PHONE_REGEX = /^[\d\s\-\+\(\)]{7,}$/;

/**
 * Validates a single email
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validates a password
 */
export const validatePassword = (password: string, minLength = 6): string | null => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  return null;
};

/**
 * Validates a required text field
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validates a name field
 */
export const validateName = (name: string, fieldName = 'Name'): string | null => {
  const error = validateRequired(name, fieldName);
  if (error) return error;
  
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  
  if (name.trim().length > 100) {
    return `${fieldName} must not exceed 100 characters`;
  }
  
  return null;
};

/**
 * Validates a phone number
 */
export const validatePhone = (phone: string, fieldName = 'Phone', optional = false): string | null => {
  if (!phone.trim()) {
    return optional ? null : `${fieldName} is required`;
  }
  
  if (!PHONE_REGEX.test(phone)) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
  
  return null;
};

/**
 * Validates a numeric field
 */
export const validateNumber = (value: string | number, fieldName: string, min?: number, max?: number): string | null => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return `${fieldName} must be a valid number`;
  }
  
  if (min !== undefined && numValue < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (max !== undefined && numValue > max) {
    return `${fieldName} must not exceed ${max}`;
  }
  
  return null;
};

/**
 * Validates a date field
 */
export const validateDate = (date: string, fieldName = 'Date'): string | null => {
  if (!date.trim()) {
    return `${fieldName} is required`;
  }
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
  
  return null;
};

/**
 * Validates a date is not in the past
 */
export const validateFutureDate = (date: string, fieldName = 'Date'): string | null => {
  const error = validateDate(date, fieldName);
  if (error) return error;
  
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj < today) {
    return `${fieldName} cannot be in the past`;
  }
  
  return null;
};

/**
 * Validates a select field
 */
export const validateSelect = (value: string, fieldName: string): string | null => {
  if (!value || value === 'all') {
    return `Please select a ${fieldName.toLowerCase()}`;
  }
  return null;
};

/**
 * Validates a roll number (alphanumeric)
 */
export const validateRollNumber = (rollNumber: string): string | null => {
  if (!rollNumber.trim()) {
    return 'Roll number is required';
  }
  
  if (!/^[0-9a-zA-Z\-]+$/.test(rollNumber)) {
    return 'Roll number can only contain letters, numbers, and hyphens';
  }
  
  if (rollNumber.length > 20) {
    return 'Roll number must not exceed 20 characters';
  }
  
  return null;
};

/**
 * Auth form validation
 */
export const validateAuthForm = (email: string, password: string): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Student form validation
 */
export const validateStudentForm = (
  name: string,
  email: string,
  rollNumber: string,
  classId: string,
  guardianName: string,
  guardianPhone: string
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const nameError = validateName(name, 'Full Name');
  if (nameError) errors.push({ field: 'name', message: nameError });
  
  const emailError = validateEmail(email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const rollError = validateRollNumber(rollNumber);
  if (rollError) errors.push({ field: 'roll_number', message: rollError });
  
  const classError = validateSelect(classId, 'Class');
  if (classError) errors.push({ field: 'class_id', message: classError });
  
  const guardianNameError = validateName(guardianName, 'Guardian Name');
  if (guardianNameError) errors.push({ field: 'guardian_name', message: guardianNameError });
  
  const phoneError = validatePhone(guardianPhone, 'Guardian Phone');
  if (phoneError) errors.push({ field: 'guardian_phone', message: phoneError });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Teacher form validation
 */
export const validateTeacherForm = (
  name: string,
  email: string,
  phone: string,
  subject: string,
  experience: string
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const nameError = validateName(name, 'Full Name');
  if (nameError) errors.push({ field: 'name', message: nameError });
  
  const emailError = validateEmail(email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const phoneError = validatePhone(phone, 'Phone');
  if (phoneError) errors.push({ field: 'phone', message: phoneError });
  
  const subjectError = validateRequired(subject, 'Subject');
  if (subjectError) errors.push({ field: 'subject', message: subjectError });
  
  const experienceError = validateRequired(experience, 'Experience');
  if (experienceError) errors.push({ field: 'experience', message: experienceError });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Class form validation
 */
export const validateClassForm = (
  name: string,
  section: string,
  room: string,
  schedule: string
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const nameError = validateRequired(name, 'Class Name');
  if (nameError) errors.push({ field: 'name', message: nameError });
  
  const sectionError = validateSelect(section, 'Section');
  if (sectionError) errors.push({ field: 'section', message: sectionError });
  
  const roomError = validateRequired(room, 'Room');
  if (roomError) errors.push({ field: 'room', message: roomError });
  
  const scheduleError = validateRequired(schedule, 'Schedule');
  if (scheduleError) errors.push({ field: 'schedule', message: scheduleError });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Fee form validation
 */
export const validateFeeForm = (
  studentId: string,
  amount: string,
  dueDate: string,
  description: string
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  const studentError = validateSelect(studentId, 'Student');
  if (studentError) errors.push({ field: 'student_id', message: studentError });
  
  const amountError = validateNumber(amount, 'Amount', 0.01, 999999);
  if (amountError) errors.push({ field: 'amount', message: amountError });
  
  const dateError = validateFutureDate(dueDate, 'Due Date');
  if (dateError) errors.push({ field: 'due_date', message: dateError });
  
  const descError = validateRequired(description, 'Description');
  if (descError) errors.push({ field: 'description', message: descError });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get error message for a specific field
 */
export const getFieldError = (errors: ValidationError[], field: string): string | null => {
  const error = errors.find(e => e.field === field);
  return error ? error.message : null;
};
