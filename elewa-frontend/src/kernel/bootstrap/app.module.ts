// Angular Core Modules
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Apollo
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// External Library Stubs
import { ElewaCoreModule } from '../../modules/elewa-core/elewa-core.module';

// Angular Configuration
import { AppComponent } from './app.component'; // (Bootstrap)

import { AppRoutingModule }  from '../routing/router.module';

// Core Elewa Modules
import { AuthModule } from '../../modules/auth/auth.module';

// Model Elewa Modules

// Services
import { Logger } from '../services/logger/logger.service';
import { DebugLogger } from '../services/logger/debuglogger.service';

import { GraphqlService } from '../services/graphql/graphql.service';
import { GraphqlInitService } from '../services/graphql/graphql-init.service';

import { TransclusionHelper } from '../services/transclusion-helper/transclusion-helper.service';
import { HomeModule } from '../../modules/home/home.module';

/**
 * Main root module. Launches the application
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule, BrowserModule, ReactiveFormsModule,
    HttpClientModule, ApolloModule, HttpLinkModule,

    ElewaCoreModule,

    AppRoutingModule,
  
    AuthModule, HomeModule
  ],
  providers: [
    // Provide is either a type, a string or an instance of InjectionToken. Best case is to use classes.
    { provide: Logger, useClass: DebugLogger },
    { provide: GraphqlInitService, useClass: GraphqlInitService },
    { provide: GraphqlService, useClass: GraphqlService },
    // If provide = useClass -> Just put class here directly
    TransclusionHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  constructor(graphqlInitService: GraphqlInitService) {
    // Init configuration settings needed to connect to backend
    graphqlInitService.initGraphql();
  }

}
