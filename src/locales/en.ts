import { Translations } from './zh';

const en: Translations = {
  common: {
    ok: 'OK',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    closed: 'Closed',
    opened: 'Opened',
    close: 'Close',
    done: 'Done',
    share: 'Share',
    appName: 'Alock',
  },
  homeScreen: {
    hideAppEnabled: 'Hide Apps',
    lockAppEnabled: 'Lock Apps',
    count: 'Number of Apps Selected',
    applicationPicker: {
      title: 'SELECT APP',
      permission: {
        title: 'Grant Permission',
        message: 'Please grant screen time access restrictions to use this feature normally',
        button: 'Grant Screen Time Permission',
      },
    },
  },
  appLockScreen: {
    unlockTip: 'App is locked, click the icon to unlock',
    touchID: 'Touch ID',
    faceID: 'Face ID',
  },
  settingsScreen: {
    title: 'Settings',
    version: 'Version',
    connect: 'Contact Developer',
    goodReview: 'Review',
    share: 'Share App',
    recommend: {
      title: 'MY MORE APPS',
      appName: 'Privacy Box',
      desc: 'Hide private pictures, videos and files',
    },
    agreement: 'AGREEMENT',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    security: {
      title: 'SECURITY SETTINGS',
      lock: 'Unlock with {{type}}',
      tip: 'After opening, the App will automatically lock when it enters the background',
    },
    donate: {
      purchasing: 'Paying',
      success: 'Thank you for your donation',
      fail: 'Donation failed',
      title: 'Buy Me a Coffee (Donation)',
      subtitle: 'Support us to develop more free and easy-to-use apps',
    },
    openSource: {
      title: 'The APP is open source, welcome to Star and PR 👉',
    },
  },
  permissionManager: {
    faceID: 'Face ID',
    unavailable: '{{permission}} function is unavailable',
    blocked:
      'Please go to the settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
  },
};

export default en;

export type { Translations };
