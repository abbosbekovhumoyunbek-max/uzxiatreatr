import { createButton } from './Button.js';

export function createPageHero(options = {}) {
  const {
    eyebrow = '',
    title = '',
    description = '',
    breadcrumb = '',
    badgeVariant = 'cyan',
    actions = null,
  } = options;

  const section = document.createElement('section');
  section.className = 'page-hero-section';
  section.style.padding = '3.5rem 0 2.5rem 0';
  section.style.borderBottom = '1px solid var(--border-color)';
  section.style.background = 'radial-gradient(ellipse at top center, rgba(15, 23, 42, 0.8) 0%, rgba(8, 12, 20, 1) 100%)';

  const container = document.createElement('div');
  container.className = 'container';

  let breadcrumbHTML = '';
  if (breadcrumb) {
    breadcrumbHTML = `
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <a href="#home" style="color: var(--text-secondary);">Bosh sahifa</a>
        <span>/</span>
        <span style="color: var(--accent-cyan); font-weight: 500;">${breadcrumb}</span>
      </div>
    `;
  }

  let eyebrowHTML = '';
  if (eyebrow) {
    eyebrowHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="badge badge-${badgeVariant}">
          <i data-lucide="sparkles" size="14"></i>
          <span>${eyebrow}</span>
        </span>
      </div>
    `;
  }

  const titleHTML = title ? `<h1 class="text-gradient" style="font-size: clamp(2.2rem, 4.5vw, 3.4rem); font-weight: 800; margin-bottom: 1rem; line-height: 1.15;">${title}</h1>` : '';
  const descHTML = description ? `<p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 760px; line-height: 1.6; margin-bottom: 1.5rem;">${description}</p>` : '';

  const heroBox = document.createElement('div');
  heroBox.innerHTML = `${breadcrumbHTML}${eyebrowHTML}${titleHTML}${descHTML}`;

  if (actions && Array.isArray(actions)) {
    const actionsWrapper = document.createElement('div');
    actionsWrapper.style.display = 'flex';
    actionsWrapper.style.gap = '1rem';
    actionsWrapper.style.flexWrap = 'wrap';

    actions.forEach(act => {
      const btn = createButton(act);
      actionsWrapper.appendChild(btn);
    });

    heroBox.appendChild(actionsWrapper);
  }

  container.appendChild(heroBox);
  section.appendChild(container);
  return section;
}
