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
    hello: 'Hello!',
    applicationPicker: {
      title: '选择 App',
    },
  },
  settingsScreen: {
    title: 'Settings',
    version: 'Version',
    connect: 'Contact the developer',
    goodReview: 'Review',
    share: 'Share App',
    recommend: {
      title: 'My More Apps',
      appName: 'Privacy Box',
      desc: 'Hide private pictures, videos and files',
    },
    agreement: 'Agreement',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    security: {
      title: 'Security Settings',
      lock: '{{type}} unlock',
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
  applicationPickerScreen: {
    title: 'Select Application',
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
