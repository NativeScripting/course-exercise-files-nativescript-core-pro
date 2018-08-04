import { PtBacklogService } from '~/core/contracts/services/pt-backlog-service.contract';
import { FetchItemsResponse } from '~/core/contracts/responses/backlog';
import { PtItem } from '~/core/models/domain';
import { PtLoggingService, PtAppStateService } from '~/core/contracts/services';
import { PtBacklogRepository } from '~/core/contracts/repositories';

export class BacklogService implements PtBacklogService {
  constructor(
    private loggingService: PtLoggingService,
    private backlogRepo: PtBacklogRepository,
    private appStateService: PtAppStateService
  ) {}

  public fetchItems(): Promise<FetchItemsResponse> {
    return new Promise<FetchItemsResponse>((resolve, reject) => {
      this.backlogRepo.fetchPtItems(
        error => {
          this.loggingService.error('Fetch items failed');
          reject(error);
        },
        (ptItems: PtItem[]) => {
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
