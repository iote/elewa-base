import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

import { production } from './base/config/production';

import { ServerBootModule } from './modules/_server-boot/server-boot.module';
import { BootService } from './modules/_server-boot/boot.service';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	
	// Execute boot code
	const bootService = app.select(ServerBootModule).get(BootService);
	
	/** Set @see './base/config/production' to true in production. */
	var booted = await bootService.boot(app, production);
	
	if(booted)
		await app.listen(3000);
	else 
		console.error('Boot failed. Shutting down server');
}
bootstrap();
