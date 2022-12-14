import { Grid } from '@chakra-ui/react';
import { BaseSyntheticEvent, createContext, FC } from 'react';
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export interface CustomFormProps {
  // handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<any>;
  errors: Record<keyof FieldValues, FieldValues>;
  control?: Control<any>;
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
  dataCy?: string;
  children: React.ReactNode;
}

interface CustomFormContextType {
  errors: any;
  register: UseFormRegister<any>;
  control?: Control<FieldValues, any>;
  getValues?: UseFormGetValues<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
}

export const CustomFormContext = createContext<CustomFormContextType>(null!);

export const CustomForm: FC<CustomFormProps> = ({
  // handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  getValues,
  setValue,
  children,
  dataCy,
}) => {
  const value = {
    register,
    errors,
    onSubmit,
    control,
    getValues,
    setValue,
  };
  return (
    <CustomFormContext.Provider value={value}>
      <Grid data-cy={dataCy} as="form" onSubmit={onSubmit} gap="2">
        {children}
      </Grid>
    </CustomFormContext.Provider>
  );
};
