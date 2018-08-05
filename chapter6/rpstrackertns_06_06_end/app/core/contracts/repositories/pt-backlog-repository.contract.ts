import { PtItem } from '~/core/models/domain';

export interface PtBacklogRepository {
  apiEndpoint: string;
  fetchPtItems(
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
