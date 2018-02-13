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
import { CoreModule } from '../base-modules/core.module';

// Angular Configuration
import { AppComponent } from './app.component'; // (Bootstrap)

import { AppRoutingModule }  from '../routes/router.module';

// Core Elewa Modules
import { AuthModule } from '../modules/auth/auth.module';

// Model Elewa Modules

// Services
import { Logger } from '../providers/logger/logger.service';
import { DebugLogger } from '../providers/logger/debuglogger.service';

import { GraphqlService } from '../providers/graphql/graphql.service';
import { GraphqlInitService } from '../providers/graphql/graphql-init.service';
import { ThemingService } from '../providers/theming/theming.service';
import { TransclusionHelper } from '../providers/transclusion-helper/transclusion-helper.service';

import { HomeModule } from '../modules/home/home.module';
import { CourseModule } from '../modules/course/course.module';

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

    CoreModule,

    AppRoutingModule,
  
    AuthModule, HomeModule, CourseModule
  ],
  providers: [
    // Provide is either a type, a string or an instance of InjectionToken. Best case is to use classes.
    { provide: Logger, useClass: DebugLogger },
    // If provide = useClass -> Just put class here directly
    GraphqlInitService,
    GraphqlService,
    ThemingService,
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
