import { appConfig } from '~/config/app-config';
import { PtAuthRepository } from '~/core/contracts/repositories/pt-auth-repository.contract';
import { AuthRepository } from '~/infrastructure/repositories/auth.repository';
import { PtAuthService } from '~/core/contracts/services/pt-auth-service.contract';
import { AuthService } from '~/core/services/auth/auth.service';

const authRepo: PtAuthRepository = new AuthRepository(appConfig.apiEndpoint);

const authService: PtAuthService = new AuthService(authRepo);

// Service providers
export function getAuthService(): PtAuthService {
  return authService;
}
