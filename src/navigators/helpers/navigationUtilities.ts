import { createNavigationContainerRef, NavigationAction } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

export function canGoBack() {
  if (navigationRef.isReady()) {
    navigationRef.canGoBack();
  }
}

export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

export const RootNavigation = {
  navigate,
  goBack,
  resetRoot,
  canGoBack,
  dispatch,
};
