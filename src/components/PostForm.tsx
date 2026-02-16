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
    <form className="grid gap-2.5" onSubmit={handleSubmit}>
      <label htmlFor="userId">User ID</label>
      <input
        id="userId"
        min={1}
        type="number"
        value={values.userId}
        onChange={event => updateField('userId', event.target.value)}
        className="w-full rounded-lg border border-slate-300 p-2 text-base"
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={values.title}
        onChange={event => updateField('title', event.target.value)}
        className="w-full rounded-lg border border-slate-300 p-2 text-base"
      />

      <label htmlFor="body">Body</label>
      <textarea
        id="body"
        rows={8}
        value={values.body}
        onChange={event => updateField('body', event.target.value)}
        className="w-full rounded-lg border border-slate-300 p-2 text-base"
      />

      {validationError ? (
        <p className="my-2 text-red-600">{validationError}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-700 px-[0.9rem] py-2 text-[0.95rem] text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
