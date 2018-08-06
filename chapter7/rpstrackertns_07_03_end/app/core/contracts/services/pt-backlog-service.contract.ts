import { FetchItemsResponse } from '~/core/contracts/responses/backlog';
import {
  FetchItemsRequest,
  DeleteItemRequest
} from '~/core/contracts/requests/backlog';
import { DeleteItemResponse } from '~/core/contracts/responses/backlog';
import { PresetType } from '~/core/models/types';

export interface PtBacklogService {
  getCurrentPreset(): PresetType;

  setPreset(preset): Promise<void>;

  fetchItems(fetchItemsRequest: FetchItemsRequest): Promise<FetchItemsResponse>;

  deletePtItem(
    deleteItemRequest: DeleteItemRequest
  ): Promise<DeleteItemResponse>;
}
