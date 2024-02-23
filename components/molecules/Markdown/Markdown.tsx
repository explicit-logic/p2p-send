import { process } from './parser';

// Types
import type { Props, Renderers, RenderersOptions } from './Markdown.types';

const renderers = ({ getId, parse }: RenderersOptions): Partial<Renderers> => {
  return {
    paragraph: (token) => {
      const id = getId();
      return <a key={id} id={id} href="#">{parse(token.tokens)}</a>;
    }
  };
};

export default function Markdown(props: Props) {
  const { tokensList } = props;

  if (!tokensList) return;

  return process(tokensList, renderers);
}
