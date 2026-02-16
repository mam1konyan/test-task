import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikValues,
} from 'formik';
import { GenericFormItem } from '$/components/GenericForm/GenericFormItem';
import {
  useGenericFormInitialValues,
  useGenericFormValidation,
} from '$/components/GenericForm/hooks';
import type { GenericFormProps } from '$/components/GenericForm/types';

export const GenericForm = <T extends FormikValues>({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  loading = false,
}: GenericFormProps<T>) => {
  const { validationSchema } = useGenericFormValidation({ fields });
  const formInitialValues = useGenericFormInitialValues({
    fields,
  }) as T;

  return (
    <Formik<T>
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {formik => {
        const { handleSubmit, isSubmitting, dirty, isValid } = formik;

        return (
          <Form onSubmit={handleSubmit} className="grid gap-4 w-full">
            <div className="grid gap-y-4">
              {fields.map(field => {
                const { name, label, required, size = 12 } = field;

                // Simple grid-based width
                const style = {
                  gridColumn: size === 12 ? '1 / -1' : `span ${size}`,
                };

                return (
                  <div
                    key={name}
                    style={style}
                    className="flex flex-col gap-1"
                  >
                    {label && (
                      <label
                        htmlFor={name}
                        className="text-sm font-medium text-slate-300"
                      >
                        {label}
                        {required && (
                          <span className="ml-1 text-red-400">*</span>
                        )}
                      </label>
                    )}
                    <div className="relative pb-5">
                      <Field name={name}>
                        {() => (
                          <GenericFormItem<T>
                            field={field}
                            formik={formik}
                            disabled={isSubmitting || loading}
                          />
                        )}
                      </Field>
                      <ErrorMessage name={name}>
                        {msg => (
                          <div className="absolute bottom-0 left-0 text-xs font-medium text-red-400">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={
                  !dirty || !isValid || isSubmitting || loading
                }
                className="w-full rounded-xl bg-blue-600 px-6 py-3 text-[0.95rem] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading || isSubmitting
                  ? 'Processing...'
                  : submitButtonText}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
