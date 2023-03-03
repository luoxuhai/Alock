import { InAppBrowser, InAppBrowserOptions } from 'react-native-inappbrowser-reborn';

export function openLinkInAppBrowser(url: string, options?: InAppBrowserOptions) {
  InAppBrowser.open(encodeURI(url), {
    dismissButtonStyle: 'close',
    modalEnabled: false,
    animated: true,
    enableBarCollapsing: true,
    ...options,
  });
}
