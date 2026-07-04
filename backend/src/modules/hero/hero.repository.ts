import BaseRepository from "../../shared/repositories/BaseRepository.js";
import HeroBanner, { HeroDocument } from "./hero.model.js";
import { HeroStatus } from "./hero.types.js";
import { PaginationQuery } from "../../shared/types/pagination.types.js";

class HeroRepository extends BaseRepository<HeroDocument> {
  constructor() {
    super(HeroBanner);
  }

  async getPublishedHeroes() {
    const now = new Date();

    return this.model
      .find({
        status: HeroStatus.PUBLISHED,
        isDeleted: false,
        $and: [
          {
            $or: [
              { publishedAt: null },
              { publishedAt: { $lte: now } },
            ],
          },
          {
            $or: [
              { expiresAt: null },
              { expiresAt: { $gt: now } },
            ],
          },
        ],
      })
      .sort({
        displayOrder: 1,
      });
  }

  async existsByDisplayOrder(displayOrder: number) {
    return this.model.exists({
      displayOrder,
      isDeleted: false,
    });
  }

  async getTrashHeroes() {
    return this.model
      .find({
        isDeleted: true,
      })
      .sort({
        updatedAt: -1,
      });
  }

  async softDelete(id: string, adminId?: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId ?? null,
      },
      {
        new: true,
      }
    );
  }

  async restore(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        new: true,
      }
    );
  }

  async forceDelete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  async bulkPublish(ids: string[]) {
    return this.model.updateMany(
      {
        _id: { $in: ids },
        isDeleted: false,
      },
      {
        status: HeroStatus.PUBLISHED,
        publishedAt: new Date(),
      }
    );
  }

  async bulkArchive(ids: string[]) {
    return this.model.updateMany(
      {
        _id: { $in: ids },
        isDeleted: false,
      },
      {
        status: HeroStatus.ARCHIVED,
      }
    );
  }

  async bulkTrash(ids: string[]) {
    return this.model.updateMany(
      {
        _id: { $in: ids },
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      }
    );
  }

  async bulkRestore(ids: string[]) {
    return this.model.updateMany(
      {
        _id: { $in: ids },
        isDeleted: true,
      },
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      }
    );
  }

  async bulkForceDelete(ids: string[]) {
    return this.model.deleteMany({
      _id: { $in: ids },
    });
  }

  async getPaginatedHeroes(query: PaginationQuery) {
    return this.findPaginated(query, {
      filter: {
        isDeleted: false,
      },
      searchFields: [
        "title",
        "subtitle",
        "description",
      ],
    });
  }

  async reorder(
    heroes: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    return this.model.bulkWrite(
      heroes.map((hero) => ({
        updateOne: {
          filter: {
            _id: hero.id,
          },
          update: {
            displayOrder: hero.displayOrder,
          },
        },
      }))
    );
  }

}

export default new HeroRepository();