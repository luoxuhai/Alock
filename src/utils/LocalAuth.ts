import ReactNativeBiometrics from 'react-native-biometrics';
import { PermissionManager } from './PermissionManager';

export enum BiometryType {
  None = '',
  TouchID = 'TouchID',
  FaceID = 'FaceID',
}

export class LocalAuth {
  public static shared = new LocalAuth();

  private biometryType = BiometryType.None;
  private biometrics: ReactNativeBiometrics;

  constructor() {
    this.biometrics = new ReactNativeBiometrics();
  }

  public async getBiometryType() {
    if (![BiometryType.FaceID, BiometryType.TouchID].includes(this.biometryType)) {
      this.biometrics.allowDeviceCredentials = true;
      const { biometryType } = (await this.biometrics.isSensorAvailable()) ?? {};
      this.biometryType = biometryType as BiometryType;
    }

    return this.biometryType;
  }

  public async requestAuth() {
    if (!(await PermissionManager.checkPermissions(['ios.permission.FACE_ID']))) {
      return;
    }

    this.biometrics.allowDeviceCredentials = false;
    const { success } = await this.biometrics.simplePrompt({
      promptMessage: 'Authenticate to continue',
    });

    return success;
  }
}
