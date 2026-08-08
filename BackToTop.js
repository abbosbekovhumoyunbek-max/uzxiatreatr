import { createButton } from './Button.js';

export function renderBackToTop() {
  const wrapper = document.createElement('div');
  wrapper.className = 'back-to-top-wrapper';
  wrapper.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(15px);
    transition: all var(--transition-fast);
  `;

  const btn = createButton({
    variant: 'icon',
    icon: 'arrow-up',
    ariaLabel: 'Tepaga qaytish',
    onClick: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  wrapper.appendChild(btn);

  function handleScroll() {
    if (window.scrollY > 300) {
      wrapper.style.opacity = '1';
      wrapper.style.visibility = 'visible';
      wrapper.style.transform = 'translateY(0)';
    } else {
      wrapper.style.opacity = '0';
      wrapper.style.visibility = 'hidden';
      wrapper.style.transform = 'translateY(15px)';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return wrapper;
}
