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
  PtLoggingService
} from '~/core/contracts/services';
import { EMPTY_STRING } from '~/core/models/domain/constants/strings';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

export class AuthService implements PtAuthService {
  constructor(
    private authRepo: PtAuthRepository,
    private storageService: PtStorageService,
    private loggingService: PtLoggingService
  ) {}

  private getToken(): PtAuthToken {
    return this.storageService.getItem<PtAuthToken>(AUTH_TOKEN_KEY);
  }

  private setToken(authToken: PtAuthToken) {
    this.storageService.setItem<PtAuthToken>(AUTH_TOKEN_KEY, authToken);
  }

  public getCurrentUser(): PtUser {
    throw new Error('Method not implemented.');
  }
  public getCurrentUserId(): number {
    throw new Error('Method not implemented.');
  }
  public isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
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
          resolve(data.user);
        }
      );
    });
  }

  public register(registerModel: PtRegisterModel): Promise<PtUser> {
    throw new Error('Method not implemented.');
  }

  public logout(): Promise<void> {
    this.setToken({
      access_token: EMPTY_STRING,
      dateExpires: new Date()
    });
    return Promise.resolve();
  }
}
