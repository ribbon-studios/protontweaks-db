import schema from './templates/schema.json';
import { DLLS, FONTS, SETTINGS } from './db/index';
import Ajv from 'ajv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { APPS_DIR } from './apps';

const ajv = new Ajv({
  allErrors: true,
});

export async function getSchema() {
  const output = {
    ...schema,
  };

  output.properties.tweaks.properties.tricks.items.enum = [...DLLS, ...FONTS, ...SETTINGS];

  return output;
}

export async function getAppValidator() {
  return ajv.compile(await getSchema());
}

export async function generateSchema() {
  const schema = await getSchema();

  await writeFile(join(APPS_DIR, 'schema.json'), JSON.stringify(schema, null, 2), 'utf-8');
}
