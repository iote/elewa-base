// Angular Core Modules
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { TransclusionHelper } from '../services/transclusion-helper/transclusion-helper.service';

/**
 * Main root module. Launches the application
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule, BrowserModule, ReactiveFormsModule,

    ElewaCoreModule,

    AppRoutingModule,
  
    AuthModule
  ],
  providers: [
    // Provide is either a type, a string or an instance of InjectionToken. Best case is to use classes.
    { provide: Logger, useClass: DebugLogger },
    // If provide = useClass -> Just put class here directly
    TransclusionHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
