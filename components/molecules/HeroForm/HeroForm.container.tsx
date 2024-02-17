'use client';
// Lib
import { setSlugs } from '@/lib/slugStorage';

// Components
import HeroFormView from './HeroForm.view';

// Constants
// import { FIELDS } from './constants';

// Helpers
import { shuffle } from '@/helpers/shuffle';

// Hooks
import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps } from './HeroForm.types';

function HeroFormContainer(props: ContainerProps) {
  const { slugs } = props;

  const router = useRouter();
  // const searchParams = useSearchParams();

  function onSubmit(/* values: Values */) {
    if (!slugs.length) return;

    // const room = searchParams.get('r');
    const randomSlugs = shuffle(slugs);
    setSlugs(randomSlugs);
    const [slug] = randomSlugs;

    router.replace(`/questions/${slug}`);
  }

  return <HeroFormView onSubmit={onSubmit} />;
}

export default HeroFormContainer;
