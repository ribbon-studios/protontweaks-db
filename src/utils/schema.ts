import { DLLS, FONTS, SETTINGS } from './db/index';
import Ajv from 'ajv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { APPS_DIR } from './apps';
import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';

const ajv = new Ajv({
  allErrors: true,
});

export async function getSchema() {
  const tsconfig = await import('../../tsconfig.json');
  const program = TJS.getProgramFromFiles([resolve('./src/types/index.ts')], tsconfig.compilerOptions);
  const schema = TJS.generateSchema(
    program,
    'App',
    {
      required: true,
    },
    [resolve('./src/types/index.ts')]
  );

  if (!schema) throw new Error('Failed to generate schema!');

  return schema;
}

export async function getAppValidator() {
  return ajv.compile(await getSchema());
}

export async function generateSchema() {
  const schema = await getSchema();

  await writeFile(join(APPS_DIR, 'schema.json'), JSON.stringify(schema, null, 2), 'utf-8');
}
