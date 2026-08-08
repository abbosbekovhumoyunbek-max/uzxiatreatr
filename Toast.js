/**
 * UZXIAtreatr Toast Notification System
 * Types: success, info, warning, error
 */

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 1.75rem;
      right: 1.75rem;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 360px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'info', duration = 3500) {
  const container = ensureToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} glass-card`;
  toast.style.cssText = `
    pointer-events: auto;
    padding: 0.85rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-md);
    transform: translateY(20px);
    opacity: 0;
    transition: all var(--transition-fast);
  `;

  let iconName = 'info';
  let borderColor = 'var(--accent-cyan)';
  let iconColor = 'var(--accent-cyan)';

  if (type === 'success') {
    iconName = 'check-circle-2';
    borderColor = 'var(--accent-emerald)';
    iconColor = 'var(--accent-emerald)';
  } else if (type === 'warning') {
    iconName = 'alert-triangle';
    borderColor = 'var(--accent-amber)';
    iconColor = 'var(--accent-amber)';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    borderColor = 'var(--accent-rose)';
    iconColor = 'var(--accent-rose)';
  }

  toast.style.borderColor = borderColor;

  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <i data-lucide="${iconName}" style="color: ${iconColor}; flex-shrink: 0;" size="18"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center;">
      <i data-lucide="x" size="14"></i>
    </button>
  `;

  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', dismiss);

  const timer = setTimeout(dismiss, duration);

  function dismiss() {
    clearTimeout(timer);
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }

  return { dismiss };
}
