import type { Migration } from '.';
import type { Tweak, Tweaks, V2 } from '../types';

export async function migrate(list: Tweaks, tweaks: Tweak[]): Promise<Migration<V2.Tweaks, V2.Tweak[]>> {
  // TODO: Map these back to V2 once a breaking change occurs
  return {
    list,
    tweaks,
  };
}
