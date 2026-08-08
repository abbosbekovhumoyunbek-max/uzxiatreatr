import { createButton } from './Button.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from './Card.js';
import { createSectionHeader } from './SectionHeader.js';
import { createModal } from './Modal.js';
import { renderLoadingState, renderEmptyState, renderErrorState } from './StateViews.js';

export function renderComponentShowcase() {
  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3rem 1.5rem';

  // Master Section Header
  const masterHeader = createSectionHeader({
    eyebrow: 'PHASE 2 — Component Library Test',
    title: 'UZXIAtreatr UI Component Showcase',
    description: 'Barcha qayta ishlatiluvchi komponentlar: tugmalar, kartochkalar, sektsiya sarlavhalari, modallar va holat ko\'rinishlari visual va interaktiv testlash zonasi.',
    align: 'center',
    gradientTitle: true,
  });
  container.appendChild(masterHeader);

  // SECTION 1: BUTTONS
  const buttonSection = document.createElement('section');
  buttonSection.style.marginBottom = '4rem';

  const btnHeader = createSectionHeader({
    eyebrow: 'Komponent 1',
    title: 'Tugmalar (Button System)',
    description: 'Variantlar: Primary, Secondary, Outline, Ghost, Icon. O\'lchamlar: Small, Medium, Large. Holatlar: Loading, Disabled.',
    align: 'left',
  });
  buttonSection.appendChild(btnHeader);

  const btnGrid = document.createElement('div');
  btnGrid.style.display = 'flex';
  btnGrid.style.flexDirection = 'column';
  btnGrid.style.gap = '1.5rem';

  // Row 1: Variants
  const row1 = document.createElement('div');
  row1.style.display = 'flex';
  row1.style.gap = '1rem';
  row1.style.flexWrap = 'wrap';
  row1.style.alignItems = 'center';

  row1.appendChild(createButton({ variant: 'primary', label: 'Primary Button', icon: 'sparkles' }));
  row1.appendChild(createButton({ variant: 'secondary', label: 'Secondary Button', icon: 'layers' }));
  row1.appendChild(createButton({ variant: 'outline', label: 'Outline Button', icon: 'code' }));
  row1.appendChild(createButton({ variant: 'ghost', label: 'Ghost Button', icon: 'arrow-right' }));
  row1.appendChild(createButton({ variant: 'icon', icon: 'zap', ariaLabel: 'Tezkor Harakat' }));
  btnGrid.appendChild(row1);

  // Row 2: Sizes & States
  const row2 = document.createElement('div');
  row2.style.display = 'flex';
  row2.style.gap = '1rem';
  row2.style.flexWrap = 'wrap';
  row2.style.alignItems = 'center';

  row2.appendChild(createButton({ variant: 'primary', size: 'sm', label: 'Small Button' }));
  row2.appendChild(createButton({ variant: 'primary', size: 'md', label: 'Medium Button' }));
  row2.appendChild(createButton({ variant: 'primary', size: 'lg', label: 'Large Button' }));
  row2.appendChild(createButton({ variant: 'primary', loading: true, label: 'Yuklanmoqda...' }));
  row2.appendChild(createButton({ variant: 'secondary', disabled: true, label: 'Nofaol Tugma' }));
  btnGrid.appendChild(row2);

  buttonSection.appendChild(btnGrid);
  container.appendChild(buttonSection);

  // SECTION 2: CARDS SYSTEM
  const cardSection = document.createElement('section');
  cardSection.style.marginBottom = '4rem';

  const cardHeader = createSectionHeader({
    eyebrow: 'Komponent 2',
    title: 'Kartochkalar (Card System)',
    description: 'Variantlar: Default, Glass, Elevated, Interactive, Featured. Tarkibiy elementlar: Header, Body, Footer.',
    align: 'left',
  });
  cardSection.appendChild(cardHeader);

  const cardGrid = document.createElement('div');
  cardGrid.style.display = 'grid';
  cardGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  cardGrid.style.gap = '1.5rem';

  // Card 1: Default
  const card1 = createCard({
    variant: 'default',
    padding: 'md',
    children: [
      createCardHeader({ title: 'Default Card', subtitle: 'Standard Surface' }),
      createCardBody({ contentHTML: '<p>Oddiy qora shaffof fonli kartochka komponenti.</p>' }),
      createCardFooter({ contentHTML: '<span style="font-size: 0.8rem; color: var(--text-muted)">Status: Tayyor</span>' }),
    ],
  });

  // Card 2: Glass
  const card2 = createCard({
    variant: 'glass',
    padding: 'md',
    children: [
      createCardHeader({ title: 'Glass Card', subtitle: 'Glassmorphism Backdrop' }),
      createCardBody({ contentHTML: '<p>Frosted glass backdrop-filter va oqish border effektiga ega kartochka.</p>' }),
    ],
  });

  // Card 3: Interactive
  const card3 = createCard({
    variant: 'interactive',
    padding: 'md',
    onClick: () => alert('Interactive card bosildi!'),
    children: [
      createCardHeader({ title: 'Interactive Card', subtitle: 'Clickable & Hover Effect' }),
      createCardBody({ contentHTML: '<p>Sichqoncha ustiga kelganda tepaga ko\'tarilib, glowing soya beradi. Bosing!</p>' }),
    ],
  });

  // Card 4: Featured
  const card4 = createCard({
    variant: 'featured',
    padding: 'md',
    children: [
      createCardHeader({ title: 'Featured Card', subtitle: 'Top Neon Highlight' }),
      createCardBody({ contentHTML: '<p>Muhim e\'lonlar va eng ommabop AI kurslar uchun neon chiziqli maxsus karta.</p>' }),
    ],
  });

  cardGrid.appendChild(card1);
  cardGrid.appendChild(card2);
  cardGrid.appendChild(card3);
  cardGrid.appendChild(card4);
  cardSection.appendChild(cardGrid);
  container.appendChild(cardSection);

  // SECTION 3: MODAL DEMO
  const modalSection = document.createElement('section');
  modalSection.style.marginBottom = '4rem';

  const modalHeader = createSectionHeader({
    eyebrow: 'Komponent 3 & 4',
    title: 'Modal (Dialog) & Section Header',
    description: 'Klaviatura Escape va backdrop orqali yopiluvchi, blurring z-index modal tizimi.',
    align: 'left',
  });
  modalSection.appendChild(modalHeader);

  const modalDemoCard = createCard({
    variant: 'glass',
    padding: 'lg',
    children: [
      createCardBody({ contentHTML: '<p style="margin-bottom: 1.5rem;">Modal oynani ochish va sinab ko\'rish uchun pastdagi tugmani bosing:</p>' }),
    ],
  });

  const openModalBtn = createButton({
    variant: 'primary',
    label: 'Modal Oynani Ochish',
    icon: 'maximize-2',
    onClick: () => {
      const modal = createModal({
        title: 'UZXIAtreatr Interaktiv Modali',
        size: 'md',
        content: `
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <p>Ushbu modal oyna rasm galereyasi, video player va viktorina natijalari uchun mo'ljallangan.</p>
            <div class="glass-card" style="padding: 1rem; background: rgba(0, 240, 255, 0.05);">
              <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">Modal imkoniyatlari:</h4>
              <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem;">
                <li>Escape tugmasi orqali yopish</li>
                <li>Backdrop qorong'uligi va blur effekti</li>
                <li>Focus restoration (yopilganda oldingi elementga fokus)</li>
              </ul>
            </div>
          </div>
        `,
        footer: createButton({
          variant: 'primary',
          label: 'Tushundim',
          onClick: () => modal.close(),
        }),
      });
      modal.open();
    },
  });

  modalDemoCard.querySelector('.card-body').appendChild(openModalBtn);
  modalSection.appendChild(modalDemoCard);
  container.appendChild(modalSection);

  // SECTION 4: STATE VIEWS
  const stateSection = document.createElement('section');
  stateSection.style.marginBottom = '4rem';

  const stateHeader = createSectionHeader({
    eyebrow: 'Komponent 5',
    title: 'Holat Ko\'rinishlari (State Views)',
    description: 'Har bir moduldagi ma\'lumot yuklanishi, bo\'sh qolishi va xatoliklar holati uchun standartlashtirilgan interfeyslar.',
    align: 'left',
  });
  stateSection.appendChild(stateHeader);

  const stateTabsCard = createCard({
    variant: 'glass',
    padding: 'md',
  });

  const tabButtonsWrapper = document.createElement('div');
  tabButtonsWrapper.style.display = 'flex';
  tabButtonsWrapper.style.gap = '0.75rem';
  tabButtonsWrapper.style.marginBottom = '2rem';
  tabButtonsWrapper.style.flexWrap = 'wrap';

  const stateContentDisplay = document.createElement('div');
  stateContentDisplay.className = 'glass-card';
  stateContentDisplay.style.padding = '1rem';

  const btnLoadingView = createButton({
    variant: 'secondary',
    size: 'sm',
    label: 'Loading State',
    icon: 'loader',
    onClick: () => showStateView('loading'),
  });

  const btnEmptyView = createButton({
    variant: 'secondary',
    size: 'sm',
    label: 'Empty State',
    icon: 'inbox',
    onClick: () => showStateView('empty'),
  });

  const btnErrorView = createButton({
    variant: 'secondary',
    size: 'sm',
    label: 'Error State',
    icon: 'alert-circle',
    onClick: () => showStateView('error'),
  });

  tabButtonsWrapper.appendChild(btnLoadingView);
  tabButtonsWrapper.appendChild(btnEmptyView);
  tabButtonsWrapper.appendChild(btnErrorView);

  function showStateView(type) {
    stateContentDisplay.innerHTML = '';
    if (type === 'loading') {
      stateContentDisplay.appendChild(renderLoadingState({ skeleton: true, count: 2 }));
    } else if (type === 'empty') {
      stateContentDisplay.appendChild(renderEmptyState({
        icon: 'folder-open',
        title: 'Kurslar topilmadi',
        description: 'Siz tanlagan filtr bo\'yicha hozircha aktiv kurslar mavjud emas.',
        action: { label: 'Barcha kurslarni ko\'rish', onClick: () => alert('Reset filters') }
      }));
    } else if (type === 'error') {
      stateContentDisplay.appendChild(renderErrorState({
        title: 'Tarmoq xatoligi',
        description: 'Server bilan aloqa uzildi. Internet ulanishini tekshirib, qayta urining.',
        onRetry: () => showStateView('loading')
      }));
    }
    if (window.lucide) window.lucide.createIcons();
  }

  showStateView('loading');

  stateTabsCard.appendChild(tabButtonsWrapper);
  stateTabsCard.appendChild(stateContentDisplay);
  stateSection.appendChild(stateTabsCard);
  container.appendChild(stateSection);

  return container;
}
