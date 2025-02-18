export function stringToJSON(str: string): any {
  const cleanedSchemaString = str.replace(/```json|```/g, '').trim();

  const schemaJson = JSON.parse(cleanedSchemaString);

  return JSON.parse(schemaJson);
}
