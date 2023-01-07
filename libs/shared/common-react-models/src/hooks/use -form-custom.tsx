import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const useFormCustom = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  schema: AnyObjectSchema,
  fields?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext> => {
  const { ...props } = useForm<TFieldValues, TContext>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    ...fields,
  });

  return {
    ...props,
  };
};
