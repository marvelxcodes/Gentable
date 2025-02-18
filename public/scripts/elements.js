import { updateTransform } from './util.js';

export function CanvasTableCard(table) {
  const card = document.createElement('div');
  card.id = table.id;
  card.className =
    'bg-white table h overflow-hidden select-none shadow-xl w-80 flex flex-col rounded-lg z-30 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2';

  updateTransform(card, { translate: { x: table.x, y: table.y } });
  const accentBar = document.createElement('div');
  accentBar.className = 'pt-2 bg-accent';

  const header = document.createElement('div');
  header.className =
    'table-header bg-neutral-100 select-none text-neutral-600 text-center border-b border-neutral-300 py-3 text-xl font-bold';
  header.textContent = table.name;

  const body = document.createElement('div');
  body.className = 'bg-white flex h-full flex-1 cursor-default';

  const innerPadding = document.createElement('div');
  innerPadding.className = 'py-2 flex-1 flex flex-col';

  table.fields.forEach((field) => {
    const fieldElement = document.createElement('div');
    fieldElement.className = 'field-element flex items-center px-4 py-2';

    const fieldLabel = document.createElement('span');
    fieldLabel.className = 'field-label text-neutral-600 flex-1';
    fieldLabel.textContent = field.name;

    const fieldValue = document.createElement('span');
    fieldValue.className = 'field-value text-neutral-600 flex-1 text-right';
    fieldValue.textContent = field.value;

    fieldElement.appendChild(fieldLabel);
    fieldElement.appendChild(fieldValue);
    innerPadding.appendChild(fieldElement);
  });

  body.appendChild(innerPadding);

  card.appendChild(accentBar);
  card.appendChild(header);
  card.appendChild(body);

  return card;
}

export function SidebarTableCardRow(table, field, index) {
  const row = document.createElement('div');
  row.className = 'grid grid-cols-6 text-sm items-center gap-x-2';

  const fieldContainer = document.createElement('div');
  fieldContainer.className =
    'bg-white rounded-sm col-span-3  p-2 border border-neutral-200';

  const fieldNameInput = document.createElement('input');
  fieldContainer.appendChild(fieldNameInput);
  fieldNameInput.className = 'type-input text-neutral-500';
  fieldNameInput.addEventListener('input', (event) => {
    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(
        tables.map((t) => {
          if (t.id === table.id) {
            t.fields = t.fields.map((f) => {
              if (f.id === field.id) {
                f.name = event.target.value;
              }
              return f;
            });
          }
          return t;
        }),
      ),
    );

    console.log(document.getElementById(table.id).querySelectorAll('.field-label'));
    document.getElementById(table.id).querySelectorAll('.field-label')[
      index
    ].textContent = event.target.value;
  });
  fieldNameInput.value = field.name;

  const typeContainer = document.createElement('div');
  typeContainer.className =
    'bg-white rounded-sm p-2 col-span-2 border border-neutral-200';

  const typeInput = document.createElement('input');
  typeInput.className = 'type-input text-neutral-500 w-full';
  typeInput.value = table.value;

  typeInput.addEventListener('input', (event) => {
    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(
        tables.map((t) => {
          if (t.id === table.id) {
            t.fields = t.fields.map((f) => {
              if (f.id === field.id) {
                f.value = event.target.value;
              }
              return f;
            });
          }
          return t;
        }),
      ),
    );
    const fieldType = document
      .getElementById(table.id)
      .querySelectorAll('.field-value')[index];
    fieldType.textContent = event.target.value;
  });
  typeInput.value = field.value;

  typeContainer.appendChild(typeInput);

  const deleteButton = document.createElement('div');
  deleteButton.className =
    'col-span-1 flex items-center justify-center group transition-colors hover:bg-accent border h-full text-neutral-600 rounded-sm bg-neutral-100 border-neutral-200 cursor-pointer';

  const deleteIcon = document.createElement('span');
  deleteIcon.className =
    'heroicon heroicon-trash text-xl group-hover:text-white';

  deleteButton.addEventListener('click', () => {
    row.remove();
    document
      .getElementById(table.id)
      .querySelectorAll('.field-element')
      [index].remove();

    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(
        tables.map((t) => {
          if (t.id === table.id) {
            t.fields = t.fields.filter((f) => f.id !== field.id);
          }
          return t;
        }),
      ),
    );
  });

  deleteButton.appendChild(deleteIcon);

  row.appendChild(fieldContainer);
  row.appendChild(typeContainer);
  row.appendChild(deleteButton);
  return row;
}

