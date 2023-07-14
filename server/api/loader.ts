import * as fs from 'fs';

export default defineEventHandler(async (event) => {
  let data = {};

  const { key } = getQuery(event);
  if (!key) {
    console.error('No key provided');
    return { data };
  }

  if (!fs.existsSync(`data/${key}.json`)) {
    console.error('path does not exist');
    return { data };
  }

  try {
    const fp = fs.readFileSync(`data/${key}.json`, 'utf8');
    data = JSON.parse(fp);
  } catch (err) {
    console.error('Error loading board', err);
  }

  return { data };
});
