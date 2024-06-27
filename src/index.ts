import { generateAppsListFile, getAppsList, getApps, APPS_DIR } from './utils/apps';
import { generateSchema } from './utils/schema';
import { migrate } from './migrations';
import { mkdir, cp } from 'fs/promises';
import { join, basename } from 'path';
import { generateInfoFile, getInfo } from './utils/info';

const DIST_DIR = join(import.meta.dirname, '../dist');

async function generate() {
  const apps = await getApps();
  const list = await getAppsList(apps);
  const info = getInfo();

  await Promise.all([
    migrate({
      list,
      apps,
      info,
    }),
    generateSchema(),
    generateAppsListFile(list),
    generateInfoFile(info),
  ]);

  await mkdir(DIST_DIR, {
    recursive: true,
  });

  await cp(APPS_DIR, DIST_DIR, {
    recursive: true,
    filter: (source) => {
      const name = basename(source);
      return !name.startsWith('.') && name !== 'schema.json';
    },
  });
}

generate();
