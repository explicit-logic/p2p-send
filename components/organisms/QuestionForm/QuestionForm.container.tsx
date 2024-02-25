'use client';

import { useFormik } from 'formik';

// Lib
import { getNextSlug, getPreviousSlug } from '@/lib/client/slugStorage';

// Components
import QuestionFormView from './QuestionForm.view';

// Constants
// import { FIELDS } from './constants';

// Helpers
import { getValidationSchema } from './helpers/getValidationSchema';

// Hooks
import { useRouter, useParams } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps } from './QuestionForm.types';

function QuestionFormContainer(props: ContainerProps) {
  const { tokensList } = props;

  const { slug } = useParams<{ slug: string }>();

  const router = useRouter();

  const validationSchema = getValidationSchema(/* tokensList */);

  const formik = useFormik({
    initialValues: {},
    onSubmit,
    validationSchema,
  });

  function goBack() {
    const previousSlug = getPreviousSlug(slug);

    if (!previousSlug) return;

    router.replace(`/questions/${previousSlug}`);
  }

  function onSubmit(/* values: Values */) {
    // const room = searchParams.get('r');

    const nextSlug = getNextSlug(slug);

    if (!nextSlug) return;

    router.replace(`/questions/${nextSlug}`);
  }

  return <QuestionFormView formik={formik} goBack={goBack} tokensList={tokensList} />;
}

export default QuestionFormContainer;
