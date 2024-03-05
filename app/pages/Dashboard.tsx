import { type FC, useMemo, useEffect } from 'react';
import { fetch } from '../utils/fetch';
import type { Tweaks } from '@/api/types';
import { useLoaderData } from '@rain-cafe/react-utils/react-router';
import { useSearch } from '../context/search';
import { AppImage } from '../components/AppImage';

export async function loader() {
  return {
    tweaks: await fetch<Tweaks>('/api/tweaks.json'),
  };
}

export const Component: FC = () => {
  const { tweaks } = useLoaderData<typeof loader>();
  const search = useSearch();
  const filteredTweaks = useMemo(() => {
    return tweaks.tweaks.filter((tweak) => tweak.name.toLowerCase().includes(search.toLowerCase()));
  }, [tweaks, search]);

  useEffect(() => {
    const listener = () => {};
    window.addEventListener('scroll', listener, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mx-auto">
      {filteredTweaks?.map((tweak) => (
        <AppImage key={tweak.id} id={tweak.id} to={`/tweaks/${tweak.id}`} />
      ))}
    </div>
  );
};
