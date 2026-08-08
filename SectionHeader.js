/**
 * UZXIAtreatr SectionHeader Component
 * Uniform section headings across homepage and feature pages.
 */

export function createSectionHeader(options = {}) {
  const {
    eyebrow = '',
    title = '',
    description = '',
    align = 'center',
    action = null,
    badgeVariant = 'cyan',
    gradientTitle = false,
    className = '',
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = `section-header-wrapper ${className}`.trim();

  const isBetween = align === 'left' && action !== null;
  const innerClass = isBetween ? 'section-header-inner align-between' : 'section-header-inner';

  const contentDiv = document.createElement('div');
  contentDiv.className = `section-header-content text-${align}`;

  let eyebrowHTML = '';
  if (eyebrow) {
    eyebrowHTML = `
      <div class="section-eyebrow">
        <span class="badge badge-${badgeVariant}">
          <i data-lucide="sparkles" size="14"></i>
          <span>${eyebrow}</span>
        </span>
      </div>
    `;
  }

  const titleClass = gradientTitle ? 'section-title text-gradient' : 'section-title';
  const titleHTML = title ? `<h2 class="${titleClass}">${title}</h2>` : '';
  const descHTML = description ? `<p class="section-description">${description}</p>` : '';

  contentDiv.innerHTML = `${eyebrowHTML}${titleHTML}${descHTML}`;

  const innerDiv = document.createElement('div');
  innerDiv.className = innerClass;
  innerDiv.appendChild(contentDiv);

  if (action) {
    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'section-action';
    if (action instanceof HTMLElement) {
      actionWrapper.appendChild(action);
    } else if (typeof action === 'string') {
      actionWrapper.innerHTML = action;
    }
    innerDiv.appendChild(actionWrapper);
  }

  wrapper.appendChild(innerDiv);
  return wrapper;
}
