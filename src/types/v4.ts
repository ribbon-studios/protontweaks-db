import type { DLLS, DllValues, FONTS, FontValues, SETTINGS, SettingsValues } from '../utils/db';

export type AppsList = {
  sha: string;
  short_sha: string;
  apps: Pick<App, 'id' | 'name'>[];
};

export type App = {
  id: string;
  name: string;
  tweaks: SystemTweaks & {
    system: {
      gpu_driver: Partial<Record<GpuDriver, SystemTweaks>>;
    };
  };
  issues: {
    solution: string | null;
    description: string;
  }[];
};

// Even beyond AMD vs Nvidia this will likely have a way bigger impact once NVK fully drops
export enum GpuDriver {
  AMD = 'amd',
  Nvidia = 'nvidia',
}

export type SystemTweaks = {
  tricks: (DllValues | FontValues | SettingsValues)[];
  env: Record<string, string>;
  settings: {
    gamemode?: boolean;
    mangohud?: boolean;
  };
};

const tweaks: SystemTweaks = {
  tricks: [],
  env: {},
  settings: {},
};
