import data from './data.js';
import { download } from './util.js';

export async function generateSchema(app_description) {
  try {
    const url = new URL('/api/ai', location.origin);
    url.searchParams.append('app_description', app_description);

    const schema = await fetch(url.toString());
    const data = await schema.json();
    return data.tables;
  } catch (error) {
    return data;
  }
}

export async function generatePrismaSchema(schema) {
  try {
    const url = new URL('/api/ai/prisma', location.origin);

    const query = await fetch(url.toString(), {
      body: JSON.stringify({
        schema,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await query.json();
    download('schema.prisma', data);
  } catch (error) {
    console.error(error);
  }
}


export async function generateSQLQuery(schema) {
  try {
    const url = new URL('/api/ai/sql', location.origin);

    const query = await fetch(url.toString(), {
      body: JSON.stringify({
        schema,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await query.json();
    download('query.sql', data);
  } catch (error) {
    console.error(error);
  }
}
