import { Model } from 'mongoose';

/**
 * Abstract repository that shares common repository functionalities.
 */
export abstract class AbstractRepository<T> {

  constructor(private readonly _model: any) {}

  async findAll(): Promise<T[]> {
    return await this._model.find().exec();
  }

  async insert(item: T): Promise<T | false> {
    const toInsert = new this._model(item);    
    
    try {
      await toInsert.save();
      return toInsert;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }
}