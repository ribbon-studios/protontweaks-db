import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import type { AppsList, App, V1, V2, V3, V4 } from '../types';
import { APPS_DIR } from '../utils/apps';
import * as v1 from './v1';
import * as v2 from './v2';
import * as v3 from './v3';
import * as v4 from './v4';

export type Migrations = {
  v1: Migration<V1.Tweaks, V1.Tweak>;
  v2: Migration<V2.Tweaks, V2.Tweak>;
  v3: Migration<V3.AppsList, V3.App>;
  v4: Migration<V4.AppsList, V4.App>;
};

export type Migration<L, T> = {
  list: L;
  apps: T[];
};

export async function migrate(initial: Migration<AppsList, App>) {
  const v4Apps = await v4.migrate(initial);
  const v3Apps = await v3.migrate(v4Apps);
  const v2Apps = await v2.migrate(v3Apps);
  const v1Apps = await v1.migrate(v2Apps);

  const migrations: Migrations = {
    v1: v1Apps,
    v2: v2Apps,
    v3: v3Apps,
    v4: v4Apps,
  };

  await Promise.all(
    Object.keys(migrations).map(async (version) => {
      const VERSIONED_APPS_DIR = join(APPS_DIR, version);
      const migration = migrations[version as keyof Migrations];
      let appsFileName = 'apps.json';

      if (Number(version.charAt(1)) <= 2) {
        appsFileName = 'tweaks.json';
      }

      await mkdir(VERSIONED_APPS_DIR, {
        recursive: true,
      });

      await Promise.all([
        writeFile(join(VERSIONED_APPS_DIR, appsFileName), JSON.stringify(migration.list, null, 2), 'utf-8'),
        ...migration.apps.map(async (app) => {
          await writeFile(join(VERSIONED_APPS_DIR, `${app.id}.json`), JSON.stringify(app, null, 2), 'utf-8');
        }),
      ]);
    })
  );
}
