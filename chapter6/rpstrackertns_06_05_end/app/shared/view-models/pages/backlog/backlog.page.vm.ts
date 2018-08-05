import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { PtItem } from '~/core/models/domain';
import { PtBacklogService } from '~/core/contracts/services/pt-backlog-service.contract';
import {
  getBacklogService,
  getAuthService
} from '~/globals/dependencies/locator';
import { toFetchItemsRequest } from '~/core/contracts/requests/backlog';
import { PtAuthService } from '~/core/contracts/services';

export class BacklogViewModel extends Observable {
  private authService: PtAuthService;
  private backlogService: PtBacklogService;

  public items: ObservableArray<PtItem> = new ObservableArray<PtItem>();

  constructor() {
    super();

    this.authService = getAuthService();
    this.backlogService = getBacklogService();
  }

  public refresh() {
    const fetchReq = toFetchItemsRequest(this.authService.getCurrentUserId());

    this.backlogService.fetchItems(fetchReq).then(response => {
      // empty the observable array
      this.items.length = 0;

      // push the result into the array
      this.items.push(response.items);
    });
  }
}
