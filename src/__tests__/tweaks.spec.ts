import { expect, it, describe } from 'bun:test';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { TWEAKS_DIR, getTweaks } from '../utils/tweaks';
import { getTweakValidator } from '../utils/schema';
import type { Tweak } from '../types';

describe('tweaks', async () => {
  const [tweaks, isTweak] = await Promise.all([getTweaks(true), getTweakValidator()]);
  const longestName = tweaks.reduce(
    (output, tweak) => (tweak.name.length > output ? tweak.name.length + 2 : output),
    0
  );

  const tests: [string, string, Tweak][] = tweaks
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((tweak) => [`"${tweak.name}"`.padEnd(longestName, ' '), tweak.id, tweak]);

  it.each(tests)('validating %s @ %s', async (name, id, tweak) => {
    const valid = isTweak(tweak);

    if (isTweak.errors) {
      for (const error of isTweak.errors) {
        console.error(`./${id}.json -> ${error.instancePath}: ${error.message}`);
      }
    }

    expect(valid).toEqual(true);
    expect(tweak.id).toEqual(id);
  });
});
