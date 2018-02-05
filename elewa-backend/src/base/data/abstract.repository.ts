import { Model } from 'mongoose';

/**
 * Abstract repository that shares common repository functionalities.
 */
export abstract class AbstractRepository<T> {

  constructor(private readonly _model: any) {}

  async findAll(): Promise<T[]> {
    return this.find({});
  }

  async single(query: any): Promise<T> {
    let res = await this.find(query);

    return res.shift();
  }

  async find(query: any): Promise<T[]> {
    return await this._model.find(query).exec();
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