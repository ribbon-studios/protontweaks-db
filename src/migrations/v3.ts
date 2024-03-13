import type { Migration } from '.';
import type { V4, V3 } from '../types';

/**
 * Removed fsync and esync options as they're redundant when environment variables are available.
 */
export async function migrate({ list, apps }: Migration<V4.AppsList, V4.App>): Promise<Migration<V3.AppsList, V3.App>> {
  return {
    list,
    apps: apps.map((app) => {
      const settings: V3.App['tweaks']['settings'] = {};

      if (app.tweaks.env.PROTON_NO_ESYNC) {
        settings.esync = app.tweaks.env.PROTON_NO_ESYNC === '0';
        delete app.tweaks.env.PROTON_NO_ESYNC;
      }

      if (app.tweaks.env.PROTON_NO_FSYNC) {
        settings.fsync = app.tweaks.env.PROTON_NO_FSYNC === '0';
        delete app.tweaks.env.PROTON_NO_FSYNC;
      }

      // Opting to discard any system tweaks to prevent unexpected issues
      const { system, ...tweaks } = app.tweaks;

      return {
        ...app,
        tweaks: {
          ...tweaks,
          settings,
        },
      };
    }),
  };
}