export function SidebarTableCard(table) {
  const card = document.createElement('div');
  card.className = ' h-max bg-white mx-2 rounded-lg';

  const header = document.createElement('div');
  header.className = 'border-b-1 bg-neutral-100 rounded-lg border-neutral-200';

  const titleInput = document.createElement('input');
  titleInput.className =
    'p-3 w-full text-center text-accent font-medium tracking-wide';
  titleInput.addEventListener('input', (event) => {
    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(
        tables.map((t) => {
          if (t.id === table.id) {
            t.name = event.target.value;
          }
          return t;
        }),
      ),
    );
    const tableHeader = document
      .getElementById(table.id)
      .querySelector('.table-header');
    tableHeader.textContent = event.target.value;
  });
  titleInput.value = table.name;

  header.appendChild(titleInput);

  const content = document.createElement('div');
  content.className =
    'flex flex-col px-2 py-2 gap-y-2 divide-purple-400 text-white rounded';

  table.fields.forEach((field, index) => {
    const newRow = SidebarTableCardRow(table, field, index);
    content.appendChild(newRow);
  });
  const footer = document.createElement('div');
  footer.className =
    'flex px-2 rounded-lg gap-x-2 border-t py-2 bg-neutral-100 border-neutral-200';

  const deleteTableButton = document.createElement('button');
  deleteTableButton.className =
    'text-sm bg-white cursor-pointer hover:bg-neutral-200 border px-2 py-0.5 rounded-md shadow text-neutral-500 border-neutral-300 flex-1';
  deleteTableButton.textContent = 'Delete Table';
  deleteTableButton.addEventListener('click', (event) => {
    card.remove();
    document.getElementById(table.id).remove();
    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(tables.filter((t) => t.id !== table.id)),
    );
  });

  const addFieldButton = document.createElement('button');
  addFieldButton.className =
    'text-sm bg-accent cursor-pointer hover:bg-purple-700 border px-2 py-0.5 rounded-md shadow text-white border-accent flex-1';
  addFieldButton.textContent = 'Add Field';
  addFieldButton.addEventListener('click', () => {
    const tables = JSON.parse(localStorage.getItem('tables'));
    localStorage.setItem(
      'tables',
      JSON.stringify(
        tables.map((t) => {
          if (t.id === table.id) {
            t.fields.push({
              id: `field-${t.fields.length}`,
              name: '',
              value: 'varchar',
              type: 'Values',
            });
          }
          return t;
        }),
      ),
    );
    const tableDiv = document.getElementById(table.id);
    const innerPadding = tableDiv.querySelector('.py-2.flex-1.flex.flex-col');

    const fieldElement = document.createElement('div');
    fieldElement.className = 'field-element flex items-center px-4 py-2';

    const fieldLabel = document.createElement('span');
    fieldLabel.className = 'field-label text-neutral-600 flex-1';
    fieldLabel.textContent = '';

    const fieldValue = document.createElement('span');
    fieldValue.className = 'field-value text-neutral-600 flex-1 text-right';
    fieldValue.textContent = 'varchar';

    fieldElement.appendChild(fieldLabel);
    fieldElement.appendChild(fieldValue);
    innerPadding.appendChild(fieldElement);

    const newFieldsLength =
      JSON.parse(localStorage.getItem('tables')).find((t) => t.id === table.id)
        .fields.length - 1;

    const newRow = SidebarTableCardRow(
      table,
      {
        id: `field-${Math.random().toString(36).slice(2, 9)}`,
        name: '',
        value: 'varchar',
        type: 'Values',
      },
      newFieldsLength,
    );
    content.appendChild(newRow);
  });

  footer.appendChild(deleteTableButton);
  footer.appendChild(addFieldButton);

  card.appendChild(header);
  card.appendChild(content);
  card.appendChild(footer);

  return card;
}

export function showAlert(message) {
  const alert = document.createElement('div');
  alert.className = 'max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg fixed bottom-20 right-4 z-50 transition-transform transform translate-x-full';
  alert.setAttribute('role', 'alert');
  alert.setAttribute('tabindex', '-1');
  alert.setAttribute('aria-labelledby', 'hs-toast-stack-toggle-update-label');

  const alertContent = document.createElement('div');
  alertContent.className = 'flex p-4';

  const iconContainer = document.createElement('div');
  iconContainer.className = 'shrink-0';

  const icon = document.createElement('img');
  icon.className = 'shrink-0 size-4 mt-0.5';
  icon.setAttribute('src', '/assets/success.svg');
  icon.setAttribute('alt', 'Success Icon');

  const messageContainer = document.createElement('div');
  messageContainer.className = 'ms-3';

  const messageText = document.createElement('p');
  messageText.id = 'hs-toast-stack-toggle-update-label';
  messageText.className = 'text-sm text-gray-700';
  messageText.textContent = message;

  iconContainer.appendChild(icon);
  messageContainer.appendChild(messageText);
  alertContent.appendChild(iconContainer);
  alertContent.appendChild(messageContainer);
  alert.appendChild(alertContent);

  document.body.appendChild(alert);

  requestAnimationFrame(() => {
    alert.classList.remove('translate-x-full');
  });

  setTimeout(() => {
    alert.classList.add('translate-x-full');
    setTimeout(() => {
      alert.remove();
    }, 300);
  }, 3000);
}
