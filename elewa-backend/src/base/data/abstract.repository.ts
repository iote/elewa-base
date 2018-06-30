import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { MongoObject } from './mongo-object.interface';

/**
 * Abstract repository that shares common repository functionalities.
 */
export abstract class AbstractRepository<T extends MongoObject> {
  constructor(private readonly _model: any) { }

  async findAll(): Promise<T[]> {
    return this.find({});
  }

  async trySingle(query: any): Promise<T | false> {
    let res = await this.find(query);

    if (res.length > 0) return res.shift();
    else return false;
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
    return this._abstractInsert(item, async ins => {
      await ins.save();
      return ins;
    });
  }

  private async _abstractInsert(
    item: T,
    op: (any) => Promise<T>
  ): Promise<T | false> {
    const toInsert = new this._model(item);

    try {
      return op(toInsert);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async insertActive(item: T): Promise<T | false> {
    return this._abstractInsert(
      item,
      (async ins => {
        await ins.save();
        return this.single(ins);
      }).bind(this)
    );
  }

  async truncate(): Promise<boolean> {
    try {
      await this._model.remove({});
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async insertMany(items: T[]) {
    return this._insertManyAbstract(items, this.insert.bind(this));
  }

  async insertManyActive(items: T[]) {
    return this._insertManyAbstract(items, this.insertActive.bind(this));
  }

  private async _insertManyAbstract(items: T[], insertF): Promise<T[] | false> {
    const results = [];

    for (let item of items) {
      let result = await insertF(item);

      if (result) results.push(result);
      else return false;
    }

    return results;
  }

  async update(item: T): Promise<T | false> {
    try {
      return this._model.update({ _id: item._id }, { $set: item });
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateMany(items: T[]): Promise<T[] | false> {
    try {
      for (let item of items) {
        await this.update(item);
      }
      return items;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateQ(query: any, queryset: any): Promise<T | false> {
    try {
      return this._model.update(query, queryset);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async joinfields(query: any): Promise<T[]> {
    return this._model.aggregate(query);
  }

  async aggregate(query: any): Promise<any> {
    return this._model.aggregate(query);
  }

  async remove(query: any): Promise<T> {
    return this._model.remove(query)
  }

}