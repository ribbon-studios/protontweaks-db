import type { Info } from '../types/v4';

export function getInfo(): Info {
  return {
    sha: process.env.GITHUB_SHA ?? 'local',
    short_sha: process.env.GITHUB_SHA?.slice(0, 7) ?? 'local',
  };
}
