import type { FormikConfig } from 'formik';

export type Values = {
  name: string;
  group?: string;
};

export type ContainerProps = {
  slugs: string[];
};

export type ViewProps = {
  onSubmit: FormikConfig<Values>['onSubmit'];
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
