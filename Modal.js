/**
 * UZXIAtreatr Accessible Modal Component
 * Lightbox, quiz results, article view dialog container.
 */

export function createModal(options = {}) {
  const {
    id = `modal-${Math.random().toString(36).substr(2, 9)}`,
    title = '',
    content = '',
    footer = null,
    size = 'md', // sm, md, lg, full
    closeOnBackdrop = true,
    closeOnEscape = true,
    onClose = null,
    onOpen = null,
  } = options;

  let activeElementBeforeOpen = null;

  const backdrop = document.createElement('div');
  backdrop.id = id;
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  if (title) backdrop.setAttribute('aria-labelledby', `${id}-title`);

  const container = document.createElement('div');
  container.className = `modal-container modal-${size}`;

  // Header
  const header = document.createElement('div');
  header.className = 'modal-header';
  header.innerHTML = `
    <h3 class="modal-title" id="${id}-title">${title}</h3>
    <button class="modal-close-btn" id="${id}-close" aria-label="Oynani yopish">
      <i data-lucide="x"></i>
    </button>
  `;

  // Body
  const body = document.createElement('div');
  body.className = 'modal-body';
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    body.appendChild(content);
  }

  container.appendChild(header);
  container.appendChild(body);

  // Footer (optional)
  if (footer) {
    const footerDiv = document.createElement('div');
    footerDiv.className = 'modal-footer';
    if (typeof footer === 'string') {
      footerDiv.innerHTML = footer;
    } else if (footer instanceof HTMLElement) {
      footerDiv.appendChild(footer);
    }
    container.appendChild(footerDiv);
  }

  backdrop.appendChild(container);

  // Event Handlers
  const closeBtn = header.querySelector(`#${id}-close`);
  
  function open() {
    activeElementBeforeOpen = document.activeElement;
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
    
    // Trigger animation next frame
    requestAnimationFrame(() => {
      backdrop.classList.add('active');
      if (window.lucide) window.lucide.createIcons();
      closeBtn.focus();
    });

    if (closeOnEscape) {
      document.addEventListener('keydown', handleKeyDown);
    }

    if (onOpen) onOpen();
  }

  function close() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';

    if (closeOnEscape) {
      document.removeEventListener('keydown', handleKeyDown);
    }

    setTimeout(() => {
      if (backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
      if (activeElementBeforeOpen && typeof activeElementBeforeOpen.focus === 'function') {
        activeElementBeforeOpen.focus();
      }
      if (onClose) onClose();
    }, 250);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  closeBtn.addEventListener('click', close);

  if (closeOnBackdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        close();
      }
    });
  }

  return {
    element: backdrop,
    open,
    close,
  };
}
