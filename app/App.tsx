import { useState, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { SearchContext } from './context/search';
import { Toaster } from 'sonner';

export const Component: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={search}>
      <AppHeader
        onChange={(value) => {
          navigate('/');
          setSearch(value);
        }}
      />
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'flex gap-4 items-center bg-black/20 p-4 w-full rounded-md text-white',
            title: 'text-lg',
          },
        }}
      />
      <div className="flex flex-col p-4 gap-4 w-screen max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
};
