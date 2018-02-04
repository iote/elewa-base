import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

import { ServerBootModule } from './modules/_server-boot/server-boot.module';
import { BootService } from './modules/_server-boot/services/boot.service';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	
	// Execute boot code
	const bootService = app.select(ServerBootModule).get(BootService);
	var booted:boolean = await bootService.boot(app);
	
	
	if(booted)
		await app.listen(3000);
	else 
		console.error('Boot failed. Shutting down server');
}
bootstrap();
