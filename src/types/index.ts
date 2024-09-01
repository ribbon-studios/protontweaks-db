export * as V1 from './v1';
export * as V2 from './v2';
export * as V3 from './v3';
import * as V4 from './v4';

export type AppsList = V4.AppsList;
export type App = V4.App;
export type ComputedApp = App & {
  created_at: string;
  updated_at: string;
};
export type Info = V4.Info;

export { V4 };
