export const registerSchema = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 6,
  },
  firstName: {
    required: true,
    minLength: 2,
  },
  lastName: {
    required: true,
    minLength: 2,
  },
};

export const loginSchema = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
  },
};

export const validate = (data, schema) => {
  const errors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} es requerido`;
      continue;
    }

    if (value) {
      if (rules.email && !isValidEmail(value)) {
        errors[field] = `${field} debe ser un email válido`;
      }

      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} debe tener al menos ${rules.minLength} caracteres`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} debe tener máximo ${rules.maxLength} caracteres`;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
