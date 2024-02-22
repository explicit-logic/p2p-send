import config from '@/config.mjs';
import type { Tokens, TokensList } from 'marked';

export function walkTokens({ slug, tokens }: { slug: string, tokens: TokensList }) {
  function walk(_tokens: TokensList = tokens) {
    for (const token of _tokens) {
      if ('tokens' in token) {
        return walk(<TokensList>token.tokens);
      }
      if (token.type === 'image') {
        transformImgSrc(token as Tokens.Image);
      }
    }
  }

  function transformImgSrc(token: Tokens.Image) {
    if (token.href.startsWith('./')) {
      const fileName = (token.href ?? '').replace('./', '');
      token.href = `${config.basePath ?? ''}/images/${slug}/${fileName}`;
    }

    return token;
  }

  walk();
}
