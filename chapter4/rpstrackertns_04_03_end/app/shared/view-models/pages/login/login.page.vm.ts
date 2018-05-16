import { Observable } from 'tns-core-modules/data/observable';
import { PtLoginModel } from '~/core/models/domain/pt-login.model';
import { PtAuthService } from '~/core/contracts/services/pt-auth-service.contract';

export class LoginViewModel extends Observable {
  private authService: PtAuthService;
  public email = 'alex@email.com';
  public password = 'nuvious';

  public loggingIn = false;

  constructor() {
    super();
  }

  public onLoginTapHandler() {
    // Pass the login model to the auth service
    const loginModel: PtLoginModel = {
      username: this.email,
      password: this.password
    };

    this.loggingIn = true;

    return new Promise((resolve, reject) => {
      this.authService
        .login(loginModel)
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
