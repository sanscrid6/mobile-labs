const fs = require('fs/promises');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const envPath = '.env';

async function main() {
  const file = await fs.readFile(envPath, {encoding: 'utf8'});
  let envRaw = file.toString();

  const major = /MAJOR=\d+/;
  const minor = /MINOR=\d+/;
  const patch = /PATCH=\d+/;

  const {stdout, stderr} = await exec('git describe');

  if (!stdout || stderr) {
    console.log('no git tag provided');
    return;
  }

  const version = stdout
    .toString()
    .match(/\d+\.\d+-\d/)[0]
    .replace('-', '.')
    .split('.');

  envRaw = envRaw.replace(major, `MAJOR=${version[0]}`);
  envRaw = envRaw.replace(minor, `MINOR=${version[1]}`);
  envRaw = envRaw.replace(patch, `PATCH=${version[2]}`);

  await fs.writeFile(envPath, envRaw);
}

main();
