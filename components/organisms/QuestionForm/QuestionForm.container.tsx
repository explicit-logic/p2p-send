'use client';
// Lib
import { getNextSlug, getPreviousSlug } from '@/lib/slugStorage';

// Components
import QuestionFormView from './QuestionForm.view';

// Constants
// import { FIELDS } from './constants';

// Hooks
import { useRouter, useParams } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps } from './QuestionForm.types';

function QuestionFormContainer(props: ContainerProps) {
  const { tokensList } = props;

  const { slug } = useParams<{ slug: string }>();

  const router = useRouter();

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

  return <QuestionFormView goBack={goBack} tokensList={tokensList} onSubmit={onSubmit} />;
}

export default QuestionFormContainer;
