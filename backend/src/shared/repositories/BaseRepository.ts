import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from "mongoose";

import { PaginationQuery } from "../types/pagination.types.js";
import { getPagination } from "../utils/pagination.js";

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

  exists(filter: FilterQuery<T>) {
  return this.model.exists(filter);
}

  async findPaginated(
    query: PaginationQuery,
    options: {
      filter?: FilterQuery<T>;
      searchFields?: string[];
    } = {}
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    const { skip } = getPagination(page, limit);

    const filter: FilterQuery<T> = {
      ...(options.filter || {}),
    };

    if (status) {
      (filter as any).status = status;
    }

    if (search && options.searchFields?.length) {
      filter.$or = options.searchFields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })) as any;
    }

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({
          [sortBy]: sortOrder === "asc" ? 1 : -1,
        })
        .skip(skip)
        .limit(limit),

      this.model.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}