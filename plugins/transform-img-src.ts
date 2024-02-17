import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import config from '@/config.mjs';

const imgDirInsidePublic = 'images';

type Image = { url: string, type: string };

export default function transformImgSrc({ slug }: { slug: string }) {
  return (tree: Node) => {
    visit(tree, 'paragraph', (node: Node) => {
      const image = (node as unknown as { children: Image[] }).children.find((child) => child.type === 'image');

      if (image) {
        const fileName = (image.url).replace('./', '');
        image.url = `${config.basePath ?? ''}/${imgDirInsidePublic}/${slug}/${fileName}`;
      }
    });
  };
}
