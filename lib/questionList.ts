import fs from 'node:fs/promises';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { questionsDirectory }  = serverRuntimeConfig;

export async function getList() {
  const dirContent = await fs.readdir(questionsDirectory, { withFileTypes: true });
  const files = dirContent
    .filter((file) => file.isFile() && file.name.endsWith('.md'))
    .map((file) => file.name)
    .sort();

  return files;
}

export async function getListNames() {
  const files = await getList();
  return files.map((file) => file.replace(/\.md$/, ''));
}

