import { type FC } from 'react';
import { useSearch } from '../context/search';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

type Props = {
  onChange?: (value: string) => void;
};

export const AppHeader: FC<Props> = ({ onChange }) => {
  const search = useSearch();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-3 bg-zinc-900 sticky top-0 z-50">
      <Link to="/" className="text-2xl text-center hover:text-pink-300 transition-colors">
        Protontweaks DB
      </Link>
      <input
        type="text"
        className="flex-1 bg-white/10 rounded-md min-h-12 px-3 text-lg"
        value={search}
        placeholder="Search"
        onChange={(e) => onChange?.(e.target.value)}
      />
      <Link
        className="flex items-center min-h-12 bg-white/10 hover:bg-transparent hover:border-white/10 border border-transparent px-3 rounded-md transition-all"
        to="https://github.com/rain-cafe/protontweaks-db"
        target="_blank"
      >
        <Code2 />
      </Link>
    </div>
  );
};
