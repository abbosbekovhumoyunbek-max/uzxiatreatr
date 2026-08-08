import { createPageHero } from '../components/common/PageHero.js';
import { createCard } from '../components/common/Card.js';
import { createSectionHeader } from '../components/common/SectionHeader.js';

export function renderAboutPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'about-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'AKADEMIYA HAQIDA',
    title: 'UZXIAtreatr — Kelajak Bilimlar Makoni',
    description: 'Biz sun\'iy intellekt, zamonaviy dasturlash va raqamli texnologiyalar vositasida yoshlarning intellektual salohiyatini oshirishga intilamiz.',
    breadcrumb: 'Akademiya Haqida',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '4rem 1.5rem 5rem 1.5rem';

  // 1. Mission & Vision Section
  const missionGrid = document.createElement('div');
  missionGrid.style.display = 'grid';
  missionGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  missionGrid.style.gap = '2rem';
  missionGrid.style.marginBottom = '5rem';

  const missionCard = createCard({
    variant: 'featured',
    padding: 'lg',
    children: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <span class="badge badge-cyan" style="align-self: flex-start;">MISSYAMIZ</span>
        <h3 style="font-size: 1.4rem; font-weight: 700;" class="text-gradient">Zamonaviy AI Bilimlarini Ommalashtirish</h3>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.65;">
          Har bir talaba va izlanuvchiga sun'iy intellekt hamda ilg'or texnologiyalardan mas'uliyatli va samarali foydalanish ko'nikmalarini singdirish.
        </p>
      </div>
    `,
  });

  const visionCard = createCard({
    variant: 'glass',
    padding: 'lg',
    children: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <span class="badge badge-violet" style="align-self: flex-start;">NIZOM & NIYAT</span>
        <h3 style="font-size: 1.4rem; font-weight: 700;">Kelajak IT Hamjamiyati</h3>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.65;">
          Mintaqada raqamli innovatsiyalar, ilmiy startaplar va yuqori malakali dasturchilarni birlashtiruvchi markaziy ta'lim ekotizimiga aylanish.
        </p>
      </div>
    `,
  });

  missionGrid.appendChild(missionCard);
  missionGrid.appendChild(visionCard);
  container.appendChild(missionGrid);

  // 2. Values Cards
  const valHeader = createSectionHeader({
    eyebrow: 'QADRIYATLARIMIZ',
    title: 'UZXIAtreatr Asosiy Tamoyillari',
    description: 'Biz har bir faoliyatimizda ushbu 4 ta asosiy qadriyatga tayanmiz.',
    align: 'center',
    gradientTitle: true,
  });
  container.appendChild(valHeader);

  const valGrid = document.createElement('div');
  valGrid.style.display = 'grid';
  valGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  valGrid.style.gap = '1.5rem';
  valGrid.style.marginBottom = '5rem';

  const values = [
    { title: 'Bilim', desc: 'Chukur va amaliy ta\'lim berish', icon: 'book-open' },
    { title: 'Innovatsiya', desc: 'Eng so\'nggi AI vositalarini tatbiq etish', icon: 'zap' },
    { title: 'Hamkorlik', desc: 'Talaba va ustozlar hamjamiyati', icon: 'users' },
    { title: 'Mas\'uliyat', desc: 'AI etikasi va ma\'lumotlar xavfsizligi', icon: 'shield-check' },
  ];

  values.forEach(v => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="
            width: 44px;
            height: 44px;
            border-radius: var(--radius-sm);
            background: rgba(0, 240, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-cyan);
          ">
            <i data-lucide="${v.icon}"></i>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${v.title}</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${v.desc}</p>
        </div>
      `,
    });
    valGrid.appendChild(card);
  });

  container.appendChild(valGrid);

  // 3. Timeline
  const timeHeader = createSectionHeader({
    eyebrow: 'RIVOJLANISH BOSQICHLARI',
    title: 'Raqamli Yo\'l Tasmamiz (Timeline)',
    description: 'Akademiyaning shakllanishi va rejalashtirilgan istiqboldagi maqsadlari.',
    align: 'center',
    gradientTitle: true,
  });
  container.appendChild(timeHeader);

  const timelineCard = createCard({
    variant: 'glass',
    padding: 'lg',
  });

  timelineCard.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
        <div style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan); font-size: 1.1rem; width: 80px; flex-shrink: 0;">2026 Q1</div>
        <div style="border-left: 2px solid var(--accent-cyan); padding-left: 1.25rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">Platforma G'oyasi va Arxitekturasi</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.3rem;">UZXIAtreatr raqamli ta'lim va multimedia platformasining tayanch konsepsiyasi yaratildi.</p>
        </div>
      </div>

      <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
        <div style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-violet); font-size: 1.1rem; width: 80px; flex-shrink: 0;">2026 Q3</div>
        <div style="border-left: 2px solid var(--accent-violet); padding-left: 1.25rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">AI Academy va Viktorina Tizimi</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.3rem;">Interaktiv viktorinalar, AI faktlar hamda o'quv modullari muvaffaqiyatli ishga tushirildi.</p>
        </div>
      </div>

      <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
        <div style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-emerald); font-size: 1.1rem; width: 80px; flex-shrink: 0;">Kelajak</div>
        <div style="border-left: 2px solid var(--accent-emerald); padding-left: 1.25rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">Xalqaro IT Hamkorlik va LMS Integratsiyasi</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.3rem;">Kengaytirilgan LMS tizimi va avtomatlashtirilgan baholash modullarini joriy etish.</p>
        </div>
      </div>
    </div>
  `;

  container.appendChild(timelineCard);
  page.appendChild(container);
  return page;
}
