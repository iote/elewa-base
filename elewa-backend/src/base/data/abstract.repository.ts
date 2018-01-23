import { Model } from 'mongoose';

/**
 * Abstract repository that shares common repository functionalities.
 */
export abstract class AbstractRepository<T> {

  constructor(private readonly _model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return await this._model.find().exec();
  }

  async insert(item: T): Promise<boolean> {
    const toInsert = new this._model(item);    

    await toInsert.save();
    return true;
  }
}