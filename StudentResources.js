import { resourcesData } from '../../data/resources.js';
import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard } from '../common/Card.js';
import { createButton } from '../common/Button.js';

export function renderStudentResources(onNavigate) {
  const section = document.createElement('section');
  section.className = 'student-resources-section';
  section.id = 'students';
  section.style.padding = '6rem 0';

  const container = document.createElement('div');
  container.className = 'container';

  const headerBtn = createButton({
    variant: 'secondary',
    size: 'md',
    label: 'Barcha resurslar',
    icon: 'folder-open',
    onClick: () => onNavigate && onNavigate('students'),
  });

  const header = createSectionHeader({
    eyebrow: 'TALABALAR UCHUN',
    title: 'Foydali Ta\'lim Resurslari Markazi',
    description: 'Dasturlash, sun\'iy intellekt, ingliz tili hamda kiberxavfsizlik bo\'yicha sara adabiyotlar va bepul vositalar to\'plami.',
    align: 'left',
    action: headerBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = '1.75rem';

  resourcesData.forEach(res => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="badge badge-cyan">${res.category}</span>
            <div style="
              width: 36px;
              height: 36px;
              border-radius: var(--radius-sm);
              background: rgba(0, 240, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accent-cyan);
            ">
              <i data-lucide="${res.icon}" size="18"></i>
            </div>
          </div>

          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">
            ${res.title}
          </h3>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">
            ${res.description}
          </p>

          <div id="resBtnSlot-${res.id}" style="padding-top: 0.8rem; border-top: 1px solid var(--border-color);"></div>
        </div>
      `,
    });

    const slot = card.querySelector(`#resBtnSlot-${res.id}`);
    const actionBtn = createButton({
      variant: 'ghost',
      size: 'sm',
      label: res.linkText,
      icon: 'external-link',
      iconPosition: 'right',
      onClick: () => onNavigate && onNavigate('students'),
    });

    slot.appendChild(actionBtn);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}
