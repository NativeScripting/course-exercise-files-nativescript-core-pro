import { EventData, NavigatedData, Page, View } from 'tns-core-modules/ui/page';
import { ConfirmOptions, confirm } from 'tns-core-modules/ui/dialogs';
import { DetailViewModel } from '~/shared/view-models/pages/detail/detail.page.vm';
import { PtItem } from '~/core/models/domain';
import { goBack } from '~/shared/helpers/navigation/nav.helper';

let detailsVm: DetailViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  const currentItem = <PtItem>page.navigationContext;
  detailsVm = new DetailViewModel(currentItem);
  page.bindingContext = detailsVm;
}

export function onDeleteTap() {
  const options: ConfirmOptions = {
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    okButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  };
  // confirm with options, with promise
  confirm(options).then((result: boolean) => {
    // result can be true/false/undefined
    if (result) {
      detailsVm.deleteRequested();
    }
  });
}

export function onAssigneeRowTap(args: EventData) {
  const view = <View>args.object;
}

export function onNavBackTap() {
  goBack();
}
