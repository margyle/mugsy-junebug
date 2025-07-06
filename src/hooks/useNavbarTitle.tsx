// hooks/useNavbarTitle.ts
import { useLocation } from '@tanstack/react-router';

export function useNavbarTitle() {
  const location = useLocation();

  const getTitleParts = () => {
    const path = location.pathname;

    // Handle root/lander page
    if (path === '/') {
      return { appName: 'mugsy', view: null };
    }

    // Handle other pages
    let viewName: string;
    switch (path) {
      case '/recipes':
        viewName = 'recipes';
        break;
      case '/cats':
        viewName = 'cats';
        break;
      case '/settings':
        viewName = 'settings';
        break;
      case '/login/mobile':
        viewName = 'login';
        break;
      default:
        viewName = path.slice(1) || 'home';
    }

    return { appName: 'mugsy', view: viewName };
  };

  return getTitleParts();
}
