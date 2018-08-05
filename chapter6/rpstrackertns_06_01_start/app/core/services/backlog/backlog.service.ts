import { PtBacklogService } from '~/core/contracts/services/pt-backlog-service.contract';
import { FetchItemsResponse } from '~/core/contracts/responses/backlog';
import { PtItem } from '~/core/models/domain';
import { PtLoggingService, PtAppStateService } from '~/core/contracts/services';
import { PtBacklogRepository } from '~/core/contracts/repositories';
import { FetchItemsRequest } from '~/core/contracts/requests/backlog';
import { setUserAvatar } from '~/core/services/avatar.service';

export class BacklogService implements PtBacklogService {
  constructor(
    private loggingService: PtLoggingService,
    private backlogRepo: PtBacklogRepository,
    private appStateService: PtAppStateService
  ) {}

  public fetchItems(
    fetchItemsRequest: FetchItemsRequest
  ): Promise<FetchItemsResponse> {
    return new Promise<FetchItemsResponse>((resolve, reject) => {
      this.backlogRepo.fetchPtItems(
        fetchItemsRequest.currentUserId,
        error => {
          this.loggingService.error('Fetch items failed');
          reject(error);
        },
        (ptItems: PtItem[]) => {
          ptItems.forEach(i => {
            setUserAvatar(this.backlogRepo.apiEndpoint, i.assignee);
            i.comments.forEach(c =>
              setUserAvatar(this.backlogRepo.apiEndpoint, c.user)
            );
          });

          this.appStateService.setStateItem('backlogItems', ptItems);
          const response: FetchItemsResponse = {
            items: ptItems
          };
          resolve(response);
        }
      );
    });
  }
}
