export function updateTransform(element, { translate, scale }) {
  // Get the current transform style
  let transform = element.style.transform;

  // Extract existing values
  let translateMatch = transform.match(/translate\(([^)]+)\)/);
  let scaleMatch = transform.match(/scale\(([^)]+)\)/);

  let translateValue = translateMatch ? translateMatch[1] : '0px, 0px';
  let scaleValue = scaleMatch ? scaleMatch[1] : '1';

  // If new translate is provided, update it
  if (translate) {
    translateValue = `${translate.x}px, ${translate.y}px`;
  }

  // If new scale is provided, update it
  if (scale !== undefined) {
    scaleValue = scale;
  }

  element.style.transform = `translate(${translateValue}) scale(${scaleValue})`;
}

export function returnInRange(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
