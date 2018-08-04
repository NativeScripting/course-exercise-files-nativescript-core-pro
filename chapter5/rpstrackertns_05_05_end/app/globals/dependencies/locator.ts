import { appConfig } from '~/config/app-config';
import { PtAuthRepository } from '~/core/contracts/repositories/pt-auth-repository.contract';
import { AuthRepository } from '~/infrastructure/repositories/auth.repository';
import { PtAuthService } from '~/core/contracts/services/pt-auth-service.contract';
import { AuthService } from '~/core/services/auth/auth.service';
import {
  PtStorageRepository,
  PtLoggingRepository,
  PtBacklogRepository
} from '~/core/contracts/repositories';
import { StorageRepository } from '~/infrastructure/local/storage.repository';
import {
  PtStorageService,
  PtLoggingService,
  PtAppStateService
} from '~/core/contracts/services';
import { StorageService } from '~/core/services/storage.service';
import { LoggingRepository } from '~/infrastructure/repositories/logging.repository';
import { LoggingService } from '~/core/services/logging.service';
import { BacklogRepository } from '~/infrastructure/repositories';
import { AppStateService } from '~/core/services';
import { PtBacklogService } from '~/core/contracts/services/pt-backlog-service.contract';
import { BacklogService } from '~/core/services/backlog/backlog.service';

// Init repositories
const loggingRepo: PtLoggingRepository = new LoggingRepository(
  appConfig.loggingEnabled,
  appConfig.loggingLevel
);
const backlogRepo: PtBacklogRepository = new BacklogRepository(
  appConfig.apiEndpoint
);
const authRepo: PtAuthRepository = new AuthRepository(appConfig.apiEndpoint);
const storageRepo: PtStorageRepository = new StorageRepository();

// Init services
const loggingService: PtLoggingService = new LoggingService(loggingRepo);
const storageService: PtStorageService = new StorageService(storageRepo);
const appStateService: PtAppStateService = new AppStateService(storageService);
const authService: PtAuthService = new AuthService(
  authRepo,
  storageService,
  loggingService,
  appStateService
);
const backlogService: PtBacklogService = new BacklogService(
  loggingService,
  backlogRepo,
  appStateService
);

// Service providers
export function getAuthService(): PtAuthService {
  return authService;
}

export function getBacklogService(): PtBacklogService {
  return backlogService;
}
