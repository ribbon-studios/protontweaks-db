import { useState, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { SearchContext } from './context/search';

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
      <div className="flex flex-col p-4 gap-4 w-screen max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
};
