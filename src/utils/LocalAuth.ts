import ReactNativeBiometrics from 'react-native-biometrics';
import { PermissionManager } from './PermissionManager';

export enum BiometryType {
  Unknown = 'Unknown',
  TouchID = 'TouchID',
  FaceID = 'FaceID',
}

export class LocalAuth {
  public static shared = new LocalAuth();

  private biometryType?: BiometryType;
  private biometrics: ReactNativeBiometrics;

  constructor() {
    this.biometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });
  }

  public async getBiometryType() {
    if (!this.biometryType) {
      const { biometryType } = (await this.biometrics.isSensorAvailable()) ?? {};

      console.log('biometryType', biometryType);
      this.biometryType = biometryType as BiometryType;
    }

    return this.biometryType || BiometryType.Unknown;
  }

  public async requestAuth() {
    if (!(await PermissionManager.checkPermissions(['ios.permission.FACE_ID']))) {
      return;
    }

    const { success } = await this.biometrics.simplePrompt({
      promptMessage: 'Authenticate to continue',
    });

    return success;
  }
}
