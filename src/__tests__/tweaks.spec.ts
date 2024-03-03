import { expect, it, describe } from 'bun:test';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { TWEAKS_DIR, getTweaks } from '../utils/tweaks';
import { getTweakValidator } from '../utils/schema';

describe('tweaks', async () => {
  const [tweaks, isTweak] = await Promise.all([getTweaks(), getTweakValidator()]);
  const longestName = tweaks.reduce(
    (output, tweak) => (tweak.name.length > output ? tweak.name.length + 2 : output),
    0
  );
  const tests = tweaks.map((tweak) => [`"${tweak.name}"`.padEnd(longestName, ' '), tweak.id]);

  it.each(tests)('validating %s @ %s', async (name, id) => {
    const contents = await readFile(join(TWEAKS_DIR, `${id}.json`), 'utf-8');

    const valid = isTweak(JSON.parse(contents));

    if (isTweak.errors) {
      for (const error of isTweak.errors) {
        console.error(`./${id}.json -> ${error.instancePath}: ${error.message}`);
      }
    }

    expect(valid).toEqual(true);
  });
});
