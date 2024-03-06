import { readdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import type { Tweak, Tweaks } from '../types';

export const TEMPLATES_DIR = join(import.meta.dirname, './templates');
export const TWEAKS_DIR = join(import.meta.dirname, '../../tweaks');

export async function getTweaksFiles(includeTemplate: boolean = false): Promise<string[]> {
  const files = await readdir(TWEAKS_DIR, 'utf-8');
  return files.filter(
    (file) =>
      file.endsWith('.json') &&
      (!file.startsWith('.') || includeTemplate) &&
      !['tweaks.json', 'schema.json'].includes(file)
  );
}

export async function getTweaks(includeTemplate?: boolean): Promise<Tweak[]> {
  const files = await getTweaksFiles(includeTemplate);

  return await Promise.all(
    files.map(async (file) => {
      const contents = await readFile(join(TWEAKS_DIR, file), 'utf-8');
      return JSON.parse(contents) as Tweak;
    })
  );
}

export async function getList(tweaks: Tweak[]): Promise<Tweaks> {
  return {
    sha: process.env.GITHUB_SHA ?? 'local',
    short_sha: process.env.GITHUB_SHA?.slice(0, 7) ?? 'local',
    tweaks: tweaks
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((tweak) => ({
        id: tweak.id,
        name: tweak.name,
      })),
  };
}

export async function generateTweaksFile(tweaks: Tweaks) {
  await writeFile(join(TWEAKS_DIR, 'tweaks.json'), JSON.stringify(tweaks, null, 2), 'utf-8');
}
