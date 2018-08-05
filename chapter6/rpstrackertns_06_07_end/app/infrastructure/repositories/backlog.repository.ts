import { PtBacklogRepository } from '~/core/contracts/repositories';
import { PtItem } from '~/core/models/domain';
import { PriorityEnum, StatusEnum } from '~/core/models/domain/enums';
import { handleFetchErrors } from '~/infrastructure/fetch-error-handler';

export class BacklogRepository implements PtBacklogRepository {
  constructor(public apiEndpoint: string) {}

  private getFilteredBacklogUrl(currentUserId?: number) {
    if (currentUserId) {
      return `${this.apiEndpoint}/myItems?userId=${currentUserId}`;
    } else {
      return `${this.apiEndpoint}/backlog`;
    }
  }

  private deletePtItemUrl(itemId: number) {
    return `${this.apiEndpoint}/item/${itemId}`;
  }

  public fetchPtItems(
    currentUserId: number,
    errorHandler: (error: any) => void,
    successHandler: (data: PtItem[]) => void
  ) {
    fetch(this.getFilteredBacklogUrl(currentUserId), {
      method: 'GET'
    })
      .then(handleFetchErrors)
      .then(data => {
        successHandler(data);
      })
      .catch(er => {
        errorHandler(er);
      });
  }

  public deletePtItem(
    itemId: number,
    errorHandler: (error: any) => void,
    successHandler: () => void
  ) {
    fetch(this.deletePtItemUrl(itemId), {
      method: 'DELETE'
    })
      .then(handleFetchErrors)
      .then(() => {
        successHandler();
      })
      .catch(er => {
        errorHandler(er);
      });
  }
}
