export interface FetchItemsRequest {
  currentUserId: number;
}

export function toFetchItemsRequest(currentUserId: number): FetchItemsRequest {
  return {
    currentUserId
  };
}
