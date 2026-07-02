import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from "mongoose";

export default class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter);
  }

  findMany(
    filter: FilterQuery<T> = {},
    sort: Record<string, 1 | -1> = {}
  ) {
    return this.model.find(filter).sort(sort);
  }

  update(id: string, data: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  count(filter: FilterQuery<T> = {}) {
    return this.model.countDocuments(filter);
  }
}