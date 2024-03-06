import type { FC, ReactNode } from 'react';

type Props = {
  label: string;
  children?: ReactNode;
};

export const Label: FC<Props> = ({ label, children }) => {
  return (
    <div className="flex gap-4 items-start justify-between">
      <div className="bg-white/20 p-2 rounded-md mr-auto">{label}</div>
      <div className="flex flex-wrap gap-4 items-center justify-end h-full">{children}</div>
    </div>
  );
};
