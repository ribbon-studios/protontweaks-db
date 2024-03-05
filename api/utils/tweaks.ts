import Handlebars from 'handlebars';
import { readdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import type { Tweak, Tweaks } from '../types';

export const TEMPLATES_DIR = join(import.meta.dirname, './templates');
export const TWEAKS_DIR = join(import.meta.dirname, '../../tweaks');

export async function getTemplate(file: string) {
  const template = await readFile(join(TEMPLATES_DIR, file), 'utf-8');
  return Handlebars.compile(template, {
    strict: true,
    preventIndent: true,
  });
}

export async function getTweaksFiles(): Promise<string[]> {
  const files = await readdir(TWEAKS_DIR, 'utf-8');
  return files.filter(
    (file) => file.endsWith('.json') && !file.startsWith('.') && !['tweaks.json', 'schema.json'].includes(file)
  );
}

export async function getTweaks(): Promise<Tweak[]> {
  const files = await getTweaksFiles();

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
    tweaks: tweaks.map((tweak) => ({
      id: tweak.id,
      name: tweak.name,
    })),
  };
}

export async function generateTweaksFile(tweaks: Tweaks) {
  await writeFile(join(TWEAKS_DIR, 'tweaks.json'), JSON.stringify(tweaks, null, 2), 'utf-8');
}

export async function generateReadme(tweaks: Tweak[]) {
  const template = await getTemplate('README.md.hbs');

  await writeFile(
    join(TWEAKS_DIR, 'README.md'),
    template({ tweaks: tweaks.sort((a, b) => a.name.localeCompare(b.name)) }),
    'utf-8'
  );
}
