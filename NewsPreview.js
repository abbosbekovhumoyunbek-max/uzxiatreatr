import { newsData } from '../../data/news.js';
import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from '../common/Card.js';
import { createButton } from '../common/Button.js';
import { createModal } from '../common/Modal.js';

export function renderNewsPreview(onNavigate) {
  const section = document.createElement('section');
  section.className = 'news-preview-section';
  section.id = 'news';
  section.style.padding = '6rem 0';

  const container = document.createElement('div');
  container.className = 'container';

  const headerBtn = createButton({
    variant: 'secondary',
    size: 'md',
    label: 'Barcha yangiliklar',
    icon: 'newspaper',
    onClick: () => onNavigate && onNavigate('news'),
  });

  const header = createSectionHeader({
    eyebrow: 'AKADEMIYA HAYOTI',
    title: 'Eng So\'nggi Yangiliklar va Xabarlar',
    description: 'UZXIAtreatr akademiyasidagi ta\'lim jarayonlari, ilmiy izlanishlar va muhim hodisalar sharhi.',
    align: 'left',
    action: headerBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = '1.75rem';

  newsData.slice(0, 3).forEach(news => {
    const card = createCard({
      variant: 'interactive',
      padding: 'none',
      onClick: () => openNewsModal(news),
      children: `
        <div style="height: 160px; background: ${news.imageBg}; position: relative; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
          <span class="badge badge-cyan" style="align-self: flex-start;">${news.category}</span>
          <span style="font-size: 0.8rem; color: var(--text-primary); font-family: var(--font-mono); background: rgba(0,0,0,0.6); padding: 0.25rem 0.6rem; border-radius: var(--radius-xs); align-self: flex-end;">
            ${news.date}
          </span>
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; flex: 1;">
          <h3 style="font-size: 1.15rem; font-weight: 700; line-height: 1.35; color: var(--text-primary);">
            ${news.title}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            ${news.excerpt}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.8rem; border-top: 1px solid var(--border-color);">
            <span style="font-size: 0.8rem; color: var(--text-muted);">${news.readTime} o'qish</span>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-cyan); display: flex; align-items: center; gap: 0.3rem;">
              Batafsil <i data-lucide="arrow-right" size="14"></i>
            </span>
          </div>
        </div>
      `,
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  function openNewsModal(item) {
    const modal = createModal({
      title: item.title,
      size: 'md',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; gap: 1rem; align-items: center; font-size: 0.85rem; color: var(--text-secondary);">
            <span class="badge badge-cyan">${item.category}</span>
            <span><i data-lucide="calendar" size="14"></i> ${item.date}</span>
          </div>
          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary);">
            ${item.content}
          </p>
        </div>
      `,
      footer: createButton({
        variant: 'secondary',
        label: 'Yopish',
        onClick: () => modal.close(),
      }),
    });
    modal.open();
  }

  return section;
}
