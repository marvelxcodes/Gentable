import { CanvasTableCard, SidebarTableCard } from './elements.js';
import { updateTransform, returnInRange } from './util.js';
import tablesDefault from './data.js';
import { getTables } from './share.js';
/*
    Schema:

    Table: {
        id: string
        name: string
        x: number
        y: number
        fields: Field[]
    }

    Field: {
        id: string
        name: string
        value: (boolean | number | string | enum)
        type: ( Relation | Values )
        relation?: {
            table: string
            field: string
        }
    }
*/

let tables = [];
const params = new URLSearchParams(location.pathname.search);
const id = params.get('id');
if (id) {
  try {
    tables = await getTables(id);
    localStorage.setItem('tables', JSON.stringify(tables));
  } catch (error) {
    location.href = '/';
  }
} else if (localStorage.getItem('tables')) {
  tables = JSON.parse(localStorage.getItem('tables'));
} else {
  tables = tablesDefault;
  localStorage.setItem('tables', JSON.stringify(tables));
}

const canvas = document.getElementById('canvas');
const zoomInput = document.getElementById('zoomInput');
const tablesContainer = document.getElementById('tablesContainer');
const zoomIncrementButton = document.getElementById('zoomIncrement');
const zoomDecrementButton = document.getElementById('zoomDecrement');

function renderTables() {
  tables.forEach((table) => {
    const sidebarTableCard = SidebarTableCard(table);
    tablesContainer.appendChild(sidebarTableCard);

    const canvasTableCard = CanvasTableCard(table);
    canvas.appendChild(canvasTableCard);
  });
}

renderTables();

// Handles zooming in and out of the canvas
zoomInput.addEventListener('change', (event) => {
  event.preventDefault();
  const scale = returnInRange(event.target.value, 60, 200);

  event.target.value = scale;
  updateTransform(canvas, { scale: scale / 100 });
});

zoomIncrementButton.addEventListener('click', () => {
  if (zoomInput.value >= 200) return;
  zoomInput.value = parseInt(zoomInput.value) + 10;
  updateTransform(canvas, { scale: zoomInput.value / 100 });
});

zoomDecrementButton.addEventListener('click', () => {
  if (zoomInput.value <= 60) return;
  zoomInput.value = parseInt(zoomInput.value) - 10;
  updateTransform(canvas, { scale: zoomInput.value / 100 });
});

canvas.addEventListener('wheel', function (event) {
  event.preventDefault();
  const delta = Math.max(-1, Math.min(1, event.deltaY));

  // Does not allow zooming out more than 60% and zooming in more than 200%
  if (
    (zoomInput.value <= 60 && delta > 0) ||
    (zoomInput.value >= 200 && delta < 0)
  )
    return;
  zoomInput.value = parseInt(zoomInput.value) - delta;
  updateTransform(canvas, { scale: zoomInput.value / 100 });
});

canvas.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// Handles panning of the canvas and moving the tables
let isPanning = false;
let panStart = false;
let panOffset = { x: 0, y: 0 };
let draggedTableOffset = { x: 0, y: 0 };
let draggedTable = null;

document.addEventListener('pointerdown', (e) => {
  if (e.target.id === 'canvasBG') {
    isPanning = true;
    panStart = { x: e.clientX, y: e.clientY };
  } else if (e.target.closest('.table-header')) {
    const tableDiv = e.target.closest('.table');
    draggedTable = tables.find((table) => table.id === tableDiv.id);

    const scale = zoomInput.value / 100;
    draggedTableOffset.x = (e.clientX - panOffset.x) / scale - draggedTable.x;
    draggedTableOffset.y = (e.clientY - panOffset.y) / scale - draggedTable.y;
  }
});

document.addEventListener('pointermove', (e) => {
  if (draggedTable) {
    const scale = zoomInput.value / 100;
    draggedTable.x = (e.clientX - panOffset.x) / scale - draggedTableOffset.x;
    draggedTable.y = (e.clientY - panOffset.y) / scale - draggedTableOffset.y;

    const tableDiv = document.getElementById(draggedTable.id);
    if (tableDiv) {
      updateTransform(tableDiv, {
        translate: { x: draggedTable.x, y: draggedTable.y },
      });
    }
  } else if (isPanning) {
    const deltaX = e.clientX - panStart.x;
    const deltaY = e.clientY - panStart.y;
    panOffset.x += deltaX;
    panOffset.y += deltaY;

    updateTransform(canvas, { translate: panOffset });
    panStart = { x: e.clientX, y: e.clientY };
  }
});

document.addEventListener('pointerup', (e) => {
  localStorage.setItem('tables', JSON.stringify(tables));
  draggedTable = null;
  if (isPanning) {
    isPanning = false;
  }
});

// Handles touch events for mobile compatibility
canvas.addEventListener('touchstart', (e) => {
  if (e.target.id === 'canvasBG') {
    isPanning = true;
    const touch = e.touches[0];
    panStart = { x: touch.clientX, y: touch.clientY };
  } else if (e.target.closest('.table-header')) {
    const tableDiv = e.target.closest('.table');
    draggedTable = tables.find((table) => table.id === tableDiv.id);

    const scale = zoomInput.value / 100;
    const touch = e.touches[0];
    draggedTableOffset.x = (touch.clientX - panOffset.x) / scale - draggedTable.x;
    draggedTableOffset.y = (touch.clientY - panOffset.y) / scale - draggedTable.y;
  }
});

canvas.addEventListener('touchmove', (e) => {
  if (draggedTable) {
    const scale = zoomInput.value / 100;
    const touch = e.touches[0];
    draggedTable.x = (touch.clientX - panOffset.x) / scale - draggedTableOffset.x;
    draggedTable.y = (touch.clientY - panOffset.y) / scale - draggedTableOffset.y;

    const tableDiv = document.getElementById(draggedTable.id);
    if (tableDiv) {
      updateTransform(tableDiv, {
        translate: { x: draggedTable.x, y: draggedTable.y },
      });
    }
  } else if (isPanning) {
    const touch = e.touches[0];
    const deltaX = touch.clientX - panStart.x;
    const deltaY = touch.clientY - panStart.y;
    panOffset.x += deltaX;
    panOffset.y += deltaY;

    updateTransform(canvas, { translate: panOffset });
    panStart = { x: touch.clientX, y: touch.clientY };
  }
});

canvas.addEventListener('touchend', (e) => {
  if (draggedTable) {
    draggedTable = null;
  } else if (isPanning) {
    isPanning = false;
  }
});

// Handles the creation of a new table
const createTableButton = document.getElementById('createTableButton');
createTableButton.addEventListener('click', () => {
  const table = {
    id: `table-${Math.random().toString(36).slice(2, 9)}`,
    name: 'New Table',
    x: 100,
    y: 100,
    fields: [
      {
        id: 'field-0',
        name: 'id',
        value: 'varchar',
        type: 'Values',
      },
    ],
  };

  tables.push(table);

  const sidebarTableCard = SidebarTableCard(table);
  tablesContainer.appendChild(sidebarTableCard);

  const canvasTableCard = CanvasTableCard(table);
  canvas.appendChild(canvasTableCard);
});

export function addFieldToTable(tableId, field) {
  const table = tables.find((t) => t.id === tableId);
  if (table) {
    table.fields.push(field);
    localStorage.setItem('tables', JSON.stringify(tables));

    const tableDiv = document.getElementById(tableId);
    const innerPadding = tableDiv.querySelector('.py-2.flex-1.flex.flex-col');

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
  }
}
