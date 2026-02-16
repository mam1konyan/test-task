import { useMemo } from 'react';
import {
  GENERIC_FORM_INPUT_TYPE,
  GENERIC_FORM_TYPE,
  type GenericFormField,
} from '$/components/GenericForm/types';
import type { Post } from '$/types/post';

export interface PostFormValues {
  userId: number;
  title: string;
  body: string;
}

interface UsePostsFormFieldsProps {
  post: Post | null;
}

export const usePostsFormFields = ({
  post,
}: UsePostsFormFieldsProps) => {
  const initialValues = useMemo<PostFormValues>(
    () =>
      post
        ? {
            userId: post.userId,
            title: post.title,
            body: post.body,
          }
        : {
            userId: 1,
            title: '',
            body: '',
          },
    [post]
  );

  const fields = useMemo<GenericFormField[]>(
    () => [
      {
        name: 'userId',
        label: 'User ID',
        type: GENERIC_FORM_TYPE.INPUT,
        inputType: GENERIC_FORM_INPUT_TYPE.NUMBER,
        required: true,
        value: initialValues.userId,
      },
      {
        name: 'title',
        label: 'Title',
        type: GENERIC_FORM_TYPE.INPUT,
        inputType: GENERIC_FORM_INPUT_TYPE.TEXT,
        required: true,
        value: initialValues.title,
      },
      {
        name: 'body',
        label: 'Body',
        type: GENERIC_FORM_TYPE.TEXTAREA,
        required: true,
        value: initialValues.body,
        rows: 8,
      },
    ],
    [initialValues]
  );

  return { fields, initialValues };
};
