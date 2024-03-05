import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Code2 } from 'lucide-react';
import { Button } from './Button';

export const AppFooter: FC = () => {
  return (
    <div className="flex gap-4 px-4 py-3 bg-zinc-900 items-center">
      <div className="flex flex-col gap-2 flex-1 text-white/70">
        <div>
          Built with ❤️ by the{' '}
          <Link className="underline" to="https://github.com/rain-cafe" target="_blank">
            Rainbow Cafe
          </Link>{' '}
          Team~
        </div>
        <div>
          This site uses data from Steam as well as data provided by{' '}
          <Link className="underline" to="https://steamdb.info" target="_blank">
            SteamDB
          </Link>{' '}
          via{' '}
          <Link
            className="underline"
            to="https://www.algolia.com/?utm_source=steamdb_search&utm_medium=link&utm_term=logo&utm_campaign=steamdb"
            target="_blank"
          >
            Algolia
          </Link>
          .
        </div>
        <div>
          This site has no affiliation with Valve Software. This site uses data from All game images and logos are
          property of their respective owners.
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button to="https://github.com/rain-cafe/protontweaks-db/issues">
          <Bug />
        </Button>
        <Button to="https://github.com/rain-cafe/protontweaks-db">
          <Code2 />
        </Button>
      </div>
    </div>
  );
};
