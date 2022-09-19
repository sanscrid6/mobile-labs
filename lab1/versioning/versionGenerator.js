const fs = require('fs/promises');
const envPath = '.env';

async function main() {
  const file = await fs.readFile(envPath, {encoding: 'utf8'});
  let envRaw = file.toString();

  const major = /MAJOR=\d+/;
  const minor = /MINOR=\d+/;
  const patch = /PATCH=\d+/;

  envRaw = envRaw.replace(major, `MAJOR=${11}`);
  envRaw = envRaw.replace(minor, `MINOR=${22}`);
  envRaw = envRaw.replace(patch, `PATCH=${33}`);

  await fs.writeFile(envPath, envRaw);
}

main();
