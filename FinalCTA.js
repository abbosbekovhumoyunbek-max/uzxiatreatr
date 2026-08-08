import { createButton } from '../common/Button.js';
import { createCard } from '../common/Card.js';

export function renderFinalCTA(onNavigate) {
  const section = document.createElement('section');
  section.className = 'final-cta-section';
  section.id = 'cta';
  section.style.padding = '6rem 0 4rem 0';

  const container = document.createElement('div');
  container.className = 'container';

  const card = createCard({
    variant: 'featured',
    padding: 'lg',
  });

  card.style.textAlign = 'center';
  card.style.padding = '4.5rem 2rem';
  card.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(15, 23, 42, 0.95) 100%)';
  card.style.position = 'relative';

  card.innerHTML = `
    <div style="max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
      <div className="badge badge-cyan" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; font-size: 0.8rem; font-weight: 600; border-radius: 9999px; background: rgba(0, 240, 255, 0.1); color: var(--accent-cyan); border: 1px solid rgba(0, 240, 255, 0.3);">
        <i data-lucide="rocket" size="14"></i>
        <span>UZXIAtreatr • QO'SHILING</span>
      </div>

      <h2 style="font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 800; line-height: 1.2;" class="text-gradient">
        Kelajakni bugundan o'rganishni boshlang!
      </h2>

      <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.65; max-width: 660px;">
        Sun'iy intellekt, zamonaviy dasturlash va multimedia bilimlari sizni kutmoqda. Akademiyamiz hamjamiyatiga qo'shiling va o'z imkoniyatlaringizni oshiring.
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
        <div id="finalPrimaryCta"></div>
        <div id="finalSecondaryCta"></div>
      </div>
    </div>
  `;

  const primSlot = card.querySelector('#finalPrimaryCta');
  const secSlot = card.querySelector('#finalSecondaryCta');

  const primaryBtn = createButton({
    variant: 'primary',
    size: 'lg',
    label: 'AI Academy Kurslari',
    icon: 'sparkles',
    onClick: () => onNavigate && onNavigate('academy'),
  });

  const secondaryBtn = createButton({
    variant: 'secondary',
    size: 'lg',
    label: 'Resurslarni ko\'rish',
    icon: 'folder-open',
    onClick: () => onNavigate && onNavigate('students'),
  });

  primSlot.appendChild(primaryBtn);
  secSlot.appendChild(secondaryBtn);

  container.appendChild(card);
  section.appendChild(container);
  return section;
}
