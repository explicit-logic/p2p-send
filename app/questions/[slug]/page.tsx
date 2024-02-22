// Lib
import { getFile, parse } from '@/lib/questionItem';
import { getSlugs } from '@/lib/questionSlugs';

// Components
import QuestionForm from '@/components/molecules/QuestionForm';

export async function generateStaticParams() {
  const slugs = await getSlugs();
  const params = slugs.map((slug) => ({ slug }));

  return params;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const file: { data: Partial<{ title: string }> } = await getFile(slug);
  const { data } = file;
  const { title } = data;

  if (title) {
    return {
      title,
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const file = await getFile(params.slug);
  const { data, content: markdown } = file;
  const tokensList = parse({ markdown, slug: params.slug });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-5">
      <div className="space-y-6">
        <h1 className="font-bold text-3xl text-center tracking-tight leading-none text-gray-900 dark:text-white ">{data.title}</h1>
        <QuestionForm tokensList={tokensList} />
      </div>
    </main>
  );
}
