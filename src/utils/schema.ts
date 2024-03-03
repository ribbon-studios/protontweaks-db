import schema from './templates/schema.json';
import { DLLS, FONTS, SETTINGS } from './db/index';
import Ajv from 'ajv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { TWEAKS_DIR } from './tweaks';

const ajv = new Ajv({
  allErrors: true,
});

const URL = 'https://tweaks.rains.cafe/schema.json';

export async function getSchema() {
  const output = {
    ...schema,
  };

  output.properties.tweaks.properties.dlls.items.enum = DLLS;
  output.properties.tweaks.properties.fonts.items.enum = FONTS;
  output.properties.tweaks.properties.settings.items.enum = SETTINGS;

  return output;
}

export async function getTweakValidator() {
  return ajv.compile(await getSchema());
}

export async function generateSchema() {
  const schema = await getSchema();

  await writeFile(join(TWEAKS_DIR, 'schema.json'), JSON.stringify(schema, null, 2), 'utf-8');
}
