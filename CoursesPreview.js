import { coursesData } from '../../data/courses.js';
import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from '../common/Card.js';
import { createButton } from '../common/Button.js';

export function renderCoursesPreview(onNavigate) {
  const section = document.createElement('section');
  section.className = 'courses-preview-section';
  section.id = 'courses';
  section.style.padding = '6rem 0';
  section.style.background = 'rgba(15, 23, 42, 0.4)';
  section.style.borderTop = '1px solid var(--border-color)';
  section.style.borderBottom = '1px solid var(--border-color)';

  const container = document.createElement('div');
  container.className = 'container';

  const headerBtn = createButton({
    variant: 'outline',
    size: 'md',
    label: 'Barcha kurslar →',
    onClick: () => onNavigate && onNavigate('courses'),
  });

  const header = createSectionHeader({
    eyebrow: 'AMALIY KURSLAR',
    title: 'Dasturlash va Texnologiya Kurslari',
    description: 'Boshlang\'ich dasturlash asoslaridan tortib, kiberxavfsizlik va web dasturlashgacha bo\'lgan amaliy tayyorgarlik kurslari.',
    align: 'left',
    action: headerBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(270px, 1fr))';
  grid.style.gap = '1.75rem';

  const selectedCourses = coursesData.slice(2, 6);

  selectedCourses.forEach(course => {
    const cardHeader = createCardHeader({
      title: course.title,
      subtitle: course.category,
    });

    const cardBody = createCardBody({
      contentHTML: `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div style="
            width: 42px;
            height: 42px;
            border-radius: var(--radius-sm);
            background: rgba(0, 240, 255, 0.1);
            border: 1px solid rgba(0, 240, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-cyan);
          ">
            <i data-lucide="${course.icon}"></i>
          </div>
          <span class="badge badge-cyan">${course.badge}</span>
        </div>

        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.25rem;">
          ${course.description}
        </p>

        <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.8rem;">
          <span>Daraja: <strong style="color: var(--text-primary);">${course.level}</strong></span>
          <span>Darslar: <strong style="color: var(--text-primary);">${course.lessonsCount} ta</strong></span>
        </div>
      `,
    });

    const cardFooter = createCardFooter({});
    const applyBtn = createButton({
      variant: 'secondary',
      size: 'sm',
      label: 'Kurs ma\'lumotlari',
      icon: 'chevron-right',
      iconPosition: 'right',
      onClick: () => onNavigate && onNavigate('courses'),
    });

    cardFooter.appendChild(applyBtn);

    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: [cardHeader, cardBody, cardFooter],
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}
