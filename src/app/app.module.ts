import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {OAuthConfig} from './core/auth/authConfig';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlockUIModule} from 'ng-block-ui';
import {SharedModule} from './shared/shared.module';
import {SignUpModule} from './sign-up/sign-up.module';

// tslint:disable-next-line:ban-types
export function initOAuth(oAuthConfig: OAuthConfig): Function {
  return () => oAuthConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.webApiUrl],
        sendAccessToken: true
      }
    }),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SignUpModule,
    FormsModule
  ],
  providers: [OAuthConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initOAuth,
      deps: [OAuthConfig],
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
