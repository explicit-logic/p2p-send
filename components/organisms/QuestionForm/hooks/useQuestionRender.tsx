/* eslint-disable @next/next/no-img-element */
// Modules
import { useCallback } from 'react';

// Components
import QuestionImage from '../components/QuestionImage';
import QuestionCheckList from '../components/QuestionCheckList';
import QuestionRadioList from '../components/QuestionRadioList';

// Lib
import { process } from '@/lib/client/markdownRender';

// Types
import type { Formik } from '../QuestionForm.types';
import type { RenderHandler } from '@/lib/client/markdownRender/markdownRender.types';
import type { TokensList } from 'marked';


export function useQuestionRender(formik: Formik, tokensList: TokensList) {
  const render: RenderHandler = useCallback(({ getId, parse }) => ({
    image: (token) => <QuestionImage key={getId()} token={token} />,
    list: (token) => {
      const { ordered } = token;
      if (ordered) {
        return <QuestionRadioList key={getId()} formik={formik} parse={parse} token={token} />;
      }

      return <QuestionCheckList key={getId()} formik={formik} parse={parse} token={token} />;
    },
  }), [formik]);

  return process(tokensList, render);
}
