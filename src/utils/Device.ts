import { Platform, PlatformIOSStatic } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const Device = {
  os: Platform.OS,
  isPad: (Platform as PlatformIOSStatic).isPad,
  version: String(Platform.Version),
  modelName: DeviceInfo.getModel(),
  isEmulator: DeviceInfo.isEmulatorSync(),
};
