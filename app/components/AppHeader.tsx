import { useEffect, type FC, useState } from 'react';
import { useSearch } from '../context/search';
import { Link, useParams } from 'react-router-dom';
import { ArrowUp, Edit } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

type Props = {
  onChange?: (value: string) => void;
};

export const AppHeader: FC<Props> = ({ onChange }) => {
  const search = useSearch();
  const [sticky, setSticky] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const listener = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', listener, { passive: true });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <>
      <div
        className={cn(
          'fixed inset-x-0 top-0 from-black from-30% to-transparent bg-gradient-to-b h-64 z-50 opacity-0 transition-opacity pointer-events-none',
          sticky && 'opacity-100'
        )}
      ></div>
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center gap-4 px-3 sm:px-8 py-3 bg-zinc-900 sticky top-0 z-50 transition-all',
          sticky && 'sm:mx-5 sm:top-5 sm:rounded-full'
        )}
      >
        <Link to="/" className="text-2xl text-center hover:text-pink-300 transition-colors">
          Protontweaks DB
        </Link>
        <div className="flex flex-1 gap-4">
          <input
            type="text"
            className="flex-1 bg-white/10 rounded-md min-h-12 px-3 text-xl"
            value={search}
            placeholder="Search"
            onChange={(e) => onChange?.(e.target.value)}
          />
          <Button
            to={
              id
                ? `https://github.com/rain-cafe/protontweaks-db/edit/main/tweaks/${id}.json`
                : 'https://github.com/rain-cafe/protontweaks-db/tree/main/tweaks'
            }
          >
            <Edit />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'fixed top-20 opacity-0 pointer-events-none left-1/2 -translate-x-1/2 z-50 flex flex-col gap-4 items-center transition-all',
          sticky && 'top-28 opacity-100 pointer-events-auto'
        )}
      >
        <Button className="rounded-full px-4 bg-white/80 text-black hover:bg-white" to="#root">
          Back to the Top!
          <ArrowUp />
        </Button>
      </div>
    </>
  );
};
