import { FilterQuery, Model, QueryOptions, Document } from 'mongoose';

export class BaseRepository<T, K> {
  constructor(private readonly model: Model<T>) {}

  async create(doc): Promise<any> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions) {
    return await this.model.findById(id, option);
  }

  async findOneByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<T | any> {
    return await this.model.findOne(filter, field, option).populate(populate);
  }

  async findByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<K[]> {
    return await this.model.find(filter, field, option).populate(populate);
  }

  async findAll(): Promise<K[]> {
    return await this.model.find();
  }

  async aggregate(option: any) {
    return await this.model.aggregate(option);
  }

  async populate(result: T[], option: any) {
    return await this.model.populate(result, option);
  }

  async deleteOne(id: string) {
    return this.model.deleteOne({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update, option?: any | null) {
    return this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter, update, option?: any | null, callback?: any | null) {
    return this.model.updateMany(filter, update, option, callback);
  }

  async findByIdAndUpdate(id, update): Promise<T> {
    return this.model.findByIdAndUpdate(id, update);
  }

  async countDocuments(filter) {
    return this.model.countDocuments(filter);
  }
}
