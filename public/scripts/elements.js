import { updateTransform } from './util.js';

export function CanvasTableCard(table) {
  const card = document.createElement('div');
  card.id = table.id;
  card.className =
    'bg-white table h-96 overflow-hidden select-none shadow-xl w-80 flex flex-col rounded-lg z-30 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2';

  updateTransform(card, { translate: { x: table.x, y: table.y } });
  const accentBar = document.createElement('div');
  accentBar.className = 'pt-2 bg-accent';

  const header = document.createElement('div');
  header.className =
    'table-header bg-neutral-100 select-none text-neutral-600 text-center border-b border-neutral-300 py-3 text-xl font-bold';
  header.textContent = 'User';

  const body = document.createElement('div');
  body.className = 'bg-white flex h-full flex-1 cursor-default';

  const innerPadding = document.createElement('div');
  innerPadding.className = 'py-2 flex-1 flex flex-col';

  table.fields.forEach((field) => {
    const fieldElement = document.createElement('div');
    fieldElement.className = 'flex items-center px-4 py-2';

    const fieldLabel = document.createElement('span');
    fieldLabel.className = 'text-neutral-600 flex-1';
    fieldLabel.textContent = field.name;

    const fieldValue = document.createElement('span');
    fieldValue.className = 'text-neutral-600 flex-1 text-right';
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

export function SidebarTableCard() {
    const card = document.createElement("div");
    card.className = " h-max bg-white mx-2 rounded-lg";

    const header = document.createElement("div");
    header.className = "border-b-1 bg-neutral-100 rounded-lg border-neutral-200";
    
    const titleInput = document.createElement("input");
    titleInput.className = "p-3 w-full text-center text-accent font-medium tracking-wide";
    titleInput.value = "Hello";
    
    header.appendChild(titleInput);

    const content = document.createElement("div");
    content.className = "flex flex-col px-2 py-2 divide-purple-400 gap-y-1 text-white rounded";

    const row = document.createElement("div");
    row.className = "grid grid-cols-6 text-sm items-center gap-x-2";

    const idContainer = document.createElement("div");
    idContainer.className = "bg-white rounded-sm col-span-3 p-2 border border-neutral-200";
    
    const idInput = document.createElement("input");
    idInput.className = "text-neutral-500";
    idInput.value = "id";
    
    idContainer.appendChild(idInput);

    const typeContainer = document.createElement("div");
    typeContainer.className = "bg-white rounded-sm p-2 col-span-2 border border-neutral-200";
    
    const typeInput = document.createElement("input");
    typeInput.className = "text-neutral-500 w-full";
    typeInput.value = "string";
    
    typeContainer.appendChild(typeInput);

    const deleteButton = document.createElement("div");
    deleteButton.className = "col-span-1 flex items-center justify-center group transition-colors hover:bg-accent border h-full text-neutral-600 rounded-sm bg-neutral-100 border-neutral-200 cursor-pointer";

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "heroicon heroicon-trash text-xl group-hover:text-white";

    deleteButton.appendChild(deleteIcon);

    row.appendChild(idContainer);
    row.appendChild(typeContainer);
    row.appendChild(deleteButton);
    content.appendChild(row);

    const footer = document.createElement("div");
    footer.className = "flex px-2 rounded-lg gap-x-2 border-t py-2 bg-neutral-100 border-neutral-200";

    const deleteTableButton = document.createElement("button");
    deleteTableButton.className = "text-sm bg-white cursor-pointer hover:bg-neutral-200 border px-2 py-0.5 rounded-md shadow text-neutral-500 border-neutral-300 flex-1";
    deleteTableButton.textContent = "Delete Table";

    const addColumnButton = document.createElement("button");
    addColumnButton.className = "text-sm bg-accent cursor-pointer hover:bg-purple-700 border px-2 py-0.5 rounded-md shadow text-white border-accent flex-1";
    addColumnButton.textContent = "Add Column";

    footer.appendChild(deleteTableButton);
    footer.appendChild(addColumnButton);

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);

    return card;
}