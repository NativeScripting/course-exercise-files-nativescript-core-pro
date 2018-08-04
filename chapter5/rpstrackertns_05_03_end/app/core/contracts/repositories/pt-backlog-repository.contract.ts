import { PtItem } from '~/core/models/domain';

export interface PtBacklogRepository {
  apiEndpoint: string;
  fetchPtItems(
    errorHandler: (error: any) => void,
    successHandler: (data: PtItem[]) => void
  ): void;
}
