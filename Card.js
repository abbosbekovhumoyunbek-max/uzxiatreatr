/**
 * UZXIAtreatr Card Component & Composition Helpers
 * Variants: default, elevated, interactive, glass, featured
 * Padding: none, sm, md, lg
 */

export function createCard(options = {}) {
  const {
    variant = 'glass',
    padding = 'md',
    clickable = false,
    className = '',
    onClick = null,
    children = null,
  } = options;

  const card = document.createElement('div');
  const classes = ['card-base', `card-${variant}`, `card-padding-${padding}`];

  if (clickable || variant === 'interactive') {
    classes.push('card-interactive');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  }

  if (className) classes.push(className);
  card.className = classes.join(' ');

  if (children) {
    if (typeof children === 'string') {
      card.innerHTML = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => child && card.appendChild(child));
    } else if (children instanceof HTMLElement) {
      card.appendChild(children);
    }
  }

  if (onClick) {
    card.addEventListener('click', onClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    });
  }

  return card;
}

export function createCardHeader({ title = '', subtitle = '', action = null, className = '' }) {
  const header = document.createElement('div');
  header.className = `card-header ${className}`.trim();

  let actionHTML = '';
  if (action && typeof action === 'string') {
    actionHTML = `<div>${action}</div>`;
  }

  header.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <div>
        ${title ? `<h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.2rem;">${title}</h3>` : ''}
        ${subtitle ? `<p style="font-size: 0.85rem; color: var(--text-secondary);">${subtitle}</p>` : ''}
      </div>
      ${actionHTML}
    </div>
  `;

  if (action && action instanceof HTMLElement) {
    header.firstElementChild.appendChild(action);
  }

  return header;
}

export function createCardBody({ children = null, className = '', contentHTML = '' }) {
  const body = document.createElement('div');
  body.className = `card-body ${className}`.trim();

  if (contentHTML) {
    body.innerHTML = contentHTML;
  } else if (children) {
    if (typeof children === 'string') {
      body.innerHTML = children;
    } else if (children instanceof HTMLElement) {
      body.appendChild(children);
    }
  }

  return body;
}

export function createCardFooter({ children = null, className = '', contentHTML = '' }) {
  const footer = document.createElement('div');
  footer.className = `card-footer ${className}`.trim();

  if (contentHTML) {
    footer.innerHTML = contentHTML;
  } else if (children) {
    if (typeof children === 'string') {
      footer.innerHTML = children;
    } else if (children instanceof HTMLElement) {
      footer.appendChild(children);
    }
  }

  return footer;
}
