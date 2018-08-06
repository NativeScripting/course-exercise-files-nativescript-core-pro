import {
  PtUser,
  PtLoginModel,
  PtRegisterModel,
  PtAuthToken
} from '~/core/models/domain';
import { PtAuthRepository } from '~/core/contracts/repositories/pt-auth-repository.contract';
import {
  PtStorageService,
  PtAuthService,
  PtLoggingService,
  PtAppStateService
} from '~/core/contracts/services';
import { EMPTY_STRING } from '~/core/models/domain/constants/strings';
import { getUserAvatarUrl } from '~/core/services/avatar.service';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

export class AuthService implements PtAuthService {
  constructor(
    private authRepo: PtAuthRepository,
    private storageService: PtStorageService,
    private loggingService: PtLoggingService,
    private appStateService: PtAppStateService
  ) {}

  private getToken(): PtAuthToken {
    return this.storageService.getItem<PtAuthToken>(AUTH_TOKEN_KEY);
  }

  private setToken(authToken: PtAuthToken) {
    this.storageService.setItem<PtAuthToken>(AUTH_TOKEN_KEY, authToken);
  }

  private setCurrentUser(ptUser: PtUser) {
    // first set user avatar
    ptUser.avatar = getUserAvatarUrl(this.authRepo.apiEndpoint, ptUser.id);
    // then save user to app state
    this.appStateService.setStateItem('currentUser', ptUser);
  }

  public getCurrentUser(): PtUser {
    const user = this.appStateService.getStateItem('currentUser');
    return user;
  }
  public getCurrentUserId(): number {
    const user = this.getCurrentUser();
    if (user) {
      return user.id;
    } else {
      return undefined;
    }
  }
  public isLoggedIn(): boolean {
    const hasToken = !!this.getToken();
    const hasCurrentUser = !!this.getCurrentUser();
    return hasToken && hasCurrentUser;
  }

  public login(loginModel: PtLoginModel): Promise<PtUser> {
    return new Promise((resolve, reject) => {
      this.authRepo.login(
        loginModel,
        error => {
          // Log error
          this.loggingService.error('Login failed.');
          reject(error);
        },
        (data: { authToken: PtAuthToken; user: PtUser }) => {
          this.setToken(data.authToken);
          this.setCurrentUser(data.user);
          resolve(data.user);
        }
      );
    });
  }

  public register(registerModel: PtRegisterModel): Promise<PtUser> {
    return new Promise<PtUser>((resolve, reject) => {
      this.authRepo.register(
        registerModel,
        error => {
          this.loggingService.error('Registration failed');
          reject(error);
        },
        (data: { authToken: PtAuthToken; user: PtUser }) => {
          this.setToken(data.authToken);
          this.setCurrentUser(data.user);
          resolve(this.getCurrentUser());
        }
      );
    });
  }

  public logout(): Promise<void> {
    this.setToken({
      access_token: EMPTY_STRING,
      dateExpires: new Date()
    });
    this.appStateService.setStateItem('currentUser', undefined);
    return Promise.resolve();
  }
}
