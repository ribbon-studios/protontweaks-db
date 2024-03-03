import fs from 'fs/promises';
import { join } from 'path';
import { generateReadme, generateTweaksFile, getTweaks } from './utils/tweaks';

const dirs = {
  tweaks: join(import.meta.dirname, '../tweaks'),
};

async function generate() {
  const tweaks = await getTweaks();

  await Promise.all([generateTweaksFile(tweaks), generateReadme(tweaks)]);
}

generate();
