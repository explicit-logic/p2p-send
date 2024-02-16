import fs from 'node:fs/promises';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { questionsDirectory }  = serverRuntimeConfig;

export async function getList() {
  const dirContent = await fs.readdir(questionsDirectory, { withFileTypes: true });
  const directories = dirContent
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  return directories;
}
