// DO NOT CHANGE THESE AFTER THEY'RE CREATED
export namespace V1 {
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
      env?: Record<string, string>;
    };
    issues: {
      solution: string | null;
      description: string;
    }[];
  };
}
