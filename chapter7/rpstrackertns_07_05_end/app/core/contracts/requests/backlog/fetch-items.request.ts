import { PresetType } from '~/core/models/types';

export interface FetchItemsRequest {
  currentPreset: PresetType;
  currentUserId: number;
}

export function toFetchItemsRequest(
  currentPreset: PresetType,
  currentUserId: number
): FetchItemsRequest {
  return {
    currentPreset,
    currentUserId
  };
}
