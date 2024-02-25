import type { Tokens as _Tokens, Token as _Token, TokensList as _TokensList } from 'marked';

declare global {
  export import Tokens = _Tokens;

  type Token = _Token;
  type TokensList = _TokensList;
}
