import { createSectionHeader } from '../common/SectionHeader.js';
import { createCard } from '../common/Card.js';
import { createButton } from '../common/Button.js';
import { createModal } from '../common/Modal.js';

export function renderFeaturedMedia(onNavigate) {
  const section = document.createElement('section');
  section.className = 'featured-media-section';
  section.id = 'media';
  section.style.padding = '6rem 0';

  const container = document.createElement('div');
  container.className = 'container';

  const headerBtn = createButton({
    variant: 'secondary',
    size: 'md',
    label: 'Media galereya',
    icon: 'film',
    onClick: () => onNavigate && onNavigate('media'),
  });

  const header = createSectionHeader({
    eyebrow: 'MULTIMEDIA CENTER',
    title: 'Video ma\'ruzalar va foto galereya',
    description: 'Sun\'iy intellekt bo\'yicha amaliy video darslar, tadbirlar videosi va akademiya hayotidan tayyorlangan foto jamlanmalar.',
    align: 'left',
    action: headerBtn,
    gradientTitle: true,
  });

  container.appendChild(header);

  // Two column media layout (Left: Main Featured Video, Right: 2 Smaller items)
  const mediaGrid = document.createElement('div');
  mediaGrid.style.display = 'grid';
  mediaGrid.style.gridTemplateColumns = '1fr';
  mediaGrid.style.gap = '1.75rem';

  const mediaQueryMatch = window.matchMedia('(min-width: 1024px)');
  if (mediaQueryMatch.matches) {
    mediaGrid.style.gridTemplateColumns = '1.3fr 0.7fr';
  }

  // Left Featured Item
  const featuredCard = createCard({
    variant: 'interactive',
    padding: 'none',
    onClick: () => openMediaModal('Sun\'iy Intellekt va Neyron Tarmoqlar Asoslari', '45:00 min', 'Video Ma\'ruza'),
    children: `
      <div style="position: relative; height: 320px; background: linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.3) 100%); display: flex; align-items: center; justify-content: center;">
        <div style="
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--accent-cyan);
          color: #040810;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px var(--accent-cyan);
          transition: transform var(--transition-fast);
        " class="play-icon-box">
          <i data-lucide="play" size="32" style="margin-left: 4px;"></i>
        </div>
        <span class="badge badge-cyan" style="position: absolute; top: 1.25rem; left: 1.25rem;">Tanlangan Video</span>
        <span style="position: absolute; bottom: 1.25rem; right: 1.25rem; background: rgba(0,0,0,0.7); padding: 0.3rem 0.7rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-family: var(--font-mono);">45:00</span>
      </div>
      <div style="padding: 1.5rem;">
        <div style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.4rem;">MA'RUZA #01</div>
        <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">Sun'iy Intellekt va Neyron Tarmoqlar Asoslari</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">Neyron tarmoqlarning matematik modeli, kirish qatlamlari hamda kompyuterda ma'lumotlarni tahlil qilish prinsiplari haqida chuqur darslik.</p>
      </div>
    `,
  });

  // Right Side Stacked Items
  const rightCol = document.createElement('div');
  rightCol.style.display = 'flex';
  rightCol.style.flexDirection = 'column';
  rightCol.style.gap = '1.75rem';

  const item1 = createCard({
    variant: 'interactive',
    padding: 'none',
    onClick: () => openMediaModal('Generativ AI va Prompt Engineering Master-Klass', '28:15 min', 'Master-Klass'),
    children: `
      <div style="display: grid; grid-template-columns: 140px 1fr; align-items: center;">
        <div style="height: 120px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.3) 100%); display: flex; align-items: center; justify-content: center; position: relative;">
          <i data-lucide="play-circle" size="36" style="color: var(--accent-cyan);"></i>
        </div>
        <div style="padding: 1rem 1.25rem;">
          <span class="badge badge-violet" style="margin-bottom: 0.4rem;">Master-klass</span>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.3rem;">Generativ AI va Prompting</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Davomiyligi: 28:15 min</span>
        </div>
      </div>
    `,
  });

  const item2 = createCard({
    variant: 'interactive',
    padding: 'none',
    onClick: () => openMediaModal('UZXIAtreatr AI Hackathon 2026 Fotoreportaj', '18 fotosurat', 'Fotogalereya'),
    children: `
      <div style="display: grid; grid-template-columns: 140px 1fr; align-items: center;">
        <div style="height: 120px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 240, 255, 0.3) 100%); display: flex; align-items: center; justify-content: center;">
          <i data-lucide="image" size="36" style="color: var(--accent-emerald);"></i>
        </div>
        <div style="padding: 1rem 1.25rem;">
          <span class="badge badge-emerald" style="margin-bottom: 0.4rem;">Fotoreportaj</span>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.3rem;">AI Hackathon 2026 Galereya</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">18 ta saralangan surat</span>
        </div>
      </div>
    `,
  });

  rightCol.appendChild(item1);
  rightCol.appendChild(item2);

  mediaGrid.appendChild(featuredCard);
  mediaGrid.appendChild(rightCol);
  container.appendChild(mediaGrid);
  section.appendChild(container);

  function openMediaModal(title, info, category) {
    const modal = createModal({
      title: `${category}: ${title}`,
      size: 'lg',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="width: 100%; height: 340px; background: #000; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-highlight); position: relative;">
            <i data-lucide="video" size="48" style="color: var(--accent-cyan); margin-bottom: 0.8rem;"></i>
            <h4 style="color: var(--text-primary); font-size: 1.1rem;">${title}</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Demo video pleer placeholder (Media stream ready)</p>
          </div>
          <div>
            <div style="font-size: 0.9rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">${info}</div>
            <p style="color: var(--text-secondary); line-height: 1.6;">Ushbu o'quv multimedia materiali UZXIAtreatr akademiyasining rasmiy mediatékasida saqlanadi.</p>
          </div>
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
