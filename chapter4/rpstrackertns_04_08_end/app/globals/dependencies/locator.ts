import { appConfig } from '~/config/app-config';
import { PtAuthRepository } from '~/core/contracts/repositories/pt-auth-repository.contract';
import { AuthRepository } from '~/infrastructure/repositories/auth.repository';
import { PtAuthService } from '~/core/contracts/services/pt-auth-service.contract';
import { AuthService } from '~/core/services/auth/auth.service';
import { PtStorageRepository } from '~/core/contracts/repositories';
import { StorageRepository } from '~/infrastructure/local/storage.repository';
import { PtStorageService } from '~/core/contracts/services';
import { StorageService } from '~/core/services/storage.service';

// Init repositories
const authRepo: PtAuthRepository = new AuthRepository(appConfig.apiEndpoint);
const storageRepo: PtStorageRepository = new StorageRepository();

// Init services
const storageService: PtStorageService = new StorageService(storageRepo);
const authService: PtAuthService = new AuthService(authRepo, storageService);

// Service providers
export function getAuthService(): PtAuthService {
  return authService;
}
