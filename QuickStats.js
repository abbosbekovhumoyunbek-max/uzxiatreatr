import { statsData } from '../../data/stats.js';
import { createCard } from '../common/Card.js';

export function renderQuickStats() {
  const section = document.createElement('section');
  section.className = 'quick-stats-section';
  section.style.padding = '3rem 0';
  section.style.background = 'rgba(15, 23, 42, 0.4)';
  section.style.borderTop = '1px solid var(--border-color)';
  section.style.borderBottom = '1px solid var(--border-color)';

  const container = document.createElement('div');
  container.className = 'container';

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  grid.style.gap = '1.5rem';

  statsData.forEach(item => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="
            width: 48px;
            height: 48px;
            border-radius: var(--radius-md);
            background: rgba(0, 240, 255, 0.1);
            border: 1px solid rgba(0, 240, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-cyan);
            flex-shrink: 0;
          ">
            <i data-lucide="${item.icon}"></i>
          </div>
          <div>
            <div style="
              font-family: var(--font-display);
              font-weight: 800;
              font-size: 2.2rem;
              line-height: 1;
              color: var(--text-primary);
              margin-bottom: 0.3rem;
            " class="text-gradient">
              ${item.value}
            </div>
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">
              ${item.label}
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
              ${item.description}
            </p>
          </div>
        </div>
      `,
    });
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}
