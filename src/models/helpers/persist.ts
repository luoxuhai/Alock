/**
 * https://github.com/agilgur5/mst-persist/blob/master/src/index.ts
 */
import { onSnapshot, applySnapshot, IStateTreeNode } from 'mobx-state-tree';
import * as storage from '@/utils/storage';

export interface IArgs<T> {
  (name: string, store: IStateTreeNode, options?: IOptions<T>): void;
}
export interface IOptions<T> {
  readonly whitelist?: Array<T>;
  readonly blacklist?: Array<T>;
}
type StrToAnyMap = { [key: string]: any };

export function persist<T extends string>(
  name: string,
  store: any,
  options: IOptions<T> = {},
): IArgs<T> | null {
  const { whitelist, blacklist } = options;

  const whitelistDict = arrToDict(whitelist);
  const blacklistDict = arrToDict(blacklist);

  onSnapshot(store, (_snapshot: StrToAnyMap) => {
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    const snapshot = { ..._snapshot };
    Object.keys(snapshot).forEach((key) => {
      if (whitelist && !whitelistDict[key]) {
        delete snapshot[key];
      }
      if (blacklist && blacklistDict[key]) {
        delete snapshot[key];
      }
    });

    storage.set(name, snapshot);
  });

  const snapshot = storage.get(name, 'object');
  if (!snapshot) {
    return null;
  }

  applySnapshot(store, snapshot);

  return snapshot;
}

type StrToBoolMap = { [key: string]: boolean };

function arrToDict(arr?: Array<string>): StrToBoolMap {
  if (!arr) {
    return {};
  }
  return arr.reduce((dict: StrToBoolMap, elem) => {
    dict[elem] = true;
    return dict;
  }, {});
}

export default persist;
