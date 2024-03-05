import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import type { Tweak, Tweaks, V1, V2 } from '../types';
import { TWEAKS_DIR } from '../utils/tweaks';
import * as v1 from './v1';
import * as v2 from './v2';

export type Migrations = {
  v1: Migration<V1.Tweaks, V1.Tweak[]>;
  v2: Migration<V2.Tweaks, V2.Tweak[]>;
};

export type Migration<L, T> = {
  list: L;
  tweaks: T;
};

export async function migrate(list: Tweaks, tweaks: Tweak[]) {
  const v2Tweaks = await v2.migrate(list, tweaks);
  const v1Tweaks = await v1.migrate(v2Tweaks.list, v2Tweaks.tweaks);

  const migrations: Migrations = {
    v1: v1Tweaks,
    v2: v2Tweaks,
  };

  await Promise.all(
    Object.keys(migrations).map(async (version) => {
      const VERSIONED_TWEAKS_DIR = join(TWEAKS_DIR, version);
      const migration = migrations[version as keyof Migrations];

      await mkdir(VERSIONED_TWEAKS_DIR, {
        recursive: true,
      });

      await Promise.all([
        writeFile(join(VERSIONED_TWEAKS_DIR, 'tweaks.json'), JSON.stringify(migration.list, null, 2), 'utf-8'),
        ...migration.tweaks.map(async (tweak) => {
          await writeFile(join(VERSIONED_TWEAKS_DIR, `${tweak.id}.json`), JSON.stringify(tweak, null, 2), 'utf-8');
        }),
      ]);
    })
  );
}
