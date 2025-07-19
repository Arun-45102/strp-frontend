import { readFile, writeFile } from 'fs';
import { join } from 'path';

const envFilePath = join(__dirname, '../src/environments/environment.ts');
const apiBaseUrl = process.env.API_BASE_URL;

readFile(envFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  const result = data.replace(/BASE_API_URL/g, apiBaseUrl);

  writeFile(envFilePath, result, 'utf8', (err) => {
    if (err) throw err;
    console.log('✅ environment.prod.ts updated with API_BASE_URL');
  });
});