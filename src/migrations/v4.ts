import type { Migration } from '.';
import type { App, AppsList, Info, V4 } from '../types';

/**
 * TODO: Map these back to V4 once a breaking change occurs
 */
export async function migrate({
  list,
  apps,
  info,
}: Migration<AppsList, App, Info>): Promise<Migration<V4.AppsList, V4.App, V4.Info>> {
  return {
    list,
    apps,
    info,
  };
}
