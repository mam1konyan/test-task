import { type FormEvent, useEffect, useState } from 'react';

export interface PostFormValues {
  userId: number;
  title: string;
  body: string;
}

interface PostFormProps {
  initialValues: PostFormValues;
  submitLabel: string;
  pending: boolean;
  onSubmit: (values: PostFormValues) => Promise<void>;
}

function PostForm({
  initialValues,
  submitLabel,
  pending,
  onSubmit,
}: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(initialValues);
  const [validationError, setValidationError] = useState<
    string | null
  >(null);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const updateField = (
    field: keyof PostFormValues,
    value: string
  ) => {
    if (field === 'userId') {
      const parsed = Number(value);
      setValues(prev => ({
        ...prev,
        userId: Number.isNaN(parsed) ? 1 : parsed,
      }));
      return;
    }

    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.title.trim() || !values.body.trim()) {
      setValidationError('Title and body are required.');
      return;
    }

    setValidationError(null);
    await onSubmit({
      ...values,
      title: values.title.trim(),
      body: values.body.trim(),
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label htmlFor="userId">User ID</label>
      <input
        id="userId"
        min={1}
        type="number"
        value={values.userId}
        onChange={event => updateField('userId', event.target.value)}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={values.title}
        onChange={event => updateField('title', event.target.value)}
      />

      <label htmlFor="body">Body</label>
      <textarea
        id="body"
        rows={8}
        value={values.body}
        onChange={event => updateField('body', event.target.value)}
      />

      {validationError ? (
        <p className="status error">{validationError}</p>
      ) : null}

      <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
