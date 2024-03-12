import type { Migration } from '.';
import type { V1, V2 } from '../types';

/**
 * List of Tweaks changed from a list of ids to a list of objects containing id and name
 */
export async function migrate({
  list,
  apps,
}: Migration<V2.Tweaks, V2.Tweak[]>): Promise<Migration<V1.Tweaks, V1.Tweak[]>> {
  return {
    list: {
      ...list,
      tweaks: list.tweaks.map((tweak) => tweak.id),
    },
    apps: apps,
  };
}
