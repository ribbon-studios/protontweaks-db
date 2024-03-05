import type { Migration } from '.';
import type { Tweak, Tweaks, V1 } from '../types';

export async function migrate(list: Tweaks, tweaks: Tweak[]): Promise<Migration<V1.Tweaks, V1.Tweak[]>> {
  // TODO: Map these back to V1 once a breaking change occurs
  return {
    list: {
      ...list,
      tweaks: list.tweaks.map((tweak) => tweak.id),
    },
    tweaks,
  };
}
