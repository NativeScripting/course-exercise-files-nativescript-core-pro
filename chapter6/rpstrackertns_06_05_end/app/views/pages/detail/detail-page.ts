import { EventData, NavigatedData, Page, View } from 'tns-core-modules/ui/page';
import { DetailViewModel } from '~/shared/view-models/pages/detail/detail.page.vm';
import { PtItem } from '~/core/models/domain';

let detailsVm: DetailViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  const currentItem = <PtItem>page.navigationContext;
  detailsVm = new DetailViewModel(currentItem);
  page.bindingContext = detailsVm;
}

export function onAssigneeRowTap(args: EventData) {
  const view = <View>args.object;
}
