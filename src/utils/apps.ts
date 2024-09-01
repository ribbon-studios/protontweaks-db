import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import type { AppsList, App, ComputedApp } from '../types';
import { getCreationDate, getLastUpdatedDate } from './git';
import { DIRECTORIES } from '../constants';

export async function getAppFiles(includeTemplate: boolean = false): Promise<string[]> {
  const files = await readdir(DIRECTORIES.APPS, 'utf-8');
  return files.filter(
    (file) =>
      file.endsWith('.json') &&
      (!file.startsWith('.') || includeTemplate) &&
      !['apps.json', 'info.json', 'schema.json'].includes(file)
  );
}

export async function getApps(includeTemplate?: boolean): Promise<ComputedApp[]> {
  const files = await getAppFiles(includeTemplate);

  return await Promise.all(
    files.map<Promise<ComputedApp>>(async (file) => {
      const fileName = join(DIRECTORIES.APPS, file);
      const [created_at, updated_at, contents] = await Promise.all([
        getCreationDate(fileName),
        getLastUpdatedDate(fileName),
        readFile(fileName, 'utf-8'),
      ]);

      const app: App = JSON.parse(contents);

      return {
        ...app,
        created_at,
        updated_at,
      };
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
