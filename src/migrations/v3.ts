import type { Migration } from '.';
import type { App, AppsList, V3 } from '../types';

/**
 * TODO: Map these back to V3 once a breaking change occurs
 */
export async function migrate(list: AppsList, apps: App[]): Promise<Migration<V3.AppsList, V3.App[]>> {
  return {
    list,
    apps,
  };
}
