import { NavigatedData, Page } from 'tns-core-modules/ui/page';

import { RegisterViewModel } from '~/shared/view-models/pages/register/register.page.vm';

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
      // Go to backlog page
    })
    .catch(error => {
      console.error(error);
      alert('Sorry, could not register you at this time');
    });
}

export function onGotoLoginTap() {
  // Go to login page
}
