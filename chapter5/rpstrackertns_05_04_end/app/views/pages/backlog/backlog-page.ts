import { BacklogViewModel } from '~/shared/view-models/pages/backlog/backlog.page.vm';
import { NavigatedData, Page, EventData } from 'tns-core-modules/ui/page';

const backlogVm: BacklogViewModel = new BacklogViewModel();

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = backlogVm;
}

export function onLoaded(args: EventData) {
  backlogVm.refresh();
}
