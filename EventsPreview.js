import { eventsData } from '../../data/events.js';
import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard } from '../common/Card.js';
import { createButton } from '../common/Button.js';
import { createModal } from '../common/Modal.js';

export function renderEventsPreview(onNavigate) {
  const section = document.createElement('section');
  section.className = 'events-preview-section';
  section.id = 'events';
  section.style.padding = '6rem 0';
  section.style.background = 'rgba(15, 23, 42, 0.4)';
  section.style.borderTop = '1px solid var(--border-color)';
  section.style.borderBottom = '1px solid var(--border-color)';

  const container = document.createElement('div');
  container.className = 'container';

  const headerBtn = createButton({
    variant: 'secondary',
    size: 'md',
    label: 'Barcha tadbirlar',
    icon: 'calendar',
    onClick: () => onNavigate && onNavigate('events'),
  });

  const header = createSectionHeader({
    eyebrow: 'TADBIRLAR TAQVIMI',
    title: 'Bo\'lajak Hackathon va Seminarlar',
    description: 'Akademiyamizda o\'tkaziladigan amaliy hackathonlar, master-klasslar va vebinarlarda ishtirok eting.',
    align: 'left',
    action: headerBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  grid.style.gap = '1.75rem';

  eventsData.forEach(event => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span class="badge badge-${event.badgeVariant}">${event.status}</span>
            <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600;">
              ${event.date}
            </span>
          </div>

          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); line-height: 1.35;">
            ${event.title}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="clock" size="14" style="color: var(--accent-cyan);"></i>
              <span>Vaqti: ${event.time}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="map-pin" size="14" style="color: var(--accent-cyan);"></i>
              <span>Manzil: ${event.location}</span>
            </div>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            ${event.description}
          </p>

          <div id="eventRegisterSlot-${event.id}" style="margin-top: 0.5rem;"></div>
        </div>
      `,
    });

    const registerSlot = card.querySelector(`#eventRegisterSlot-${event.id}`);
    const regBtn = createButton({
      variant: 'primary',
      size: 'sm',
      label: 'Ishtirok etish',
      icon: 'user-plus',
      onClick: () => {
        const modal = createModal({
          title: `Tadbirga ro'yxatdan o'tish: ${event.title}`,
          size: 'sm',
          content: `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <p style="font-size: 0.9rem; color: var(--text-secondary);">Ishtirokingizni tasdiqlash uchun ma'lumotlarni kiriting:</p>
              <input type="text" placeholder="Ismingiz va familiyangiz" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #fff;" />
              <input type="email" placeholder="Email manzilingiz" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #fff;" />
            </div>
          `,
          footer: createButton({
            variant: 'primary',
            label: 'Yuborish',
            onClick: () => {
              alert('Ro\'yxatdan o\'tishingiz qabul qilindi!');
              modal.close();
            },
          }),
        });
        modal.open();
      },
    });

    registerSlot.appendChild(regBtn);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}
