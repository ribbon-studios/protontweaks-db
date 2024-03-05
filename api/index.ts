import { generateReadme, generateTweaksFile, getList, getTweaks } from './utils/tweaks';
import { generateSchema } from './utils/schema';
import { migrate } from './migrations';

async function generate() {
  const tweaks = await getTweaks();
  const list = await getList(tweaks);

  await Promise.all([migrate(list, tweaks), generateSchema(), generateTweaksFile(list), generateReadme(tweaks)]);
}

generate();
