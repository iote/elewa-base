// Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// External Library Stubs
import { MaterialDesignModule } from '../../modules/material-design/material-design.module';

// Angular Configuration
import { AppComponent } from './app.component'; // (Bootstrap)
import { AppRoutingModule }  from '../routing/router.module';

// Core Elewa Modules
import { AuthModule } from '../../modules/auth/auth.module';

// Model Elewa Modules

// Services
import { Logger } from '../services/logger/logger.service';
import { DebugLogger } from '../services/logger/debuglogger.service';

/**
 * Main root module. Launches the application
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,

    MaterialDesignModule,

    AppRoutingModule,
  
    AuthModule
  ],
  providers: [
    // Provide is either a type, a string or an instance of InjectionToken. Best case is to use classes.
    { provide: Logger, useClass: DebugLogger }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
