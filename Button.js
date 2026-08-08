/**
 * UZXIAtreatr Button Component
 * Supporting variants: primary, secondary, outline, ghost, icon
 * Sizes: sm, md, lg
 * States: default, hover, active, disabled, loading
 */

export function createButton(options = {}) {
  const {
    variant = 'primary',
    size = 'md',
    label = '',
    children = null,
    icon = null,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    type = 'button',
    ariaLabel = '',
    onClick = null,
    className = '',
    href = null,
  } = options;

  const tag = href ? 'a' : 'button';
  const btn = document.createElement(tag);

  if (href) {
    btn.href = href;
  } else {
    btn.type = type;
  }

  // Class names compilation
  const classes = ['btn'];

  if (variant === 'icon') {
    classes.push('btn-icon', 'btn-secondary');
  } else {
    classes.push(`btn-${variant}`);
  }

  classes.push(`btn-${size}`);

  if (loading) classes.push('btn-loading');
  if (disabled) classes.push('btn-disabled');
  if (className) classes.push(className);

  btn.className = classes.join(' ');

  if (disabled || loading) {
    if (!href) btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
  }

  if (ariaLabel) {
    btn.setAttribute('aria-label', ariaLabel);
  } else if (variant === 'icon' && label) {
    btn.setAttribute('aria-label', label);
  }

  // Build Content
  let contentHTML = '';

  if (loading) {
    contentHTML = `<span class="btn-spinner" aria-hidden="true"></span><span>${label || 'Yuklanmoqda...'}</span>`;
  } else {
    const iconHTML = icon ? `<i data-lucide="${icon}"></i>` : '';
    const textHTML = label || (typeof children === 'string' ? children : '');

    if (variant === 'icon') {
      contentHTML = iconHTML;
    } else if (iconPosition === 'right') {
      contentHTML = `<span>${textHTML}</span>${iconHTML}`;
    } else {
      contentHTML = `${iconHTML}<span>${textHTML}</span>`;
    }
  }

  btn.innerHTML = contentHTML;

  if (children && typeof children !== 'string') {
    btn.appendChild(children);
  }

  if (onClick && !disabled && !loading) {
    btn.addEventListener('click', onClick);
  }

  return btn;
}
