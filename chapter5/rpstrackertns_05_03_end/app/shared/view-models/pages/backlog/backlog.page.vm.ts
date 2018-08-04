import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { PtItem } from '~/core/models/domain';
import { PtBacklogService } from '~/core/contracts/services/pt-backlog-service.contract';
import { getBacklogService } from '~/globals/dependencies/locator';

export class BacklogViewModel extends Observable {
  private backlogService: PtBacklogService;

  public items: ObservableArray<PtItem> = new ObservableArray<PtItem>();

  constructor() {
    super();

    this.backlogService = getBacklogService();
  }

  public refresh() {
    this.backlogService.fetchItems().then(response => {
      // empty the observable array
      this.items.length = 0;

      // push the result into the array
      this.items.push(response.items);
    });
  }
}
