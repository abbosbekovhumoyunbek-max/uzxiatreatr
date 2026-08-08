import { factsData } from '../../data/facts.js';
import { createButton } from '../common/Button.js';
import { createCard } from '../common/Card.js';
import { showToast } from '../common/Toast.js';

export function renderDailyFact(options = {}) {
  const { initialCategory = 'Barchasi' } = options;

  const cardWrapper = createCard({
    variant: 'featured',
    padding: 'lg',
  });

  cardWrapper.style.position = 'relative';

  let currentCategory = initialCategory;
  let availableFacts = factsData;
  let currentIndex = 0;

  function filterFacts() {
    if (currentCategory === 'Barchasi') {
      availableFacts = factsData;
    } else {
      availableFacts = factsData.filter(f => f.category === currentCategory);
      if (availableFacts.length === 0) availableFacts = factsData;
    }
  }

  filterFacts();

  function renderFact(index) {
    const fact = availableFacts[index % availableFacts.length];

    cardWrapper.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;" id="dailyFactInner">
        <!-- Header & Category Select -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-cyan">💡 KUN FAKTI</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">Kategoriya:</span>
            <select id="factCategorySelect" style="
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--border-color);
              border-radius: var(--radius-sm);
              color: var(--accent-cyan);
              padding: 0.25rem 0.6rem;
              font-size: 0.85rem;
              outline: none;
              cursor: pointer;
            ">
              ${['Barchasi', 'AI', 'Robotics', 'Programming', 'Space', 'Science', 'Cybersecurity'].map(cat => `
                <option value="${cat}" ${cat === currentCategory ? 'selected' : ''} style="background: #0f172a; color: #fff;">${cat}</option>
              `).join('')}
            </select>
          </div>

          <span style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
            #${fact.id} / ${availableFacts.length}
          </span>
        </div>

        <!-- Fact Title & Body -->
        <h2 style="font-size: clamp(1.4rem, 3.5vw, 2.1rem); font-weight: 700; line-height: 1.3;" class="text-gradient">
          "${fact.title}"
        </h2>

        <p style="font-size: 1.1rem; color: var(--text-primary); line-height: 1.7; font-weight: 400; max-width: 900px;">
          ${fact.fact}
        </p>

        <!-- Actions Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 1rem;">
          <span style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="clock" size="16"></i> Mutolaa: ${fact.readTime}
          </span>

          <div style="display: flex; gap: 0.75rem;">
            <div id="copyFactBtnSlot"></div>
            <div id="nextFactBtnSlot"></div>
          </div>
        </div>
      </div>
    `;

    const catSelect = cardWrapper.querySelector('#factCategorySelect');
    catSelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      filterFacts();
      currentIndex = 0;
      renderFact(currentIndex);
    });

    const copySlot = cardWrapper.querySelector('#copyFactBtnSlot');
    const nextSlot = cardWrapper.querySelector('#nextFactBtnSlot');

    const copyBtn = createButton({
      variant: 'secondary',
      size: 'sm',
      label: 'Nusxalash',
      icon: 'copy',
      onClick: () => {
        const textToCopy = `[UZXIAtreatr AI Fact] ${fact.title}: ${fact.fact}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Fakt buferga nusxalandi!', 'success');
          }).catch(() => {
            showToast('Nusxalashda xatolik yuz berdi.', 'warning');
          });
        } else {
          showToast('Bufer nusxalash ushbu brauzerda qo\'llab-quvvatlanmaydi.', 'info');
        }
      },
    });

    const nextBtn = createButton({
      variant: 'primary',
      size: 'sm',
      label: 'Yangi fakt',
      icon: 'rotate-cw',
      onClick: () => {
        const inner = cardWrapper.querySelector('#dailyFactInner');
        if (inner) {
          inner.style.opacity = '0';
          inner.style.transform = 'translateY(8px)';
        }
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % availableFacts.length;
          renderFact(currentIndex);
        }, 180);
      },
    });

    copySlot.appendChild(copyBtn);
    nextSlot.appendChild(nextBtn);

    if (window.lucide) window.lucide.createIcons();
  }

  renderFact(currentIndex);
  return cardWrapper;
}
