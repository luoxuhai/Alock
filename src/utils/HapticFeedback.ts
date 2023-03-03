import Haptic from 'react-native-haptic-feedback';

export class HapticFeedback {
  static impact = {
    light: () => {
      Haptic.trigger('impactLight');
    },
    medium: () => {
      Haptic.trigger('impactMedium');
    },
    heavy: () => {
      Haptic.trigger('impactHeavy');
    },
  };

  static notification = {
    success: () => {
      Haptic.trigger('notificationSuccess');
    },
    error: () => {
      Haptic.trigger('notificationError');
    },
    warning: () => {
      Haptic.trigger('notificationWarning');
    },
  };

  static selection() {
    Haptic.trigger('selection');
  }
}
