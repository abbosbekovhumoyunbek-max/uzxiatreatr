import { createPageHero } from '../components/common/PageHero.js';
import { mediaItemsData } from '../data/media.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createModal } from '../components/common/Modal.js';
import { renderEmptyState } from '../components/common/StateViews.js';

export function renderMediaPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'media-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'MULTIMEDIA HUB',
    title: 'Video Ma\'ruzalar va Fotogalereya',
    description: 'UZXIAtreatr akademiyasining video ma\'ruzalari, tadbir foto-jamlanmalari va tasviriy materiallari.',
    breadcrumb: 'Media',
    badgeVariant: 'violet',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  // Filter Tabs
  let selectedTab = 'Barchasi';

  const filterRow = document.createElement('div');
  filterRow.style.display = 'flex';
  filterRow.style.gap = '0.75rem';
  filterRow.style.marginBottom = '2.5rem';
  filterRow.style.flexWrap = 'wrap';

  const tabs = ['Barchasi', 'Darslar', 'Video', 'Foto', 'Tadbirlar'];
  tabs.forEach(tab => {
    const btn = createButton({
      variant: tab === selectedTab ? 'primary' : 'secondary',
      size: 'sm',
      label: tab,
      onClick: () => {
        selectedTab = tab;
        updateTabStyles();
        renderGrid();
      },
    });
    btn.setAttribute('data-media-tab', tab);
    filterRow.appendChild(btn);
  });

  container.appendChild(filterRow);

  function updateTabStyles() {
    filterRow.querySelectorAll('button').forEach(btn => {
      const t = btn.getAttribute('data-media-tab');
      btn.className = `btn btn-sm ${t === selectedTab ? 'btn-primary' : 'btn-secondary'}`;
    });
  }

  // Media Grid Container
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = '1.75rem';

  container.appendChild(grid);

  function renderGrid() {
    grid.innerHTML = '';
    const filtered = mediaItemsData.filter(item => {
      if (selectedTab === 'Barchasi') return true;
      return item.category === selectedTab || item.type === selectedTab.toLowerCase();
    });

    if (filtered.length === 0) {
      const empty = renderEmptyState({
        icon: 'video-off',
        title: 'Media fayllar topilmadi',
        description: 'Tanlangan kategoriya bo\'yicha hozircha media fayllar mavjud emas.',
      });
      grid.appendChild(empty);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach((item, index) => {
      const card = createCard({
        variant: 'interactive',
        padding: 'none',
        onClick: () => openGalleryLightbox(filtered, index),
        children: `
          <div style="height: 180px; background: ${item.gradient}; position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: rgba(8, 12, 20, 0.8);
              border: 1px solid var(--border-highlight);
              color: var(--accent-cyan);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: var(--shadow-sm);
            ">
              <i data-lucide="${item.type === 'video' ? 'play' : 'image'}" size="24"></i>
            </div>
            <span class="badge badge-cyan" style="position: absolute; top: 1rem; left: 1rem;">${item.category}</span>
            <span style="position: absolute; bottom: 0.8rem; right: 0.8rem; font-size: 0.75rem; background: rgba(0,0,0,0.7); padding: 0.2rem 0.5rem; border-radius: var(--radius-xs); color: #fff;">
              ${item.duration}
            </span>
          </div>
          <div style="padding: 1.25rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">${item.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.4;">${item.description}</p>
          </div>
        `,
      });

      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderGrid();
  page.appendChild(container);

  // Gallery Lightbox Modal Viewer with Next/Prev Navigation
  function openGalleryLightbox(itemsList, activeIndex) {
    let currentGalleryIndex = activeIndex;

    const modal = createModal({
      title: itemsList[currentGalleryIndex].title,
      size: 'lg',
      content: '<div id="lightboxContentSlot"></div>',
      footer: `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <span style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);" id="lightboxCounter"></span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" id="lightboxPrevBtn"><i data-lucide="chevron-left"></i> Oldingisi</button>
            <button class="btn btn-secondary btn-sm" id="lightboxNextBtn">Keyingisi <i data-lucide="chevron-right"></i></button>
          </div>
        </div>
      `,
    });

    modal.open();

    const backdropEl = modal.element;
    const contentSlot = backdropEl.querySelector('#lightboxContentSlot');
    const counterEl = backdropEl.querySelector('#lightboxCounter');
    const prevBtn = backdropEl.querySelector('#lightboxPrevBtn');
    const nextBtn = backdropEl.querySelector('#lightboxNextBtn');

    function updateLightboxDisplay() {
      const currentItem = itemsList[currentGalleryIndex];

      const modalTitleEl = backdropEl.querySelector('.modal-title');
      if (modalTitleEl) modalTitleEl.textContent = currentItem.title;

      if (counterEl) counterEl.textContent = `${currentGalleryIndex + 1} / ${itemsList.length}`;

      contentSlot.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="width: 100%; height: 360px; background: ${currentItem.gradient}; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-highlight); position: relative;">
            <i data-lucide="${currentItem.type === 'video' ? 'play-circle' : 'image'}" size="64" style="color: var(--accent-cyan); margin-bottom: 1rem;"></i>
            <h3 style="font-size: 1.2rem; color: #fff;">${currentItem.title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${currentItem.category} • ${currentItem.duration}</p>
          </div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${currentItem.description}</p>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();
    }

    updateLightboxDisplay();

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + itemsList.length) % itemsList.length;
        updateLightboxDisplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % itemsList.length;
        updateLightboxDisplay();
      });
    }

    function handleLightboxKeyboard(e) {
      if (e.key === 'ArrowLeft') {
        currentGalleryIndex = (currentGalleryIndex - 1 + itemsList.length) % itemsList.length;
        updateLightboxDisplay();
      } else if (e.key === 'ArrowRight') {
        currentGalleryIndex = (currentGalleryIndex + 1) % itemsList.length;
        updateLightboxDisplay();
      }
    }

    document.addEventListener('keydown', handleLightboxKeyboard);
  }

  return page;
}
