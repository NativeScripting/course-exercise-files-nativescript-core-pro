import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { RegisterViewModel } from '~/shared/view-models/pages/register/register.page.vm';
import {
  goToLoginPage,
  goToRegisterPage,
  goToBacklogPage
} from '~/shared/helpers/navigation/nav.helper';

let registerVm: RegisterViewModel;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  registerVm = new RegisterViewModel();
  page.bindingContext = registerVm;
}

export function onRegisterTap() {
  registerVm
    .onRegisterTapHandler()
    .then(() => {
      goToBacklogPage(true);
    })
    .catch(error => {
      console.error(error);
      alert('Sorry, could not register you at this time');
    });
}

export function onGotoLoginTap() {
  goToLoginPage();
}
