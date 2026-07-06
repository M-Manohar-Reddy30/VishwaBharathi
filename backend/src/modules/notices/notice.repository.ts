import BaseRepository from "../../shared/repositories/BaseRepository.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import Notice, {
  NoticeDocument,
} from "./notice.model.js";

class NoticeRepository extends BaseRepository<NoticeDocument> {
  constructor() {
    super(Notice);
  }

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return this.findPaginated(query, {
      filter: {
        isDeleted: false,
      },
      searchFields: [
        "title",
        "description",
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Public Notices
  |--------------------------------------------------------------------------
  */

  async getActive() {
    return this.model
      .find({
        status: "ACTIVE",
        isDeleted: false,
      })
      .sort({
        displayOrder: 1,
        publishDate: -1,
      });
  }

  /*
  |--------------------------------------------------------------------------
  | Trash
  |--------------------------------------------------------------------------
  */

  async getTrash() {
    return this.model
      .find({
        isDeleted: true,
      })
      .sort({
        deletedAt: -1,
      });
  }

  async softDelete(
    id: string,
    adminId?: string
  ) {
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

  async getStats() {
    const [
      total,
      active,
      inactive,
      trash,
    ] = await Promise.all([
      this.model.countDocuments({
        isDeleted: false,
      }),

      this.model.countDocuments({
        status: "ACTIVE",
        isDeleted: false,
      }),

      this.model.countDocuments({
        status: "INACTIVE",
        isDeleted: false,
      }),

      this.model.countDocuments({
        isDeleted: true,
      }),
    ]);

    return {
      total,
      active,
      inactive,
      trash,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  async existsByDisplayOrder(
    displayOrder: number
  ) {
    return this.exists({
      displayOrder,
      isDeleted: false,
    });
  }

  async reorder(
    notices: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    return this.model.bulkWrite(
      notices.map((notice) => ({
        updateOne: {
          filter: {
            _id: notice.id,
          },
          update: {
            displayOrder: notice.displayOrder,
          },
        },
      }))
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  async bulkTrash(ids: string[]) {
    return this.model.updateMany(
      {
        _id: {
          $in: ids,
        },
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
        _id: {
          $in: ids,
        },
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
      _id: {
        $in: ids,
      },
    });
  }
}

export default new NoticeRepository();