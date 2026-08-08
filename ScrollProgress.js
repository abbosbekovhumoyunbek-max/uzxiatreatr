export function renderScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 50%, var(--accent-violet) 100%);
    z-index: 2001;
    pointer-events: none;
    transition: width 0.1s ease-out;
  `;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  return bar;
}
