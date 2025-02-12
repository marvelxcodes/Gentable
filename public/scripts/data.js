export default [
  {
    id: 'table-0',
    name: 'Users',
    x: 100,
    y: 100,
    fields: [
      {
        id: 'field-0',
        name: 'id',
        value: 'boolean',
        type: 'Values',
      },
      {
        id: 'field-1',
        name: 'name',
        value: 'string',
        type: 'Values',
      },
      {
        id: 'field-2',
        name: 'age',
        value: 'number',
        type: 'Values',
      },
    ],
  },
  {
    id: 'table-1',
    name: 'Posts',
    x: 400,
    y: 100,
    fields: [
      {
        id: 'field-0',
        name: 'id',
        value: 'boolean',
        type: 'Values',
      },
      {
        id: 'field-1',
        name: 'title',
        value: 'string',
        type: 'Values',
      },
      {
        id: 'field-2',
        name: 'content',
        value: 'string',
        type: 'Values',
      },
      {
        id: 'field-3',
        name: 'author',
        value: 'string',
        type: 'Relation',
        relation: {
          table: 'Users',
          field: 'id',
        },
      },
    ],
  },
];
