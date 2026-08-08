import { createPageHero } from '../components/common/PageHero.js';
import { newsData } from '../data/news.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createModal } from '../components/common/Modal.js';
import { renderEmptyState } from '../components/common/StateViews.js';

export function renderNewsPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'news-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'AKADEMIYA YANGILIKLARI',
    title: 'Ta\'lim, Texnologiya va AI Yangiliklari',
    description: 'UZXIAtreatr platformasining so\'nggi xabarlari, ilmiy loyihalar taqdimoti hamda akademiya voqealari.',
    breadcrumb: 'Yangiliklar',
    badgeVariant: 'emerald',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  // Search & Filter Card
  const filterCard = createCard({
    variant: 'glass',
    padding: 'md',
  });
  filterCard.style.marginBottom = '2.5rem';

  let selectedCategory = 'Barchasi';
  let searchQuery = '';

  filterCard.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="position: relative;">
        <input
          type="text"
          id="newsSearchInput"
          placeholder="Yangiliklar bo'yicha qidirish..."
          style="
            width: 100%;
            padding: 0.85rem 1rem 0.85rem 2.8rem;
            border-radius: var(--radius-md);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 0.95rem;
            outline: none;
          "
        />
        <i data-lucide="search" size="18" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="newsCatRow">
        <span style="font-size: 0.85rem; color: var(--text-muted); align-self: center; margin-right: 0.5rem;">Kategoriya:</span>
        ${['Barchasi', 'Akademiya', 'Texnologiya', 'Talabalar Loyihalari'].map(cat => `
          <button class="btn btn-sm ${cat === 'Barchasi' ? 'btn-primary' : 'btn-secondary'}" data-ncat="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(filterCard);

  // News Grid Container
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = '1.75rem';

  container.appendChild(grid);

  function renderFilteredNews() {
    grid.innerHTML = '';
    const filtered = newsData.filter(item => {
      const matchCat = selectedCategory === 'Barchasi' || item.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      const empty = renderEmptyState({
        icon: 'newspaper',
        title: 'Yangiliklar topilmadi',
        description: 'Siz kiritgan qidiruv so\'rovi bo\'yicha yangiliklar mavjud emas.',
      });
      grid.appendChild(empty);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(news => {
      const card = createCard({
        variant: 'interactive',
        padding: 'none',
        onClick: () => openArticleModal(news),
        children: `
          <div style="height: 150px; background: ${news.imageBg}; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between;">
            <span class="badge badge-cyan" style="align-self: flex-start;">${news.category}</span>
            <span style="font-size: 0.75rem; color: #fff; font-family: var(--font-mono); background: rgba(0,0,0,0.6); padding: 0.2rem 0.5rem; border-radius: var(--radius-xs); align-self: flex-end;">${news.date}</span>
          </div>
          <div style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; flex: 1;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); line-height: 1.35;">${news.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${news.excerpt}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${news.readTime}</span>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-cyan);">O'qish →</span>
            </div>
          </div>
        `,
      });
      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  const sInput = filterCard.querySelector('#newsSearchInput');
  sInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderFilteredNews();
  });

  const catBtns = filterCard.querySelectorAll('#newsCatRow button');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.className = 'btn btn-sm btn-secondary');
      btn.className = 'btn btn-sm btn-primary';
      selectedCategory = btn.getAttribute('data-ncat');
      renderFilteredNews();
    });
  });

  renderFilteredNews();
  page.appendChild(container);

  function openArticleModal(item) {
    const modal = createModal({
      title: item.title,
      size: 'md',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; gap: 1rem; align-items: center; font-size: 0.85rem; color: var(--text-secondary);">
            <span class="badge badge-cyan">${item.category}</span>
            <span><i data-lucide="calendar" size="14"></i> ${item.date}</span>
          </div>
          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary);">${item.content}</p>
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

  return page;
}
