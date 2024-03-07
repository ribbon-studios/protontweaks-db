import type { Migration } from '.';
import type { V2, V3 } from '../types';

/**
 * Adjust tweaks key in V2.Tweaks to be "apps" for better clarity
 */
export async function migrate(
  { apps, ...list }: V3.AppsList,
  tweaks: V3.App[]
): Promise<Migration<V2.Tweaks, V2.Tweak[]>> {
  return {
    list: {
      ...list,
      tweaks: apps,
    },
    apps: tweaks,
  };
}
