export function renderPageContainer(contentElement) {
  const main = document.createElement('main');
  main.style.paddingTop = 'var(--navbar-height)';
  main.style.minHeight = 'calc(100vh - var(--navbar-height))';
  
  if (contentElement) {
    main.appendChild(contentElement);
  }
  return main;
}
