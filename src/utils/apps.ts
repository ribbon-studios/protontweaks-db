import { readdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import type { AppsList, App } from '../types';

export const TEMPLATES_DIR = join(import.meta.dirname, './templates');
export const APPS_DIR = join(import.meta.dirname, '../../apps');

export async function getAppFiles(includeTemplate: boolean = false): Promise<string[]> {
  const files = await readdir(APPS_DIR, 'utf-8');
  return files.filter(
    (file) =>
      file.endsWith('.json') &&
      (!file.startsWith('.') || includeTemplate) &&
      !['apps.json', 'schema.json'].includes(file)
  );
}

export async function getApps(includeTemplate?: boolean): Promise<App[]> {
  const files = await getAppFiles(includeTemplate);

  return await Promise.all(
    files.map(async (file) => {
      const contents = await readFile(join(APPS_DIR, file), 'utf-8');
      return JSON.parse(contents) as App;
    })
  );
}

export async function getAppsList(apps: App[]): Promise<AppsList> {
  return {
    sha: process.env.GITHUB_SHA ?? 'local',
    short_sha: process.env.GITHUB_SHA?.slice(0, 7) ?? 'local',
    apps: apps
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((app) => ({
        id: app.id,
        name: app.name,
      })),
  };
}

export async function generateAppsListFile(appsList: AppsList) {
  await writeFile(join(APPS_DIR, 'apps.json'), JSON.stringify(appsList, null, 2), 'utf-8');
}
