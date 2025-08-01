import { readFile, writeFile } from 'fs';

const envFilePath = new URL('../src/environments/environment.ts', import.meta.url).pathname;
const apiBaseUrl = process.env.API_BASE_URL;

readFile(envFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  const result = data.replace(/BASE_API_URL/g, apiBaseUrl);

  writeFile(envFilePath, result, 'utf8', (err) => {
    if (err) throw err;
    console.log('✅ environment.prod.ts updated with API_BASE_URL');
  });
});