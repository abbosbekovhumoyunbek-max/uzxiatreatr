import { createPageHero } from '../components/common/PageHero.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { authService } from '../services/authService.js';
import { storage } from '../utils/storage.js';
import { showToast } from '../components/common/Toast.js';

export function renderDashboardPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'dashboard-page';

  const user = authService.getCurrentUser();
  const completedModules = storage.get('completed_ai_modules', []);
  const completedCourses = storage.get('completed_courses', []);
  const studyGoal = storage.get('study_goal', { text: 'Bugun 2 soat Python o\'rganaman', minutes: 120, progress: 45 });

  const totalCourseCount = 4;
  const totalModuleCount = 6;
  const coursePercent = Math.round((completedCourses.length / totalCourseCount) * 100);

  const hero = createPageHero({
    eyebrow: 'STUDENT DASHBOARD',
    title: `Xush kelibsiz, ${user.name || 'Talaba'}!`,
    description: 'Sizning shaxsiy o\'quv kabinetingiz, kurslar bo\'yicha ilgarilashingiz va akademik statistikangiz.',
    breadcrumb: 'Dashboard',
    badgeVariant: 'cyan',
    actions: [
      {
        variant: 'secondary',
        label: 'Tizimdan Chiqish',
        icon: 'log-out',
        onClick: async () => {
          await authService.logout();
          showToast('Tizimdan chiqildingiz.', 'info');
          if (onNavigate) onNavigate('home');
        },
      },
    ],
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  // 1. Metric Cards Grid
  const statsGrid = document.createElement('div');
  statsGrid.style.display = 'grid';
  statsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  statsGrid.style.gap = '1.5rem';
  statsGrid.style.marginBottom = '3rem';

  const metrics = [
    { label: 'Tugatilgan Kurslar', value: `${completedCourses.length} / ${totalCourseCount}`, icon: 'book-check', color: 'var(--accent-cyan)' },
    { label: 'AI Modullari', value: `${completedModules.length} / ${totalModuleCount}`, icon: 'cpu', color: 'var(--accent-violet)' },
    { label: 'Kunlik O\'quv Maqsadi', value: `${studyGoal.progress} / ${studyGoal.minutes} daq`, icon: 'target', color: 'var(--accent-emerald)' },
    { label: 'Akademik Status', value: user.role === 'ADMIN' ? 'Administrator' : 'Talaba', icon: 'award', color: 'var(--accent-amber)' },
  ];

  metrics.forEach(m => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">${m.label}</span>
          <i data-lucide="${m.icon}" style="color: ${m.color};"></i>
        </div>
        <div style="font-size: 1.8rem; font-family: var(--font-display); font-weight: 800; color: var(--text-primary);">${m.value}</div>
      `,
    });
    statsGrid.appendChild(card);
  });

  container.appendChild(statsGrid);

  // 2. Main Dashboard Content Row (Progress + Recommended Lesson)
  const contentRow = document.createElement('div');
  contentRow.style.display = 'grid';
  contentRow.style.gridTemplateColumns = '1fr';
  contentRow.style.gap = '2rem';
  contentRow.style.marginBottom = '3rem';

  const mediaMatch = window.matchMedia('(min-width: 1024px)');
  if (mediaMatch.matches) {
    contentRow.style.gridTemplateColumns = '2fr 1fr';
  }

  // Left Side: Comprehensive Progress
  const progressCard = createCard({
    variant: 'featured',
    padding: 'lg',
  });

  progressCard.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 1.25rem; font-weight: 700;" class="text-gradient">Umumiy O'quv Darajangiz</h3>
        <span class="badge badge-cyan">${coursePercent}% Bajarildi</span>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
          <span>Kurslar bo'yicha ilgarilash</span>
          <span>${completedCourses.length} ta kurs</span>
        </div>
        <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
          <div style="width: ${coursePercent}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);"></div>
        </div>
      </div>

      <div class="glass-card" style="padding: 1.25rem;">
        <h4 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 0.6rem;">Oxirgi Harakatlar va Natijalar:</h4>
        <ul style="padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
          <li>✅ AI va Neyron Tarmoqlar Asoslari moduli o'rganilmoqda</li>
          <li>📊 Interaktiv Mini-Viktorinada ishtirok etildi</li>
          <li>🎯 Kunlik 120 daqiqalik o'quv maqsadi rejalashtirilgan</li>
        </ul>
      </div>
    </div>
  `;

  // Right Side: Quick Action & Recommendation
  const recommendationCard = createCard({
    variant: 'glass',
    padding: 'lg',
  });

  recommendationCard.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <span class="badge badge-violet">TAVSIYA ETILADI</span>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Sun'iy Intellekt va Neyron Tarmoqlar</h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        PyTorch va neyron tarmoqlar bo'yicha navbatdagi amaliy darslikka o'ting.
      </p>

      <div id="dashActionBtnSlot" style="margin-top: 0.5rem;"></div>
    </div>
  `;

  const actionSlot = recommendationCard.querySelector('#dashActionBtnSlot');
  const actionBtn = createButton({
    variant: 'primary',
    size: 'md',
    label: 'Darsni Davom Ettirish',
    icon: 'play-circle',
    onClick: () => {
      if (onNavigate) onNavigate('academy');
    },
  });
  actionSlot.appendChild(actionBtn);

  contentRow.appendChild(progressCard);
  contentRow.appendChild(recommendationCard);
  container.appendChild(contentRow);

  page.appendChild(container);
  return page;
}
