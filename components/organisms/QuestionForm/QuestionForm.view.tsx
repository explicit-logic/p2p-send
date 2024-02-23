// Modules
import { memo } from 'react';
import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
import Markdown from '@/components/molecules/Markdown';

// Constants
// import { FIELDS } from './constants';

// Types
import type { ViewProps, Values } from './QuestionForm.types';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';
import RightArrow from '@/components/atoms/RightArrow';

function QuestionFormView(props: ViewProps) {
  const { goBack, tokensList, onSubmit } = props;

  const initialValues: Values = {
    name: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(/* { dirty, isValid } */) => (
        <Form className="max-w-sm mx-auto">
          <div className="container mb-6">
            <Markdown tokensList={tokensList} />
          </div>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              variant={VARIANTS.alternative}
              onClick={goBack}
            >
                Go Back
            </Button>
            <Button
              type="submit"
              // disabled={!(isValid && dirty)}
              variant={VARIANTS.default}
            >
                Next Question
              <RightArrow className="ml-2 -mr-1 w-5 h-5" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default memo(QuestionFormView);
