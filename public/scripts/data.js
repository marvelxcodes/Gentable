export default [
  {
    fields: [
      {
        id: 'post_id',
        name: 'id',
        type: 'Values',
        value: 'integer',
      },
      {
        id: 'post_title',
        name: 'title',
        type: 'Values',
        value: 'string',
      },
      {
        id: 'post_content',
        name: 'content',
        type: 'Values',
        value: 'text',
      },
      {
        id: 'post_author',
        name: 'author_id',
        type: 'Relation',
        value: 'integer',
        relation: {
          field: 'id',
          table: 'users',
        },
      },
      {
        id: 'post_created_at',
        name: 'created_at',
        type: 'Values',
        value: 'timestamp',
      },
      {
        id: 'post_updated_at',
        name: 'updated_at',
        type: 'Values',
        value: 'timestamp',
      },
    ],
    id: 'posts',
    name: 'Posts',
    x: 10,
    y: 10,
  },
  {
    fields: [
      {
        id: 'user_id',
        name: 'id',
        type: 'Values',
        value: 'integer',
      },
      {
        id: 'user_name',
        name: 'name',
        type: 'Values',
        value: 'string',
      },
      {
        id: 'user_email',
        name: 'email',
        type: 'Values',
        value: 'string',
      },
      {
        id: 'user_password',
        name: 'password',
        type: 'Values',
        value: 'string',
      },
      {
        id: 'user_created_at',
        name: 'created_at',
        type: 'Values',
        value: 'timestamp',
      },
      {
        id: 'user_updated_at',
        name: 'updated_at',
        type: 'Values',
        value: 'timestamp',
      },
    ],
    id: 'users',
    name: 'Users',
    x: 300,
    y: 10,
  },
  {
    fields: [
      {
        id: 'comment_id',
        name: 'id',
        type: 'Values',
        value: 'integer',
      },
      {
        id: 'comment_content',
        name: 'content',
        type: 'Values',
        value: 'text',
      },
      {
        id: 'comment_author',
        name: 'author_id',
        type: 'Relation',
        value: 'integer',
        relation: {
          field: 'id',
          table: 'users',
        },
      },
      {
        id: 'comment_post',
        name: 'post_id',
        type: 'Relation',
        value: 'integer',
        relation: {
          field: 'id',
          table: 'posts',
        },
      },
      {
        id: 'comment_created_at',
        name: 'created_at',
        type: 'Values',
        value: 'timestamp',
      },
      {
        id: 'comment_updated_at',
        name: 'updated_at',
        type: 'Values',
        value: 'timestamp',
      },
    ],
    id: 'comments',
    name: 'Comments',
    x: 10,
    y: 300,
  },
];
