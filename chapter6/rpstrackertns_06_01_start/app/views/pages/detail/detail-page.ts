import { EventData, NavigatedData, Page, View } from 'tns-core-modules/ui/page';
import { DetailViewModel } from '~/shared/view-models/pages/detail/detail.page.vm';

let detailsVm: DetailViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;

  detailsVm = new DetailViewModel();
  page.bindingContext = detailsVm;
}

export function onAssigneeRowTap(args: EventData) {
  const view = <View>args.object;
}
