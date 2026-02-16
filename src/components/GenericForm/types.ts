import type { FormikValues } from 'formik';

export enum GENERIC_FORM_TYPE {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  // Add more as needed, but for now these are enough for our project
}

export enum GENERIC_FORM_INPUT_TYPE {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface GenericFormField {
  name: string;
  label?: string;
  type: GENERIC_FORM_TYPE;
  inputType?: GENERIC_FORM_INPUT_TYPE;
  required?: boolean;
  size?: number; // 1-12 for grid columns
  value?: any;
  placeholder?: string;
  rows?: number;
  validationRules?: ((value: any) => boolean | string)[];
  validationMessages?: string[];
  // Simplified for our needs
}

export interface GenericFormProps<T extends FormikValues> {
  fields: GenericFormField[];
  onSubmit: (values: T) => Promise<void> | void;
  submitButtonText?: string;
  loading?: boolean;
}
