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

// DO NOT CHANGE THESE AFTER THEY'RE CREATED
export namespace Tweak {
  export type V1 = {
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
}
