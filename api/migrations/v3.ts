import type { Migration } from '.';
import type { Tweak, Tweaks, V3 } from '../types';

/**
 * TODO: Map these back to V3 once a breaking change occurs
 */
export async function migrate(list: Tweaks, tweaks: Tweak[]): Promise<Migration<V3.Tweaks, V3.Tweak[]>> {
  return {
    list,
    tweaks,
  };
}
