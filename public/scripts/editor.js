/*
    Schema:

    Values: (boolean | number | string | enum)

    Table: {
        id: string
        name: string
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

const canvas = document.getElementById('canvas');
const zoomInput = document.getElementById('zoomInput');
const zoomIncrementButton = document.getElementById('zoomIncrement');
const zoomDecrementButton = document.getElementById('zoomDecrement');

function returnInRange(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

zoomInput.addEventListener('change', (event) => {
  event.preventDefault();
  const scale = returnInRange(event.target.value, 60, 200);

  event.target.value = scale;
  canvas.style.transform = `scale(${scale / 100})`;
});

zoomIncrementButton.addEventListener('click', () => {
  if (zoomInput.value >= 200) return;
  zoomInput.value = parseInt(zoomInput.value) + 10;
  canvas.style.transform = `scale(${zoomInput.value / 100})`;
});

zoomDecrementButton.addEventListener('click', () => {
  if (zoomInput.value <= 60) return;
  zoomInput.value = parseInt(zoomInput.value) - 10;
  canvas.style.transform = `scale(${zoomInput.value / 100})`;
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
  canvas.style.transform = `scale(${zoomInput.value / 100})`;
});

canvas.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

canvas.addEventListener('mousedown', function (event) {
  if (event.target !== canvas) return;
  const container = canvas.parentElement; // Use the container that is scrollable
  let startX = event.clientX;
  let startY = event.clientY;
  const initialScrollLeft = container.scrollLeft;
  const initialScrollTop = container.scrollTop;

  const move = function (event) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    container.scrollLeft = initialScrollLeft - deltaX;
    container.scrollTop = initialScrollTop - deltaY;
  };

  const up = function () {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
});
