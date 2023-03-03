import { NativeModules } from 'react-native';

export async function setBlockedApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.setBlockedApplications();
}

export async function clearBlockedApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.clearBlockedApplications();
}

export async function getBlockedApplicationsCount(): Promise<number> {
  return await NativeModules.RNManagedSettings.getBlockedApplicationsCount();
}

export async function requestAuthorization(): Promise<void> {
  return await NativeModules.RNManagedSettings.requestAuthorization();
}

export async function isApproved(): Promise<boolean> {
  const status = await NativeModules.RNManagedSettings.getAuthorizationStatus();
  return status === 2;
}
