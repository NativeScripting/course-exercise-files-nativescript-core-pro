import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { LoginViewModel } from '~/shared/view-models/pages/login/login.page.vm';

let loginVm = null;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  loginVm = new LoginViewModel();
  page.bindingContext = loginVm;
}

export function onLoginTap() {
  // Let the VM know about login action
  loginVm
    .onLoginTapHandler()
    .then(() => {
      // go to backlog page
    })
    .catch(error => {
      console.error(error);
      alert('Sorry, could not log in at this time');
    });
}

export function onGotoRegisterTap() {
  // Navigate to the register page
}
