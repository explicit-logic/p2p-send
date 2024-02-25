import type { FormikContextType, FormikConfig } from 'formik';
import type { TokensList } from 'marked';

export type Values = Record<string, string | boolean>;

export type Formik = FormikContextType<Values>;

export type ContainerProps = {
  tokensList: TokensList;
};

export type ViewProps = {
  tokensList: TokensList;
  goBack: () => void;
  formik: Formik;
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
