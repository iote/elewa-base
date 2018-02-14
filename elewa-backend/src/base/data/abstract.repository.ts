import { Model } from 'mongoose';
import { ObjectId } from 'bson';

/**
 * Abstract repository that shares common repository functionalities.
 */
export abstract class AbstractRepository<T> {

  constructor(private readonly _model: any) {}

  async findAll(): Promise<T[]> {
    return this.find({});
  }

  async trySingle(query: any): Promise<T | false>  {
    let res = await this.find(query);

    if(res.length > 0)
      return res.shift();
    else
      return false;
  }

  async findById(id: ObjectId): Promise<T> {
    let res = await this.find({ _id: id });

    return res.shift();
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

  async truncate(): Promise<boolean> {
    try {
      await this._model.remove({});
      return true;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }

  async insertMany(items: T[]): Promise<T[] | false> {
    const results = [];

    for(let item of items) {
      let result = await this.insert(item);
      
      if(result)
        results.push(result);
      else 
        return false; 
    }

    return results;
  }
}