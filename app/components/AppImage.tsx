import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

type Props = {
  className?: string;
  id: string;
  to?: string;
};

export const AppImage: FC<Props> = ({ className, id, to }) => {
  return to ? (
    <Link
      className={cn(
        'relative rounded-md hover:after:opacity-100 after:content-[""] after:pointer-events-none after:opacity-0 after:inset-0 after:absolute after:bg-black/20 after:transition-opacity',
        className
      )}
      to={to}
    >
      <img className="rounded-md" src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`} />
    </Link>
  ) : (
    <img className={cn('rounded-md', className)} src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`} />
  );
};
