import fs from 'fs';
import path from 'path';

import config from '../next.config.mjs';

const { serverRuntimeConfig } = config ?? {};
const { questionsDirectory }  = serverRuntimeConfig;

const fsPromises = fs.promises;
const targetDir = './public/images';

async function copyImagesToPublic(images, slug) {
  for (const image of images) {
    await fsPromises.copyFile(
      `${questionsDirectory}/${slug}/${image}`,
      `${targetDir}/${slug}/${image}`
    );
  }
}

async function createPostImageFoldersForCopy() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!fs.existsSync(questionsDirectory)) return;
  // Get every post folder: post-one, post-two etc.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const questionSlugs = await fsPromises.readdir(questionsDirectory);

  for (const slug of questionSlugs) {
    const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    // Read all files inside current question folder
    const questionDirFiles = await fsPromises.readdir(`${questionsDirectory}/${slug}`);

    // Filter out files with allowed file extension (images)
    const images = questionDirFiles.filter(file =>
      allowedImageFileExtensions.includes(path.extname(file)),
    );

    if (images.length) {
      // Create a folder for images of this post inside public
      await fsPromises.mkdir(`${targetDir}/${slug}`);

      await copyImagesToPublic(images, slug);
    }
  }
}

if (fs.existsSync(targetDir)) {
  await fsPromises.rm(targetDir, { recursive: true });
}
await fsPromises.mkdir(targetDir);
await createPostImageFoldersForCopy();
