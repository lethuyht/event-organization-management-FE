export const formConfig = {
  validateMessages: {
    required: 'Please enter ${label}!',
    whitespace: ' ${label} cannot be empty!',
    string: {
      min: '${label} must be minimum ${min} characters.',
      max: '${label} must be maximum ${max} characters.',
    },
    types: {
      number: '${label} must be number.',
    },
    pattern: {
      mismatch: '${label} is not valid!',
    },
  },
  requiredMark: true,
};
