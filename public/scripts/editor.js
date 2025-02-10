import { CanvasTableCard, SidebarTableCard } from './elements.js';
import { updateTransform, returnInRange } from './util.js';
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

const canvas = document.getElementById('canvas');
const zoomInput = document.getElementById('zoomInput');
const tablesContainer = document.getElementById('tablesContainer');
const zoomIncrementButton = document.getElementById('zoomIncrement');
const zoomDecrementButton = document.getElementById('zoomDecrement');

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

canvas.addEventListener('mousedown', (e) => {
  if (e.target.id === 'canvasBG') {
    isPanning = true;
    panStart = { x: e.clientX, y: e.clientY };
  } else if (e.target.closest('.table-header')) {
    const tableDiv = e.target.closest('.table');
    draggedTable = tables.find((table) => table.id === tableDiv.id);

    const scale = zoomInput.value / 100;
    draggedTableOffset.x = ((e.clientX - panOffset.x) / scale - draggedTable.x);
    draggedTableOffset.y = ((e.clientY - panOffset.y) / scale - draggedTable.y);
  }
});

document.addEventListener('mousemove', (e) => {
  if (draggedTable) {
    const scale = zoomInput.value / 100;
    draggedTable.x = (e.clientX - panOffset.x) / scale - draggedTableOffset.x;
    draggedTable.y = (e.clientY - panOffset.y) / scale - draggedTableOffset.y;

    const tableDiv = e.target.closest('.table');
    if (tableDiv) {
      updateTransform(tableDiv, {
        translate: { x: draggedTable.x, y: draggedTable.y },
      });
    }
  }
  if (e.target.id === 'canvasBG' && isPanning) {
    const deltaX = e.clientX - panStart.x;
    const deltaY = e.clientY - panStart.y;
    panOffset.x += deltaX;
    panOffset.y += deltaY;

    updateTransform(canvas, { translate: panOffset });
    panStart = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener('mouseup', (e) => {
  draggedTable = null;
  if (e.target.id === 'canvasBG' && isPanning) {
    isPanning = false;
  }
});

// Handles the creation of a new table
const createTableButton = document.getElementById('createTableButton');

createTableButton.addEventListener('click', () => {
  const table = {
    id: `table-${tables.length}`,
    name: 'New Table',
    x: 100,
    y: 100,
    fields: [
      {
        id: 'field-0',
        name: 'id',
        value: 'boolean',
        type: 'Values',
      },
    ],
  };

  tables.push(table);

  const sidebarTableCard = SidebarTableCard(table);
  tablesContainer.appendChild(sidebarTableCard);

  const canvasTableCard = CanvasTableCard(table);
  canvas.appendChild(canvasTableCard);
  createCanvasTable(table);
});
