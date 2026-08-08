import { createPageHero } from '../components/common/PageHero.js';
import { coursesData } from '../data/courses.js';
import { createCard, createCardHeader, createCardBody, createCardFooter } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createModal } from '../components/common/Modal.js';
import { renderEmptyState } from '../components/common/StateViews.js';
import { storage } from '../utils/storage.js';
import { showToast } from '../components/common/Toast.js';

export function renderCoursesPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'courses-page';

  let completedCourses = storage.get('completed_courses', []);

  // Hero
  const hero = createPageHero({
    eyebrow: 'AKADEMIK KURSLAR',
    title: 'Dasturlash va Sun\'iy Intellekt Kurslari Catalogi',
    description: 'Boshlang\'ich bilimlardan tortib, professional dasturchi hamda AI mutaxassisi bo\'lib yetishish uchun mo\'ljallangan kurslar.',
    breadcrumb: 'Kurslar',
    badgeVariant: 'cyan',
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
  progressCard.style.marginBottom = '2.5rem';

  function updateOverallProgressBar() {
    const total = coursesData.length;
    const count = completedCourses.length;
    const percent = Math.round((count / total) * 100);

    progressCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <i data-lucide="book-check" style="color: var(--accent-cyan);"></i>
            <span style="font-weight: 700; font-size: 1.05rem;">Kurslar Bo'yicha Natijangiz (Brauzer xotirasi)</span>
          </div>
          <span class="badge badge-cyan" style="font-family: var(--font-mono);">${count} / ${total} Kurs O'rganildi (${percent}%)</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
          <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%); transition: width var(--transition-normal);"></div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  updateOverallProgressBar();
  container.appendChild(progressCard);

  // Filters Bar Card
  const filterCard = createCard({
    variant: 'glass',
    padding: 'md',
  });
  filterCard.style.marginBottom = '2.5rem';

  let selectedCategory = 'Barchasi';
  let selectedLevel = 'Barchasi';
  let searchQuery = '';

  filterCard.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="position: relative;">
        <input
          type="text"
          id="courseSearchInput"
          placeholder="Kurs nomi yoki kalit so'z bo'yicha qidirish..."
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

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;" id="categoryFilterRow">
          <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.5rem;">Kategoriya:</span>
          ${['Barchasi', 'AI Academy', 'Generativ AI', 'Dasturlash', 'Xavfsizlik', 'Web Dev'].map(cat => `
            <button class="btn btn-sm ${cat === 'Barchasi' ? 'btn-primary' : 'btn-secondary'}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;" id="levelFilterRow">
          <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.5rem;">Daraja:</span>
          ${['Barchasi', 'Boshlang\'ich', 'O\'rta', 'Yuqori'].map(lvl => `
            <button class="btn btn-sm ${lvl === 'Barchasi' ? 'btn-primary' : 'btn-ghost'}" data-lvl="${lvl}">
              ${lvl}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.appendChild(filterCard);

  // Courses Display Grid
  const coursesGrid = document.createElement('div');
  coursesGrid.style.display = 'grid';
  coursesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  coursesGrid.style.gap = '1.75rem';

  container.appendChild(coursesGrid);

  function renderFilteredCourses() {
    coursesGrid.innerHTML = '';

    const filtered = coursesData.filter(c => {
      const matchCat = selectedCategory === 'Barchasi' || c.category === selectedCategory;
      const matchLvl = selectedLevel === 'Barchasi' || c.level === selectedLevel;
      const matchSearch = searchQuery === '' || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchLvl && matchSearch;
    });

    if (filtered.length === 0) {
      const empty = renderEmptyState({
        icon: 'search-x',
        title: 'Hech qanday kurs topilmadi',
        description: 'Kiritilgan filtr va qidiruv so\'rovi bo\'yicha kurslar mavjud emas.',
        action: {
          label: 'Filtrni tozalash',
          onClick: () => {
            selectedCategory = 'Barchasi';
            selectedLevel = 'Barchasi';
            searchQuery = '';
            const searchInput = filterCard.querySelector('#courseSearchInput');
            if (searchInput) searchInput.value = '';
            renderFilteredCourses();
          }
        }
      });
      coursesGrid.appendChild(empty);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(course => {
      const isCompleted = completedCourses.includes(course.id);

      const cardHeader = createCardHeader({
        title: course.title,
        subtitle: course.category,
        action: isCompleted
          ? `<span class="badge badge-emerald">O'rganildi ✅</span>`
          : `<span class="badge badge-cyan">${course.badge}</span>`,
      });

      const cardBody = createCardBody({
        contentHTML: `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <div style="
              width: 40px;
              height: 40px;
              border-radius: var(--radius-sm);
              background: ${isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.1)'};
              border: 1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0, 240, 255, 0.25)'};
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${isCompleted ? 'var(--accent-emerald)' : 'var(--accent-cyan)'};
            ">
              <i data-lucide="${course.icon}"></i>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${course.duration}</span>
          </div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
            ${course.description}
          </p>
        `,
      });

      const cardFooter = createCardFooter({});
      const btn = createButton({
        variant: isCompleted ? 'secondary' : 'primary',
        size: 'sm',
        label: isCompleted ? 'Kurs tafsilotlari' : 'Kursni ko\'rish',
        icon: 'chevron-right',
        iconPosition: 'right',
        onClick: () => openCourseDetailModal(course),
      });

      cardFooter.appendChild(btn);

      const card = createCard({
        variant: isCompleted ? 'featured' : 'glass',
        padding: 'md',
        children: [cardHeader, cardBody, cardFooter],
      });

      coursesGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Filter Listeners
  const searchInput = filterCard.querySelector('#courseSearchInput');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderFilteredCourses();
  });

  const catBtns = filterCard.querySelectorAll('#categoryFilterRow button');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.className = 'btn btn-sm btn-secondary');
      btn.className = 'btn btn-sm btn-primary';
      selectedCategory = btn.getAttribute('data-cat');
      renderFilteredCourses();
    });
  });

  const lvlBtns = filterCard.querySelectorAll('#levelFilterRow button');
  lvlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lvlBtns.forEach(b => b.className = 'btn btn-sm btn-ghost');
      btn.className = 'btn btn-sm btn-primary';
      selectedLevel = btn.getAttribute('data-lvl');
      renderFilteredCourses();
    });
  });

  renderFilteredCourses();
  page.appendChild(container);

  function openCourseDetailModal(c) {
    const isCompleted = completedCourses.includes(c.id);

    const modal = createModal({
      title: c.title,
      size: 'md',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span class="badge badge-cyan">${c.category}</span>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Daraja: ${c.level}</span>
          </div>
          <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.6;">${c.description}</p>
          <div class="glass-card" style="padding: 1.25rem;">
            <h4 style="color: var(--accent-cyan); font-size: 0.95rem; margin-bottom: 0.5rem;">Kurs Rejasi va Darslar:</h4>
            <ul style="padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
              <li>Jami ${c.lessonsCount} ta amaliy va nazariy dars</li>
              <li>Mustaqil topshiriqlar va amaliy kod topshiriqlari</li>
              <li>Yakuniy sertifikat sinovi</li>
            </ul>
          </div>
        </div>
      `,
      footer: `
        <div style="display: flex; gap: 1rem; justify-content: flex-end; width: 100%;">
          <button class="btn btn-secondary btn-sm" id="cModalCloseBtn">Yopish</button>
          <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm" id="cToggleBtn">
            ${isCompleted ? 'O\'rganilmadi deb belgilash' : 'Kursni yakunladim ✅'}
          </button>
        </div>
      `,
    });

    modal.open();

    const backdropEl = modal.element;
    const closeBtn = backdropEl.querySelector('#cModalCloseBtn');
    const toggleBtn = backdropEl.querySelector('#cToggleBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (isCompleted) {
          completedCourses = completedCourses.filter(id => id !== c.id);
          showToast(`"${c.title}" statusi yangilandi.`, 'info');
        } else {
          completedCourses.push(c.id);
          showToast(`Tabriklaymiz! "${c.title}" kursi yakunlandi.`, 'success');
        }
        storage.set('completed_courses', completedCourses);
        updateOverallProgressBar();
        renderFilteredCourses();
        modal.close();
      });
    }
  }

  return page;
}
