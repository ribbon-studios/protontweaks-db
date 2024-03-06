import type { Migration } from '.';
import type { Tweak, Tweaks, V2 } from '../types';

/**
 * TODO: Map these back to V2 once a breaking change occurs
 */
export async function migrate(list: Tweaks, tweaks: Tweak[]): Promise<Migration<V2.Tweaks, V2.Tweak[]>> {
  return {
    list,
    tweaks,
  };
}
