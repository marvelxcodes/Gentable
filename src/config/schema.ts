import { SchemaType } from '@google/generative-ai';

export const tablesResponseSchema = {
  description: 'List of Tables',
  type: SchemaType.OBJECT,
  properties: {
    tables: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          name: { type: SchemaType.STRING },
          x: { type: SchemaType.INTEGER },
          y: { type: SchemaType.INTEGER },
          fields: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: { type: SchemaType.STRING },
                name: { type: SchemaType.STRING },
                value: {
                  type: SchemaType.STRING,
                },
                type: {
                  type: SchemaType.STRING,
                  enum: ['Relation', 'Values'],
                },
                relation: {
                  type: SchemaType.OBJECT,
                  properties: {
                    table: { type: SchemaType.STRING },
                    field: { type: SchemaType.STRING },
                  },
                  required: ['table', 'field'],
                },
              },
              required: ['id', 'name', 'value', 'type'],
            },
          },
        },
        required: ['id', 'name', 'x', 'y', 'fields'],
      },
    },
  },
  required: ['tables'],
};

