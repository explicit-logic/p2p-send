import fs from 'node:fs/promises';
import path from 'node:path';
import { Marked } from 'marked';
import matter from 'gray-matter';

import getConfig from 'next/config';

import type { TokensList } from 'marked';

import { extractQuestions } from './extractQuestions';
import { walkTokens } from './walkTokens';

const { serverRuntimeConfig } = getConfig();
const { questionsDirectory }  = serverRuntimeConfig;

export async function getFile(slug: string) {
  const fullPath = path.join(questionsDirectory, slug, `${slug}.md`);
  const str = await fs.readFile(fullPath, 'utf-8');
  const file = matter(str);

  return file;
}

export function parse({ markdown, slug }: { markdown: string, slug: string }): { questions: QuestionsList, tokens: TokensList } {
  const marked = new Marked();

  const tokens = marked.lexer(markdown, {
    breaks: false,
    gfm: true,
  });

  walkTokens({ slug, tokens });
  const questions = extractQuestions(tokens);

  return { questions, tokens };
}
