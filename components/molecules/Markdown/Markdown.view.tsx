// Modules
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Types
import type { Components } from 'react-markdown';
// import type { InputHTMLAttributes, ReactNode } from 'react';

// Components
import Input from './components/Input';


function MarkdownView({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        input: Input as unknown as Components['input'],
        ul: (props) => {
          console.log(props);
          return <ul className="list-disc list-inside" />;
        }
      }}
    >
      {children}
    </Markdown>
  );
}

export default MarkdownView;
