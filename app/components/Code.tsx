import type { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

type Props = {
  className?: string;
  children: ReactNode;
  shell?: boolean;
};

export const Code: FC<Props> = ({ className, children, shell = false }) => {
  return (
    <div
      className={cn(
        'whitespace-pre-wrap flex flex-row items-start gap-2 rounded-md bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors cursor-pointer',
        shell && "before:content-['$']",
        className
      )}
      onClick={(e) => window.navigator.clipboard.writeText(e.currentTarget.innerText)}
    >
      {children}
    </div>
  );
};
