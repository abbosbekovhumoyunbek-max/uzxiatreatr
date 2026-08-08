import { renderHeroSection } from '../components/home/HeroSection.js';
import { renderQuickStats } from '../components/home/QuickStats.js';
import { renderAcademyPreview } from '../components/home/AcademyPreview.js';
import { renderInteractiveFact } from '../components/home/InteractiveFact.js';
import { renderFeaturedMedia } from '../components/home/FeaturedMedia.js';
import { renderCoursesPreview } from '../components/home/CoursesPreview.js';
import { renderNewsPreview } from '../components/home/NewsPreview.js';
import { renderEventsPreview } from '../components/home/EventsPreview.js';
import { renderStudentResources } from '../components/home/StudentResources.js';
import { renderFinalCTA } from '../components/home/FinalCTA.js';

export function renderHomePage(onNavigate) {
  const homeContainer = document.createElement('div');
  homeContainer.className = 'homepage-wrapper';

  // Assembly of 10 homepage sections with visual rhythm
  homeContainer.appendChild(renderHeroSection(onNavigate));
  homeContainer.appendChild(renderQuickStats());
  homeContainer.appendChild(renderAcademyPreview(onNavigate));
  homeContainer.appendChild(renderInteractiveFact());
  homeContainer.appendChild(renderFeaturedMedia(onNavigate));
  homeContainer.appendChild(renderCoursesPreview(onNavigate));
  homeContainer.appendChild(renderNewsPreview(onNavigate));
  homeContainer.appendChild(renderEventsPreview(onNavigate));
  homeContainer.appendChild(renderStudentResources(onNavigate));
  homeContainer.appendChild(renderFinalCTA(onNavigate));

  return homeContainer;
}
