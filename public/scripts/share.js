export async function generateUrl(schema) {
  const url = new URL('/api/editor/share', location.origin);

  const res = await fetch(url.toString(), {
    body: JSON.stringify({
      schema
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const id = await res.json();
  const editorUrl = new URL(location.origin);
  editorUrl.searchParams.append('id', id);

  return editorUrl.toString();
}

export async function getTables(id) {
  const url = new URL('/api/editor/share', location.origin);
  url.searchParams.append('id', id);

  const schema = await fetch(url.toString());
  const data = await schema.json();
  return data.tables;
}
