import { Component, Inject }     from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';

import { IBootService } from './boot-service.interface';
import { BootAuthService } from './module-boots/boot-auth.service';
import { BootCurriculumService } from './module-boots/boot-curriculum.service';
import { ConfigureCorsService } from './configure-server/configure-cors.service';

@Component()
export class BootService implements IBootService {

  private _bootables: IBootService[];

  constructor(@Inject(ConfigureCorsService)  configCors :ConfigureCorsService,
              @Inject(BootAuthService)       bootAuth   :BootAuthService, 
              @Inject(BootCurriculumService) bootCurr   :BootCurriculumService) 
  {
    // Important, bootables will be executed in order of array.
    this._bootables = [ // 1. Server Configurators - (e.g. Passport, CORS, ..)
                        configCors,
                        // 2. Module configurators - (e.g. Fixtures)
                        bootAuth, bootCurr];
  }
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    console.log("Starting Application Boot Service");
    
    try
    {
      for(let bootable of this._bootables)
        await bootable.boot(app, production); // await ensures synchronous execution
    }
    catch(e) { 
      console.error(e);
      return false;
    }
    return true;       // && await ..

  }
}