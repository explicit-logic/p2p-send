'use client';
// Modules
import { useEffect } from 'react';

// Lib
import { setIdentity } from '@/lib/client/identityStorage';
import { setSlugs } from '@/lib/client/slugStorage';

// Components
import IdentityFormView from './IdentityForm.view';

// Constants
// import { FIELDS } from './constants';

// Helpers
import { shuffle } from '@/helpers/shuffle';

// Hooks
import { useParams, useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps, Values } from './IdentityForm.types';

function IdentityFormContainer(props: ContainerProps) {
  const { slugs } = props;

  const { locale } = useParams<{ locale: string }>();

  const router = useRouter();
  // const searchParams = useSearchParams();

  useEffect(() => {
    const finished = sessionStorage.getItem('finished');

    if (finished) {
      router.replace(`/${locale}/result`);
    }
  }, [locale, router]);

  function onSubmit(values: Values) {
    if (!slugs.length) return;

    setIdentity(values);

    // const room = searchParams.get('r');
    const randomSlugs = shuffle(slugs);
    setSlugs(randomSlugs);
    const [slug] = randomSlugs;

    router.replace(`/${locale}/questions/${slug}`);
  }

  return <IdentityFormView onSubmit={onSubmit} />;
}

export default IdentityFormContainer;
