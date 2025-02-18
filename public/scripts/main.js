import { generateSchema } from './ai.js';
const modalBackdrop = document.querySelector('#promptModal');
const generateSchemaButton = document.querySelector('#generateSchema');
const promptModalContent = document.querySelector('#promptModalContent');

generateSchemaButton.addEventListener('click', () => {
  modalBackdrop.style.display = 'flex';
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'promptModalContent') {
    e.stopPropagation();
  }
  if (e.target.id === 'promptModal') {
    modalBackdrop.style.display = 'none';
  }
});

promptModalContent.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const app_description = form.get('appDescription');

  const data = await generateSchema(app_description);
  localStorage.setItem('tables', JSON.stringify(data));
  window.location.reload();
});
