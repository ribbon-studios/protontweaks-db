import type { Migration } from '.';
import type { App, AppsList, V4 } from '../types';

/**
 * TODO: Map these back to V4 once a breaking change occurs
 */
export async function migrate({ list, apps }: Migration<AppsList, App>): Promise<Migration<V4.AppsList, V4.App>> {
  return {
    list,
    apps,
  };
}
