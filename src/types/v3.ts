// DO NOT CHANGE THESE AFTER THEY'RE CREATED
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
