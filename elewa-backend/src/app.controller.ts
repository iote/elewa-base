import { Get, Controller } from '@nestjs/common';
import { Anonymous } from './modules/auth/gaurds/anonymous.decorator';

@Controller()
@Anonymous()
export class AppController {
	@Get()
	root(): string {
    return 'Hello World!';
  }
}
