import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';


export const oAuthConfig: AuthConfig = {

  clientId: 'client',
  scope: 'openid offline_access webApi profile',
  oidc: false,
  issuer: environment.identityServer.url,
  requireHttps: true,
  strictDiscoveryDocumentValidation: false,
  dummyClientSecret: environment.identityServer.secret,
  useHttpBasicAuth: true
};

@Injectable()

export class OAuthConfig {

  constructor(private oAuthService: OAuthService) {
  }

  load(): void {
    this.oAuthService.tokenEndpoint = `${environment.identityServer.url}/connect/token`;
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.setStorage(localStorage);
  }
}
