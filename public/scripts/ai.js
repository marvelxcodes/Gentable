import data from './data.js';

export async function generateSchema(app_description) {
  try {
    const url = new URL('/api/ai', location.origin);
    url.searchParams.append('app_description', app_description);

    const schema = await fetch(url.toString());
    const data = await schema.json()
    return data.tables;
  } catch (error) {
    return data;
  }
}

