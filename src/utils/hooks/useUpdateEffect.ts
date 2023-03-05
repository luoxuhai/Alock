import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  if (deps === undefined) {
    deps = [];
  }

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current === true) {
      firstRun.current = false;
      return;
    }
    return effect();
  }, deps);
}
