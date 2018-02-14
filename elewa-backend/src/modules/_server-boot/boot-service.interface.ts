import { INestApplication } from '@nestjs/common/interfaces';

export interface IBootService {
  boot(app: INestApplication, production: boolean): Promise<boolean>;
}