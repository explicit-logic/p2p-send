import { useId, useState } from 'react';

type InputProps =  { node: HTMLInputElement } & JSX.IntrinsicElements['input'];

export default function Input(props: InputProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, checked: defaultChecked, ...rest } = props;
  const id = useId();
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <input
      {...rest}
      id={id}
      name={id}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      disabled={false}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
}
