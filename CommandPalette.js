import { createModal } from './Modal.js';

export function createCommandPalette(onNavigate) {
  const commands = [
    { id: 'academy', label: 'AI Akademiya', category: 'Sahifalar', icon: 'cpu' },
    { id: 'courses', label: 'Kurslar Katalogi', category: 'Sahifalar', icon: 'book-open' },
    { id: 'media', label: 'Media & Galereya', category: 'Sahifalar', icon: 'film' },
    { id: 'news', label: 'Yangiliklar Feed', category: 'Sahifalar', icon: 'newspaper' },
    { id: 'events', label: 'Bo\'lajak Tadbirlar', category: 'Sahifalar', icon: 'calendar' },
    { id: 'students', label: 'Talabalar Hubi & Toolkit', category: 'Sahifalar', icon: 'graduation-cap' },
    { id: 'interactive', label: 'Interaktiv Viktorina & Faktlar', category: 'Sahifalar', icon: 'sparkles' },
    { id: 'about', label: 'Akademiya Haqida', category: 'Sahifalar', icon: 'info' },
    { id: 'contact', label: 'Aloqa & Xabar Yuborish', category: 'Sahifalar', icon: 'mail' },
  ];

  let modal = null;
  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function open() {
    selectedIndex = 0;
    filteredCommands = [...commands];

    const content = document.createElement('div');
    content.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';

    content.innerHTML = `
      <div style="position: relative;">
        <input
          type="text"
          id="cmdPaletteSearch"
          placeholder="Sahifa yoki tezkor harakatni qidirish (Ctrl+K)..."
          style="
            width: 100%;
            padding: 0.95rem 1rem 0.95rem 2.8rem;
            border-radius: var(--radius-md);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-highlight);
            color: var(--text-primary);
            font-size: 1rem;
            outline: none;
          "
        />
        <i data-lucide="search" size="18" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--accent-cyan);"></i>
      </div>

      <div id="cmdPaletteResults" style="display: flex; flex-direction: column; gap: 0.4rem; max-height: 320px; overflow-y: auto;"></div>
    `;

    modal = createModal({
      title: 'Tezkor Navigatsiya (Ctrl + K)',
      size: 'md',
      content: content,
    });

    modal.open();

    const searchInput = content.querySelector('#cmdPaletteSearch');
    const resultsContainer = content.querySelector('#cmdPaletteResults');

    function renderResults() {
      resultsContainer.innerHTML = '';
      if (filteredCommands.length === 0) {
        resultsContainer.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            Hech qanday buyruq yoki sahifa topilmadi.
          </div>
        `;
        return;
      }

      filteredCommands.forEach((cmd, idx) => {
        const item = document.createElement('button');
        const isSelected = idx === selectedIndex;
        item.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: ${isSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)'};
          border: 1px solid ${isSelected ? 'var(--border-highlight)' : 'transparent'};
          color: ${isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)'};
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        `;

        item.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="${cmd.icon}" size="18"></i>
            <span style="font-weight: 500;">${cmd.label}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${cmd.category}</span>
        `;

        item.addEventListener('click', () => {
          modal.close();
          if (onNavigate) onNavigate(cmd.id);
        });

        resultsContainer.appendChild(item);
      });

      if (window.lucide) window.lucide.createIcons();
    }

    renderResults();

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      filteredCommands = commands.filter(c => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
      selectedIndex = 0;
      renderResults();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          const selected = filteredCommands[selectedIndex];
          modal.close();
          if (onNavigate) onNavigate(selected.id);
        }
      }
    });

    setTimeout(() => searchInput.focus(), 100);
  }

  // Global Keyboard Shortcut Handler (Ctrl+K or /)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      open();
    }
  });

  return { open };
}
