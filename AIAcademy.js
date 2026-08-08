import { createPageHero } from '../components/common/PageHero.js';
import { aiModulesData } from '../data/aiModules.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createModal } from '../components/common/Modal.js';
import { createSectionHeader } from '../components/common/SectionHeader.js';
import { storage } from '../utils/storage.js';
import { showToast } from '../components/common/Toast.js';

export function renderAIAcademyPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'ai-academy-page';

  // Load local completed module IDs
  let completedModules = storage.get('completed_ai_modules', []);

  // Hero
  const hero = createPageHero({
    eyebrow: 'AI ACADEMY HUB',
    title: 'Sun\'iy intellektni noldan o\'rganing',
    description: 'Neyron tarmoqlar, kompyuterda ko\'rish, generativ modellar va prompt muhandisligi bo\'yicha amaliy va tizimli o\'quv platformasi.',
    breadcrumb: 'AI Akademiya',
    badgeVariant: 'cyan',
    actions: [
      { variant: 'primary', label: 'Kurslarni ko\'rish', icon: 'book-open', onClick: () => onNavigate && onNavigate('courses') },
      { variant: 'secondary', label: 'Viktorinani topshirish', icon: 'sparkles', onClick: () => onNavigate && onNavigate('interactive') },
    ],
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  // Progress Bar Widget Card
  const progressCard = createCard({
    variant: 'featured',
    padding: 'md',
  });
  progressCard.style.marginBottom = '3.5rem';

  function updateOverallProgressBar() {
    const total = aiModulesData.length;
    const count = completedModules.length;
    const percent = Math.round((count / total) * 100);

    progressCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <i data-lucide="trophy" style="color: var(--accent-cyan);"></i>
            <span style="font-weight: 700; font-size: 1.05rem;">Sizning O'quv Jarayoningiz (Brauzer xotirasi)</span>
          </div>
          <span class="badge badge-cyan" style="font-family: var(--font-mono);">${count} / ${total} Modul Tugallandi (${percent}%)</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
          <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%); transition: width var(--transition-normal);"></div>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">* Bu ko'rsatkich faqat ushbu brauzerda saqlanadi. Account talab etilmaydi.</span>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  updateOverallProgressBar();
  container.appendChild(progressCard);

  // Modules Section Header
  const modulesHeader = createSectionHeader({
    eyebrow: 'O\'QUV MODULLARI',
    title: 'Neyron Tarmoqlar va AI Yo\'nalishlari',
    description: 'Nazariy poydevor va amaliy topshiriqlar uyg\'unligidagi 6 ta asosiy ta\'lim moduli.',
    align: 'left',
    gradientTitle: true,
  });
  container.appendChild(modulesHeader);

  // Modules Grid
  const modulesGrid = document.createElement('div');
  modulesGrid.style.display = 'grid';
  modulesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  modulesGrid.style.gap = '1.75rem';
  modulesGrid.style.marginBottom = '5rem';

  function renderModules() {
    modulesGrid.innerHTML = '';

    aiModulesData.forEach(mod => {
      const isCompleted = completedModules.includes(mod.id);

      const cardHeader = createCardHeader({
        title: mod.title,
        subtitle: mod.category,
        action: isCompleted
          ? `<span class="badge badge-emerald">Tugatildi ✅</span>`
          : `<span class="badge badge-cyan">${mod.level}</span>`,
      });

      const cardBody = createCardBody({
        contentHTML: `
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="
              width: 42px;
              height: 42px;
              border-radius: var(--radius-sm);
              background: ${isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.1)'};
              border: 1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0, 240, 255, 0.25)'};
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${isCompleted ? 'var(--accent-emerald)' : 'var(--accent-cyan)'};
            ">
              <i data-lucide="${mod.icon}"></i>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">
              <div>Davomiyligi: <strong style="color: var(--text-primary);">${mod.duration}</strong></div>
              <div>Tarkibi: <strong style="color: var(--text-primary);">${mod.moduleCount}</strong></div>
            </div>
          </div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
            ${mod.description}
          </p>
        `,
      });

      const cardFooter = createCardFooter({});
      const detailsBtn = createButton({
        variant: isCompleted ? 'secondary' : 'primary',
        size: 'sm',
        label: isCompleted ? 'Modulni qayta ko\'rish' : 'Darsni boshlash',
        icon: isCompleted ? 'check-circle' : 'play-circle',
        onClick: () => openModuleReaderModal(mod),
      });

      cardFooter.appendChild(detailsBtn);

      const card = createCard({
        variant: isCompleted ? 'featured' : 'glass',
        padding: 'md',
        children: [cardHeader, cardBody, cardFooter],
      });

      modulesGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderModules();
  container.appendChild(modulesGrid);
  page.appendChild(container);

  function openModuleReaderModal(mod) {
    const isCompleted = completedModules.includes(mod.id);

    const modal = createModal({
      title: mod.title,
      size: 'lg',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <span class="badge badge-cyan">${mod.level}</span>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">
              <i data-lucide="clock" size="14"></i> ${mod.duration} • ${mod.moduleCount}
            </span>
          </div>

          <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-primary);">${mod.description}</p>

          <div class="glass-card" style="padding: 1.25rem;">
            <h4 style="color: var(--accent-cyan); font-size: 1rem; margin-bottom: 0.6rem;">Modul Mundarijasi va Asosiy Konsepsiyalar:</h4>
            <ul style="padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
              <li>1. Neyron tarmoqlarning nazariy poydevori va algoritmlar</li>
              <li>2. Amaliy Python va PyTorch/TensorFlow kod namunalari</li>
              <li>3. Real ma'lumotlar to'plamida (dataset) neyron tarmoqni o'rgatish</li>
              <li>4. Modul bo'yicha amaliy topshiriq hamda mini-loyiha</li>
            </ul>
          </div>
        </div>
      `,
      footer: `
        <div style="display: flex; gap: 1rem; justify-content: flex-end; width: 100%;">
          <button class="btn btn-secondary btn-sm" id="modalCloseBtn">Yopish</button>
          <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm" id="toggleCompleteBtn">
            ${isCompleted ? 'Tugatilmadi deb belgilash' : 'Modulni tugatdim ✅'}
          </button>
        </div>
      `,
    });

    modal.open();

    const backdropEl = modal.element;
    const closeBtn = backdropEl.querySelector('#modalCloseBtn');
    const toggleBtn = backdropEl.querySelector('#toggleCompleteBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (isCompleted) {
          completedModules = completedModules.filter(id => id !== mod.id);
          showToast(`"${mod.title}" statusi yangilandi.`, 'info');
        } else {
          completedModules.push(mod.id);
          showToast(`Tabriklaymiz! "${mod.title}" moduli yakunlandi.`, 'success');
        }
        storage.set('completed_ai_modules', completedModules);
        updateOverallProgressBar();
        renderModules();
        modal.close();
      });
    }
  }

  return page;
}
