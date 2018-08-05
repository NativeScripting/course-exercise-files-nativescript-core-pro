import { FetchItemsResponse } from '~/core/contracts/responses/backlog';
import {
  FetchItemsRequest,
  DeleteItemRequest
} from '~/core/contracts/requests/backlog';
import { DeleteItemResponse } from '~/core/contracts/responses/backlog';

export interface PtBacklogService {
  fetchItems(fetchItemsRequest: FetchItemsRequest): Promise<FetchItemsResponse>;

  deletePtItem(
    deleteItemRequest: DeleteItemRequest
  ): Promise<DeleteItemResponse>;
}
