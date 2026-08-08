import { createPageHero } from '../components/common/PageHero.js';
import { eventsData } from '../data/events.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createModal } from '../components/common/Modal.js';

export function renderEventsPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'events-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'TADBIRLAR & HACKATHONLAR',
    title: 'Akademiya Tadbirlari va Master-Klasslar',
    description: 'AI Hackathonlar, ilmiy seminarlar, mahorat darslari va talabalar uchun o\'tkaziladigan tadbirlar.',
    breadcrumb: 'Tadbirlar',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  grid.style.gap = '1.75rem';

  eventsData.forEach(event => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge badge-${event.badgeVariant}">${event.status}</span>
            <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600;">${event.date}</span>
          </div>

          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${event.title}</h3>

          <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--text-secondary);">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="clock" size="16" style="color: var(--accent-cyan);"></i>
              <span>Vaqti: ${event.time}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="map-pin" size="16" style="color: var(--accent-cyan);"></i>
              <span>Manzil: ${event.location}</span>
            </div>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${event.description}</p>

          <div id="eventRegisterSlot-${event.id}" style="padding-top: 0.8rem; border-top: 1px solid var(--border-color);"></div>
        </div>
      `,
    });

    const slot = card.querySelector(`#eventRegisterSlot-${event.id}`);
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
              <p style="font-size: 0.9rem; color: var(--text-secondary);">Format: Demo ro'yxatdan o'tish oynasi.</p>
              <input type="text" placeholder="Ismingiz va familiyangiz" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #fff;" />
              <input type="email" placeholder="Email manzilingiz" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #fff;" />
            </div>
          `,
          footer: createButton({
            variant: 'primary',
            label: 'Yuborish',
            onClick: () => {
              alert('Ro\'yxatdan o\'tishingiz muvaffaqiyatli qabul qilindi!');
              modal.close();
            },
          }),
        });
        modal.open();
      },
    });

    slot.appendChild(regBtn);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  page.appendChild(container);
  return page;
}
