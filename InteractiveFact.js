import { renderDailyFact } from '../interactive/DailyFact.js';

export function renderInteractiveFact() {
  const section = document.createElement('section');
  section.className = 'interactive-fact-section';
  section.id = 'interactive-fact';
  section.style.padding = '5rem 0';
  section.style.background = 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 20, 1) 100%)';

  const container = document.createElement('div');
  container.className = 'container';

  const dailyFactElement = renderDailyFact({ initialCategory: 'Barchasi' });
  container.appendChild(dailyFactElement);

  section.appendChild(container);
  return section;
}
