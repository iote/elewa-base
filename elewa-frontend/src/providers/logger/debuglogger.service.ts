import { Injectable } from '@angular/core';

import { Logger } from './logger.service';

/**
 * Simple wrapper around console.log.
 *     Used for debugging. Extends the default logger
 * 
 * @author JRosseel, 19/08/'16
 */
@Injectable()
export class DebugLogger extends Logger
{
    constructor() 
    {
        super();
    }
    
    debug(msg: () => any) { console.debug(msg()); }
    warn (msg: () => any) { console.warn(msg());  }
    error(msg: () => any) { console.error(msg()); } 
}
