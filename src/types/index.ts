export * as V1 from './v1';
export * as V2 from './v2';
export * as V3 from './v3';

export type AppsList = {
  sha: string;
  short_sha: string;
  apps: Pick<App, 'id' | 'name'>[];
};

export type App = {
  id: string;
  name: string;
  tweaks: {
    tricks: string[];
    env: Record<string, string>;
    settings: {
      esync?: boolean;
      fsync?: boolean;
    };
  };
  issues: {
    solution: string | null;
    description: string;
  }[];
};
