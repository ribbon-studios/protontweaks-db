export type Tweaks = {
  sha: string;
  short_sha: string;
  tweaks: string[];
};

export type Tweak = {
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
