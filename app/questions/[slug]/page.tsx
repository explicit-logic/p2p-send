import { getFile, getHtml } from '@/lib/questionItem';
import { getListNames } from '@/lib/questionList';

export async function generateStaticParams() {
  const slugs = await getListNames();
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
  const { data, content } = file;
  const html = await getHtml(content);

  return (
    <div className="container mx-auto py-5">
      {/* <div className="flex justify-center">
        <h1 className="text-4xl font-bold">{data.title}</h1>
      </div> */}
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
