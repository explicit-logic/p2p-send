// Components
import HeroForm from '@/components/organisms/HeroForm';
import TopBar from '@/components/molecules/TopBar';
// import Link from 'next/link';

// Lib
import { getSlugs } from '@/lib/server/questionSlugs';

export default async function Home() {
  const slugs = await getSlugs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <TopBar />
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Simple Quiz</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Take this quiz to test your knowledge</p>
          <HeroForm slugs={slugs}/>
        </div>
      </section>
    </main>
  );
}
