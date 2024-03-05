import { type ComponentProps, type FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

type SharedProps = {
  children?: ReactNode;
  className?: string;
};

type LinkProps = SharedProps & {
  to: string;
  target?: ComponentProps<'a'>['target'];
};

type ButtonProps = SharedProps & {
  onClick?: () => void;
};

type Props = LinkProps | ButtonProps;

const isLink = (props: Props): props is LinkProps => {
  return Object.hasOwn(props, 'to');
};

export const Button: FC<Props> = (props) => {
  if (isLink(props)) {
    if (props.to.startsWith('#')) {
      return (
        <button
          {...props}
          onClick={() => {
            const id = props.to.replace('#', '');

            const element = document.getElementById(id);

            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              console.warn(`Unknown ID: "${id}"`);
            }
          }}
          className={cn(
            'flex gap-2 items-center justify-center min-w-14 min-h-14 bg-white/10 hover:bg-transparent hover:border-white/10 border border-transparent px-3 rounded-md transition-all',
            props.className
          )}
        />
      );
    }

    return (
      <Link
        {...props}
        target={props.to.startsWith('http') ? '_blank' : undefined}
        className={cn(
          'flex gap-2 items-center justify-center min-w-14 min-h-14 bg-white/10 hover:bg-transparent hover:border-white/10 border border-transparent px-3 rounded-md transition-all',
          props.className
        )}
      />
    );
  }

  return (
    <button
      {...props}
      className={cn(
        'flex gap-2 items-center justify-center min-w-14 min-h-14 bg-white/10 hover:bg-transparent hover:border-white/10 border border-transparent px-3 rounded-md transition-all',
        props.className
      )}
    />
  );
};
