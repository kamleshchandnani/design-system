/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const components = fs
  .readdirSync('src')
  .filter((srcSubDir) => ['atoms', 'molecules'].includes(srcSubDir))
  .reduce(
    (acc, dir) => [...acc, ...fs.readdirSync(`src/${dir}`).map((filePath) => `${filePath}.js`)],
    []
  );

// generate package.json
const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const newPackageJson = Object.assign({}, packageJson, {
  files: ['cjs/**/*', ...components, 'theme.js'],
});
fs.writeFileSync(packageJsonPath, JSON.stringify(newPackageJson, null, 2));
console.log('publish files created in package.json');
