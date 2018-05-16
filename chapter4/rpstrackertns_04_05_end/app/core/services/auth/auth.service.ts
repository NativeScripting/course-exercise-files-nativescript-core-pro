import { PtAuthService } from '~/core/contracts/services/pt-auth-service.contract';
import {
  PtUser,
  PtLoginModel,
  PtRegisterModel,
  PtAuthToken
} from '~/core/models/domain';
import { PtAuthRepository } from '~/core/contracts/repositories/pt-auth-repository.contract';

export class AuthService implements PtAuthService {
  constructor(private authRepo: PtAuthRepository) {}

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
          reject(error);
        },
        (data: { authToken: PtAuthToken; user: PtUser }) => {
          resolve(data.user);
        }
      );
    });
  }
  public register(registerModel: PtRegisterModel): Promise<PtUser> {
    throw new Error('Method not implemented.');
  }
  public logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
