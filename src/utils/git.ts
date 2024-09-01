import { exec } from 'node:child_process';

export function getCreationDate(file: string) {
  return new Promise<string>((resolve, reject) =>
    exec(`git log --diff-filter=A --follow --format=%aI -1 -- ${file}`, (error, output) => {
      if (error) reject(error);
      else resolve(output.trim());
    })
  );
}

export function getLastUpdatedDate(file: string) {
  return new Promise<string>((resolve, reject) =>
    exec(`git log --diff-filter=A --follow --format=%cI -1 -- ${file}`, (error, output) => {
      if (error) reject(error);
      else resolve(output.trim());
    })
  );
}
