import { showAlert } from './elements.js';
import { generateUrl } from './share.js';
import {
  generateSchema,
  generatePrismaSchema,
  generateSQLQuery,
} from './ai.js';

const modalBackdrop = document.querySelector('#promptModal');
const sidebarToggle = document.querySelector('#sidebarToggle');
const shareSchemaButton = document.querySelector('#shareSchema');
const copySQLQueryButton = document.querySelector('#copySQLQuery');
const generateSchemaButton = document.querySelector('#generateSchema');
const promptModalContent = document.querySelector('#promptModalContent');
const copyPrismaSchemaButton = document.querySelector('#copyPrismaSchema');

sidebarToggle.addEventListener('click', () => {
  const sidebarIcon = sidebarToggle.querySelector('img');
  const sidebar = document.querySelector('aside');

  sidebar.classList.toggle('-translate-x-full');
  sidebarIcon.style.rotate = sidebar.classList.contains('-translate-x-full')
    ? '0deg'
    : '180deg';
});

shareSchemaButton.addEventListener('click', async () => {
  shareSchemaButton.disabled = true;
  const prevInnerHTML = shareSchemaButton.innerHTML;
  shareSchemaButton.innerHTML = 'Generating URL...';

  const url = await generateUrl(localStorage.getItem('tables'));
  navigator.clipboard.writeText(url);
  showAlert('Schema URL copied to clipboard');

  shareSchemaButton.innerHTML = prevInnerHTML;
  shareSchemaButton.disabled = false;
});

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
  generateSchemaButton.innerHTML = 'Generating...';
  modalBackdrop.style.display = 'none';
  const form = new FormData(e.target);
  const app_description = form.get('appDescription');

  const data = await generateSchema(app_description);
  localStorage.setItem('tables', JSON.stringify(data));
  window.location.reload();
});

copySQLQueryButton.addEventListener('click', async () => {
  copySQLQueryButton.disabled = true;
  const initialInnerHTML = copySQLQueryButton.innerHTML;
  copySQLQueryButton.innerHTML = 'Generating...';

  await generateSQLQuery(localStorage.getItem('tables'));
  showAlert('SQL Query Downloaded');

  copySQLQueryButton.innerHTML = initialInnerHTML;
  copySQLQueryButton.disabled = false;
});

copyPrismaSchemaButton.addEventListener('click', async () => {
  copyPrismaSchemaButton.disabled = true;
  const initialInnerHTML = copyPrismaSchemaButton.innerHTML;
  copyPrismaSchemaButton.innerHTML = 'Generating...';

  await generatePrismaSchema(localStorage.getItem('tables'));
  showAlert('Prisma schema Downloaded');

  copyPrismaSchemaButton.innerHTML = initialInnerHTML;
  copyPrismaSchemaButton.disabled = false;
});
