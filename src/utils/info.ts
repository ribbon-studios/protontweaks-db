import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { Info } from '../types/v4';
import { APPS_DIR } from './apps';

export function getInfo(): Info {
  return {
    sha: process.env.GITHUB_SHA ?? 'local',
    short_sha: process.env.GITHUB_SHA?.slice(0, 7) ?? 'local',
  };
}

export async function generateInfoFile(info: Info) {
  await writeFile(join(APPS_DIR, 'info.json'), JSON.stringify(info, null, 2), 'utf-8');
}
