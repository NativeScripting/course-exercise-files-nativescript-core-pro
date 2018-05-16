import { PtLoginModel } from '~/core/models/domain/pt-login.model';

export interface PtAuthService {
  login(loginModel: PtLoginModel): Promise<void>;
}
