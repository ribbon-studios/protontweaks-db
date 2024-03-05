import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Pill: FC<Props> = ({ children }) => {
  return <div className="rounded-full bg-white/20 px-3 min-h-10 items-center inline-flex">{children}</div>;
};
