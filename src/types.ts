export type Tweak = {
  name: string;
  tweaks: {
    dlls: string[];
    fonts: string[];
    settings: string[];
    env?: Record<string, string>;
  };
};
