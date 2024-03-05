import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Tweak } from '../types';
import { TWEAKS_DIR } from '../utils/tweaks';

export async function migrate(tweaks: Tweak[]) {
  await Promise.all([migrateToV1(tweaks)]);
}

export async function migrateToV1(tweaks: Tweak[]) {
  const V1_TWEAKS_DIR = join(TWEAKS_DIR, 'v1');

  await mkdir(V1_TWEAKS_DIR, {
    recursive: true,
  });

  await Promise.all(
    tweaks.map(async (tweak) => {
      // These are identical now, but if a breaking change occurs we'll map it properly
      const versionedTweak: Tweak.V1 = tweak;

      await writeFile(join(TWEAKS_DIR, 'v1', `${tweak.id}.json`), JSON.stringify(versionedTweak, null, 2), 'utf-8');
    })
  );
}
