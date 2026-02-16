import type { FormikProps, FormikValues } from 'formik';
import {
  GENERIC_FORM_TYPE,
  type GenericFormField,
} from '$/components/GenericForm/types';

interface GenericFormItemProps<T extends FormikValues> {
  field: GenericFormField;
  formik: FormikProps<T>;
  disabled?: boolean;
}

export const GenericFormItem = <T extends FormikValues>({
  field,
  formik,
  disabled,
}: GenericFormItemProps<T>) => {
  const { name, type, inputType, placeholder, rows = 4 } = field;
  const { values, handleChange, handleBlur, touched, errors } =
    formik;
  const hasError = touched[name] && !!errors[name];

  const baseClassName =
    'w-full rounded-lg border p-2 text-base focus:outline-none focus:ring-2 disabled:opacity-70 transition-colors';
  const stateClassName = hasError
    ? 'border-red-500 focus:ring-red-200'
    : 'border-slate-300 focus:ring-blue-500';

  const className = `${baseClassName} ${stateClassName}`;

  if (type === GENERIC_FORM_TYPE.TEXTAREA) {
    return (
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={className}
      />
    );
  }

  return (
    <input
      id={name}
      name={name}
      type={inputType}
      placeholder={placeholder}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      className={className}
    />
  );
};
