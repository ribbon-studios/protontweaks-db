import type { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Card: FC<Props> = ({ className, children }) => {
  return <div className={cn('flex flex-col gap-4 rounded-md bg-black/20 p-4', className)}>{children}</div>;
};
