import { generateReadme, generateTweaksFile, getTweaks } from './utils/tweaks';
import { generateSchema } from './utils/schema';
import { migrate } from './migrations';

async function generate() {
  const tweaks = await getTweaks();

  await Promise.all([migrate(tweaks), generateSchema(), generateTweaksFile(tweaks), generateReadme(tweaks)]);
}

generate();
