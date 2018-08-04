import { PtBacklogRepository } from '~/core/contracts/repositories';
import { PtItem } from '~/core/models/domain';
import { PriorityEnum, StatusEnum } from '~/core/models/domain/enums';

export class BacklogRepository implements PtBacklogRepository {
  constructor(public apiEndpoint: string) {}

  public fetchPtItems(
    errorHandler: (error: any) => void,
    successHandler: (data: PtItem[]) => void
  ) {
    // return backlog items
    const fakeBacklogItems: PtItem[] = [
      {
        id: 1,
        title: 'item 1',
        dateCreated: new Date(),
        dateModified: new Date(),
        type: 'PBI',
        estimate: 1,
        priority: PriorityEnum.High,
        status: StatusEnum.Open,
        assignee: null,
        tasks: [],
        comments: []
      },
      {
        id: 2,
        title: 'item 2',
        dateCreated: new Date(),
        dateModified: new Date(),
        type: 'Bug',
        estimate: 1,
        priority: PriorityEnum.High,
        status: StatusEnum.Open,
        assignee: null,
        tasks: [],
        comments: []
      }
    ];
    successHandler(fakeBacklogItems);
  }
}
