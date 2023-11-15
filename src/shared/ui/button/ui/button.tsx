import { PropsWithChildren } from 'react';
import cn from 'classnames';

type ButtonProps = {
  cb: () => void,
  type: 'text' | 'icon',
}

export const Button = ({ cb, type, children }: PropsWithChildren<ButtonProps>): JSX.Element => {
  return (
    <button
      onClick={cb}
      className={cn(
        'bg-violet-600 text-white rounded',
        (type === 'text' && 'px-4 py-2'),
        (type === 'icon' && 'p-1.5')
      )}
    >
      {children}
    </button>
  )
}
