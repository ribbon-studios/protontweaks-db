import { generateReadme, generateTweaksFile, getTweaks } from './utils/tweaks';
import { generateSchema } from './utils/schema';

async function generate() {
  const tweaks = await getTweaks();

  await Promise.all([generateSchema(), generateTweaksFile(tweaks), generateReadme(tweaks)]);
}

generate();
