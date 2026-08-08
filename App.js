import { renderNavbar } from './components/layout/Navbar.js';
import { renderFooter } from './components/layout/Footer.js';
import { renderPageContainer } from './components/layout/PageContainer.js';
import { renderScrollProgress } from './components/common/ScrollProgress.js';
import { renderBackToTop } from './components/common/BackToTop.js';
import { createCommandPalette } from './components/common/CommandPalette.js';
import { renderAIAssistant } from './components/ai/AIAssistant.js';

// Page Imports
import { renderHomePage } from './pages/Home.js';
import { renderAIAcademyPage } from './pages/AIAcademy.js';
import { renderCoursesPage } from './pages/Courses.js';
import { renderMediaPage } from './pages/Media.js';
import { renderNewsPage } from './pages/News.js';
import { renderEventsPage } from './pages/Events.js';
import { renderStudentsPage } from './pages/Students.js';
import { renderInteractivePage } from './pages/Interactive.js';
import { renderAboutPage } from './pages/About.js';
import { renderContactPage } from './pages/Contact.js';
import { renderLoginPage } from './pages/Login.js';
import { renderRegisterPage } from './pages/Register.js';
import { renderDashboardPage } from './pages/Dashboard.js';
import { renderComponentShowcase } from './components/common/ComponentShowcase.js';

export function createApp() {
  const root = document.getElementById('root');
  let activeSection = window.location.hash ? window.location.hash.replace('#', '') : 'home';

  function handleNavigate(sectionId) {
    activeSection = sectionId;
    window.location.hash = `#${sectionId}`;

    const anchor = document.getElementById(sectionId);
    if (anchor && (window.location.hash === '#home' || !window.location.hash)) {
      anchor.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    render();
  }

  // Command Palette Keyboard shortcut initializer
  createCommandPalette(handleNavigate);

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== activeSection) {
      activeSection = hash;
      render();
    }
  });

  function getPageContent(route) {
    switch (route) {
      case 'academy':
        return renderAIAcademyPage(handleNavigate);
      case 'courses':
        return renderCoursesPage(handleNavigate);
      case 'media':
        return renderMediaPage(handleNavigate);
      case 'news':
        return renderNewsPage(handleNavigate);
      case 'events':
        return renderEventsPage(handleNavigate);
      case 'students':
        return renderStudentsPage(handleNavigate);
      case 'interactive':
        return renderInteractivePage(handleNavigate);
      case 'about':
        return renderAboutPage(handleNavigate);
      case 'contact':
        return renderContactPage(handleNavigate);
      case 'login':
        return renderLoginPage(handleNavigate);
      case 'register':
        return renderRegisterPage(handleNavigate);
      case 'dashboard':
        return renderDashboardPage(handleNavigate);
      case 'components-test':
        return renderComponentShowcase();
      case 'home':
      default:
        return renderHomePage(handleNavigate);
    }
  }

  function render() {
    root.innerHTML = '';
    const shell = document.createElement('div');
    shell.className = 'app-shell';

    // Global Floating Elements
    const scrollProgress = renderScrollProgress();
    const backToTop = renderBackToTop();
    const aiAssistant = renderAIAssistant();

    const navbar = renderNavbar(activeSection, handleNavigate);
    const contentElement = getPageContent(activeSection);
    const mainContainer = renderPageContainer(contentElement);
    const footer = renderFooter(handleNavigate);

    shell.appendChild(scrollProgress);
    shell.appendChild(navbar);
    shell.appendChild(mainContainer);
    shell.appendChild(footer);
    shell.appendChild(backToTop);
    shell.appendChild(aiAssistant);

    root.appendChild(shell);

    if (window.lucide) {
      window.lucide.createIcons();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { render };
}
