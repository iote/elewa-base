// Angular Core Modules
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

// Apollo
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// External Library Stubs
import { ElewaCoreModule } from '../elewa-core/elewa-core.module';

// Angular Configuration
import { AppComponent } from './app.component'; // (Bootstrap)

import { AppRoutingModule }  from '../../kernel/routing/router.module';

// Core Elewa Modules
import { AuthModule } from '../../modules/auth/auth.module';

// Model Elewa Modules

// Services
import { Logger } from '../../kernel/services/logger/logger.service';
import { DebugLogger } from '../../kernel/services/logger/debuglogger.service';

import { GraphqlService } from '../../kernel/services/graphql/graphql.service';
import { GraphqlInitService } from '../../kernel/services/graphql/graphql-init.service';

import { TransclusionHelper } from '../../kernel/services/transclusion-helper/transclusion-helper.service';
import { HomeModule } from '../../modules/home/home.module';

/**
 * Main root module. Launches the application
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule, BrowserModule,
    ReactiveFormsModule,
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
