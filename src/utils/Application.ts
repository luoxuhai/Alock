import DeviceInfo from 'react-native-device-info';

export const Application = {
  name: DeviceInfo.getApplicationName(),
  version: DeviceInfo.getVersion(),
  bundleId: DeviceInfo.getBundleId(),
  buildNumber: DeviceInfo.getBuildNumber(),
  env: DeviceInfo.getInstallerPackageNameSync() as 'AppStore' | 'TestFlight' | 'Other',
};
