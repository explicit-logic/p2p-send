import fs from 'node:fs/promises';
import path from 'node:path';

import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

import matter from 'gray-matter';

import getConfig from 'next/config';

import transformImgSrc from '../plugins/transform-img-src';

const { serverRuntimeConfig } = getConfig();
const { questionsDirectory }  = serverRuntimeConfig;

export async function getFile(slug: string) {
  const fullPath = path.join(questionsDirectory, slug, `${slug}.md`);
  const str = await fs.readFile(fullPath, 'utf-8');
  const file = matter(str);

  return file;
}

export async function getHtml({ markdown, slug }: { markdown: string, slug: string }): Promise<string> {
  const file = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkGfm) // Enable GitHub Flavored Markdown

    .use(transformImgSrc, { slug }) // Transform image src to use next/image

    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(markdown);

  const html = String(file);

  return html;
}
