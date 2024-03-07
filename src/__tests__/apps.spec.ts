import { expect, it, describe } from 'bun:test';
import { getApps } from '../utils/apps';
import { getAppValidator } from '../utils/schema';
import type { App } from '../types';

describe('apps', async () => {
  const [apps, isApp] = await Promise.all([getApps(true), getAppValidator()]);
  const longestName = apps.reduce((output, tweak) => (tweak.name.length > output ? tweak.name.length + 2 : output), 0);

  const tests: [string, string, App][] = apps
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((app) => [`"${app.name}"`.padEnd(longestName, ' '), app.id, app]);

  it.each(tests)('validating %s @ %s', async (_, id, app) => {
    const valid = isApp(app);

    if (isApp.errors) {
      for (const error of isApp.errors) {
        console.error(`./${id}.json -> ${error.instancePath}: ${error.message}`);
      }
    }

    expect(valid).toEqual(true);
    expect(app.id).toEqual(id);
  });
});
