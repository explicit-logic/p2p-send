import fs from 'fs';
import path from 'path';

const fsPromises = fs.promises;
const targetDir = './public/images';
const postsDir = './data/questions';

async function copyImagesToPublic(images, slug) {
  for (const image of images) {
    await fsPromises.copyFile(
      `${postsDir}/${slug}/${image}`,
      `${targetDir}/${slug}/${image}`
    );
  }
}

async function createPostImageFoldersForCopy() {
  // Get every post folder: post-one, post-two etc.
  const postSlugs = await fsPromises.readdir(postsDir);

  for (const slug of postSlugs) {
    const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    // Read all files inside current post folder
    const postDirFiles = await fsPromises.readdir(`${postsDir}/${slug}`);

    // Filter out files with allowed file extension (images)
    const images = postDirFiles.filter(file =>
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
