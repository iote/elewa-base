import { Component }     from '@nestjs/common';

@Component()
export class BootService {
  constructor() {}

  
  async boot(): Promise<boolean> {
    // await this.subjectModel.find().exec();
    //  - await services
    
    return true;
  }
}