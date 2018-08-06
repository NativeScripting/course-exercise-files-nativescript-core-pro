import { Observable } from 'tns-core-modules/data/observable';
import { PtAuthService } from '~/core/contracts/services';
import { PtRegisterModel } from '~/core/models/domain';
import { EMPTY_STRING } from '~/core/models/domain/constants/strings';
import { getAuthService } from '~/globals/dependencies/locator';

export class RegisterViewModel extends Observable {
  private authService: PtAuthService;

  public fullName = EMPTY_STRING;
  public email = EMPTY_STRING;
  public password = EMPTY_STRING;
  public loggingIn = false;

  constructor() {
    super();
    this.authService = getAuthService();
  }

  public onRegisterTapHandler() {
    const registerModel: PtRegisterModel = {
      username: this.email,
      password: this.password,
      fullName: this.fullName
    };

    return new Promise((resolve, reject) => {
      this.authService
        .register(registerModel)
        .then(() => {
          this.loggingIn = false;
          resolve();
        })
        .catch(er => {
          this.loggingIn = false;
          reject(er);
        });
    });
  }
}
