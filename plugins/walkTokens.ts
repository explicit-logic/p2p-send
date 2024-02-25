import config from '@/config.mjs';
import type { Tokens, TokensList } from 'marked';

export function walkTokens({ slug, tokens }: { slug: string, tokens: TokensList }) {
  function walk(_tokens: TokensList = tokens) {
    for (let i = 0; i < _tokens.length; i++) {
      const token = _tokens[i];
      if (token.type === 'image') {
        transformImgSrc(token as Tokens.Image);
      }

      if ('tokens' in token) {
        if (token.type === 'paragraph' && token.tokens?.length === 1 && token.tokens[0].type === 'image') {
          _tokens[i] = transformImgSrc(token.tokens[0] as Tokens.Image);
        } else {
          walk(<TokensList>token.tokens);
        }
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
