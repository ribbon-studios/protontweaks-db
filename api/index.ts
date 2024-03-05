import { generateTweaksFile, getList, getTweaks } from './utils/tweaks';
import { generateSchema } from './utils/schema';
import { migrate } from './migrations';
import { mkdir, cp } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = join(import.meta.dirname, '../dist/api');

async function generate() {
  const tweaks = await getTweaks();
  const list = await getList(tweaks);

  await Promise.all([migrate(list, tweaks), generateSchema(), generateTweaksFile(list)]);

  await mkdir(DIST_DIR, {
    recursive: true,
  });

  await cp(join(import.meta.dirname, '../tweaks'), DIST_DIR, {
    recursive: true,
  });
}

generate();
