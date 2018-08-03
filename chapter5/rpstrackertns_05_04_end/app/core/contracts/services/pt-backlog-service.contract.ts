import { FetchItemsResponse } from '~/core/contracts/responses/backlog';

export interface PtBacklogService {
  fetchItems(): Promise<FetchItemsResponse>;
}
