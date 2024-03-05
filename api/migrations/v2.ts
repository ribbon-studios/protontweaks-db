import type { Migration } from '.';
import type { V2, V3 } from '../types';

/**
 * List of Tweaks reverted back from a list of objects containing id and name to just a list of ids
 *
 * Settings was also added in v3 so it must be removed
 */
export async function migrate(list: V3.Tweaks, tweaks: V3.Tweak[]): Promise<Migration<V2.Tweaks, V2.Tweak[]>> {
  return {
    list: {
      ...list,
      tweaks: tweaks.map((tweak) => ({
        id: tweak.id,
        name: tweak.name,
      })),
    },
    tweaks: tweaks.map((tweak) => ({
      ...tweak,
      tweaks: {
        tricks: tweak.tweaks.tricks,
        env: tweak.tweaks.env,
      },
    })),
  };
}
