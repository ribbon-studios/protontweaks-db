export * as V1 from './v1';
export * as V2 from './v2';

export type Tweaks = {
  sha: string;
  short_sha: string;
  tweaks: Pick<Tweak, 'id' | 'name'>[];
};

export type Tweak = {
  id: string;
  name: string;
  tweaks: {
    tricks: string[];
    env?: Record<string, string>;
  };
  issues: {
    solution: string | null;
    description: string;
  }[];
};
