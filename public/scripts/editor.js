import { updateTransform, returnInRange } from './util.js'
/*
    Schema:

    Values: (boolean | number | string | enum)

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
        type: ( Relation | Values )
        value: Values
        relation?: {
            table: string
            field: string
        }
    }
*/

let tables = [];

const canvas = document.getElementById('canvas');
const zoomInput = document.getElementById('zoomInput');
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
let selectedTableOffset = { x: 0, y: 0 };

canvas.addEventListener('mousedown', (e) => {
  if (e.target.id !== 'canvasBG') {
    console.log(e.target)
  } else {
    isPanning = true;
    panStart = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (e.target.id !== 'canvasBG') {
  } else if (isPanning) {
    console.log(e.target.id);
    const deltaX = e.clientX - panStart.x;
    const deltaY = e.clientY - panStart.y;
    panOffset.x += deltaX;
    panOffset.y += deltaY;

    updateTransform(canvas, { translate: panOffset });
    panStart = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener('mouseup', (e) => {
  if(e.target.id !== 'canvasBG') {
    
  } else if (isPanning) {
    isPanning = false;
  }
});


// Handles the creation of a new table
const createTableButton = document.getElementById('createTableButton');

