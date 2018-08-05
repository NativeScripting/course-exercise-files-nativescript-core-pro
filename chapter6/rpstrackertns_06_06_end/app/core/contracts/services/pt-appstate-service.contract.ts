import { PtItem, PtUser } from '~/core/models/domain';

export const APP_STATE_KEY = 'APP_STATE_KEY';

export interface PtAppState {
  backlogItems: PtItem[];
  currentUser: PtUser;
}

export interface PtAppStateService {
  getStateItem<K extends keyof PtAppState>(name: K): PtAppState[K];
  setStateItem<K extends keyof PtAppState>(name: K, state: PtAppState[K]): void;
}
