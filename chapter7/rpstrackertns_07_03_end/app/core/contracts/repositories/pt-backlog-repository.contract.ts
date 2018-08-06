import { PtItem } from '~/core/models/domain';
import { PresetType } from '~/core/models/types';

export interface PtBacklogRepository {
  apiEndpoint: string;
  fetchPtItems(
    currentPreset: PresetType,
    currentUserId: number,
    errorHandler: (error: any) => void,
    successHandler: (data: PtItem[]) => void
  ): void;

  deletePtItem(
    itemId: number,
    errorHandler: (error: any) => void,
    successHandler: () => void
  ): void;
}
