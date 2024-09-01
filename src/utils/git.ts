import { exec } from 'node:child_process';

export function getCreationDate(file: string) {
  return new Promise<string>((resolve, reject) =>
    exec(`git log --follow --format=%aI --reverse -- ${file} | head -1`, (error, output) => {
      if (error) reject(error);
      else resolve(output.trim());
    })
  );
}

export function getLastUpdatedDate(file: string) {
  return new Promise<string>((resolve, reject) =>
    exec(`git log --follow --format=%aI -- ${file} | head -1`, (error, output) => {
      if (error) reject(error);
      else resolve(output.trim());
    })
  );
}
