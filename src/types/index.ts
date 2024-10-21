export * as V1 from './v1';
export * as V2 from './v2';
export * as V3 from './v3';
import * as V4 from './v4';

export type Info = V4.Info;
export type App = V4.App;
export type ComputedApp = App & {
  created_at: string;
  updated_at: string;
};

export type PartialApp = Pick<ComputedApp, 'id' | 'name' | 'created_at' | 'updated_at'> & {
  // Used for filtering on protontweaks.com
  has: {
    args: boolean;
    env: boolean;
    settings: boolean;
    tricks: boolean;
  };
};

export type AppsList = Info & {
  apps: PartialApp[];
};

export { V4 };
