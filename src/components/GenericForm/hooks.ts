import * as Yup from 'yup';
import type { GenericFormField } from '$/components/GenericForm/types';

export const useGenericFormValidation = ({
  fields,
}: {
  fields: GenericFormField[];
}) => {
  const schemaFields: Record<string, any> = {};

  fields.forEach(field => {
    let validator: any;

    if (field.inputType === 'number') {
      validator = Yup.number();
    } else {
      validator = Yup.string();
    }

    if (field.required) {
      validator = validator.required('Required');
    }

    // You could add custom validation rules here if needed from field.validationRules
    // But for this project simple Yup validation is enough.

    schemaFields[field.name] = validator;
  });

  return {
    validationSchema: Yup.object().shape(schemaFields),
  };
};

export const useGenericFormInitialValues = ({
  fields,
}: {
  fields: GenericFormField[];
}) => {
  const initialValues: Record<string, any> = {};

  fields.forEach(field => {
    initialValues[field.name] =
      field.value !== undefined ? field.value : '';
  });

  return initialValues;
};
