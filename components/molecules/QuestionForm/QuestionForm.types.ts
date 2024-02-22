import type { FormikConfig } from 'formik';
import type { TokensList } from 'marked';

export type Values = object;

export type ContainerProps = {
  tokensList: TokensList;
};

export type ViewProps = {
  tokensList: TokensList;
  goBack: () => void;
  onSubmit: FormikConfig<Values>['onSubmit'];
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
