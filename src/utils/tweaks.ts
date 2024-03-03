import Handlebars from 'handlebars';
import { readdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import type { Tweak } from '../types';

export const TEMPLATES_DIR = join(import.meta.dirname, './templates');
export const TWEAKS_DIR = join(import.meta.dirname, '../../tweaks');

export type SimpleTweak = Pick<Tweak, 'name'> & {
  id: string;
};

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

export async function getTweaks(): Promise<SimpleTweak[]> {
  const files = await getTweaksFiles();

  return await Promise.all(
    files.map(async (file) => {
      const contents = await readFile(join(TWEAKS_DIR, file), 'utf-8');
      const tweak: Omit<SimpleTweak, 'id'> = JSON.parse(contents);

      return {
        id: file.replace('.json', ''),
        ...tweak,
      };
    })
  );
}

export async function generateTweaksFile(tweaks: SimpleTweak[]) {
  await writeFile(
    join(TWEAKS_DIR, 'tweaks.json'),
    JSON.stringify(
      {
        sha: process.env.GITHUB_SHA ?? 'local',
        short_sha: process.env.GITHUB_SHA?.slice(0, 7) ?? 'local',
        tweaks: tweaks.map((tweak) => tweak.id),
      },
      null,
      2
    ),
    'utf-8'
  );
}

export async function generateReadme(tweaks: SimpleTweak[]) {
  const template = await getTemplate('README.md.hbs');

  await writeFile(
    join(TWEAKS_DIR, 'README.md'),
    template({ tweaks: tweaks.sort((a, b) => a.name.localeCompare(b.name)) }),
    'utf-8'
  );
}
