// ANGULAR:
import { ApplicationConfig, enableProdMode, isDevMode } from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

// IONIC:
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// APP:
import { environment } from 'environments/environment';
import { routes } from './app.routes';
import { TokenInterceptorService } from './CORE/Auth/Interceptors/token-interceptor.service';




if (environment.production) { enableProdMode();}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptorService])
    ),
    // provideHttpClient(withInterceptors([TokenInterceptorService])),
  ],
};

defineCustomElements(window);
