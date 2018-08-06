import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { BacklogViewModel } from '~/shared/view-models/pages/backlog/backlog.page.vm';
import { NavigatedData, Page, EventData } from 'tns-core-modules/ui/page';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { PtItem } from '~/core/models/domain';
import {
  goToDetailPage,
  goToLoginPage,
  goToSettingsPage
} from '~/shared/helpers/navigation/nav.helper';

const backlogVm: BacklogViewModel = new BacklogViewModel();
let drawer: RadSideDrawer = null;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = backlogVm;
}

export function onLoaded(args: EventData) {
  const page = <Page>args.object;
  backlogVm.refresh();
  drawer = page.getViewById('sideDrawer');
}

export function toggleDrawer() {
  drawer.toggleDrawerState();
}

export function onListItemTap(args: ItemEventData) {
  const item = <PtItem>args.view.bindingContext;
  goToDetailPage<PtItem>(item);
}

export function onLogoutTap() {
  backlogVm.onLogoutTapHandler().then(() => goToLoginPage(true));
}

export function onSettingsTap() {
  goToSettingsPage();
}
