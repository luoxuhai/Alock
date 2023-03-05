import { useEffect, useState } from 'react';
import { LocalAuth, BiometryType } from '../LocalAuth';
import { useAppState } from './useAppState';

export function useBiometryType() {
  const [biometryType, setBiometryType] = useState<BiometryType>();
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      LocalAuth.shared.getBiometryType().then(setBiometryType);
    }
  }, [appState]);

  return biometryType;
}
