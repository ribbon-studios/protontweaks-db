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
