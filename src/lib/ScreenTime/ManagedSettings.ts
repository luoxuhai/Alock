import { NativeModules } from 'react-native';

export async function setBlockedApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.setBlockedApplications();
}

export async function clearBlockedApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.clearBlockedApplications();
}

export async function getSelectedApplicationsCount(): Promise<number> {
  return await NativeModules.RNManagedSettings.getSelectedApplicationsCount();
}

export async function setShieldApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.setShieldApplications();
}

export async function clearShieldApplications(): Promise<void> {
  return await NativeModules.RNManagedSettings.clearShieldApplications();
}

export async function requestAuthorization(): Promise<void> {
  return await NativeModules.RNManagedSettings.requestAuthorization();
}

export async function isApproved(): Promise<boolean> {
  const status = await NativeModules.RNManagedSettings.getAuthorizationStatus();
  return status === 2;
}
