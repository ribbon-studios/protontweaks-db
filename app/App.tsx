import { useState, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { SearchContext } from './context/search';
import { Toaster } from 'sonner';
import { AppFooter } from './components/AppFooter';

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
      <div className="flex flex-1 flex-col p-4 gap-4 w-screen max-w-screen-2xl mx-auto">
        <Outlet />
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'overflow-hidden flex gap-4 items-center bg-black p-4 w-full rounded-md text-white',
              title: 'text-lg',
            },
          }}
        />
      </div>
      <AppFooter />
    </SearchContext.Provider>
  );
};
