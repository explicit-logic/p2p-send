import type { FormikConfig } from 'formik';

export type Values = Record<string, string>;

export type ContainerProps = {
  markdown: string;
};

export type ViewProps = {
  markdown: string;
  goBack: () => void;
  onSubmit: FormikConfig<Values>['onSubmit'];
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
