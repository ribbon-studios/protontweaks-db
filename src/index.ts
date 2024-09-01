import { getAppsList, getApps } from './utils/apps';
import { generateSchema } from './utils/schema';
import { migrate } from './migrations';
import { mkdir } from 'fs/promises';
import { getInfo } from './utils/info';
import { DIRECTORIES } from './constants';

async function generate() {
  const apps = await getApps();
  const list = await getAppsList(apps);
  const info = getInfo();

  await mkdir(DIRECTORIES.DIST, {
    recursive: true,
  });

  await Promise.all([
    migrate({
      list,
      apps,
      info,
    }),
    generateSchema(),
  ]);
}

generate();
