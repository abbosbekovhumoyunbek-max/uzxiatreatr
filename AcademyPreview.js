import { coursesData } from '../../data/courses.js';
import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from '../common/Card.js';
import { createButton } from '../common/Button.js';

export function renderAcademyPreview(onNavigate) {
  const section = document.createElement('section');
  section.className = 'academy-preview-section';
  section.id = 'academy';
  section.style.padding = '6rem 0';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header with action button
  const headerActionBtn = createButton({
    variant: 'secondary',
    size: 'md',
    label: 'Barcha modullar',
    icon: 'arrow-right',
    onClick: () => onNavigate && onNavigate('academy'),
  });

  const header = createSectionHeader({
    eyebrow: 'AI ACADEMY',
    title: 'Sun\'iy intellektni amaliy o\'rganing',
    description: 'Neyron tarmoqlar, yirik til modellari hamda amaliy prompt muhandisligidan mas\'uliyatli AI mezonlarigacha bo\'lgan chuqurlashtirilgan o\'quv modullari.',
    align: 'left',
    action: headerActionBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  // 4 AI Modules Grid
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(270px, 1fr))';
  grid.style.gap = '1.75rem';

  const previewCourses = coursesData.slice(0, 4);

  previewCourses.forEach(course => {
    const cardHeader = createCardHeader({
      title: course.title,
      subtitle: course.category,
      action: `<span class="badge badge-cyan">${course.badge}</span>`,
    });

    const cardBody = createCardBody({
      contentHTML: `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="
            width: 40px;
            height: 40px;
            border-radius: var(--radius-sm);
            background: rgba(139, 92, 246, 0.15);
            border: 1px solid rgba(139, 92, 246, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-violet);
          ">
            <i data-lucide="${course.icon}"></i>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            <div>Daraja: <strong style="color: var(--text-primary);">${course.level}</strong></div>
            <div>Davomiyligi: <strong style="color: var(--text-primary);">${course.duration}</strong></div>
          </div>
        </div>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
          ${course.description}
        </p>
      `,
    });

    const cardFooter = createCardFooter({});
    const startBtn = createButton({
      variant: 'ghost',
      size: 'sm',
      label: 'Darsni boshlash',
      icon: 'arrow-right',
      iconPosition: 'right',
      onClick: () => onNavigate && onNavigate('academy'),
    });

    cardFooter.appendChild(startBtn);

    const card = createCard({
      variant: 'interactive',
      padding: 'md',
      children: [cardHeader, cardBody, cardFooter],
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}
